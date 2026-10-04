import type {
  IncomingMessage,
  RequestListener,
  ServerResponse,
} from 'node:http';
import { isIP } from 'node:net';
import type { PreparedAnswer } from '../src/lib/prepared-answers.ts';
import {
  handleChatRequest,
  MAX_BODY_BYTES,
  preflightChatRequest,
  type ChatConfig,
} from './chat.ts';
import { createRateLimiter } from './rate-limit.ts';

export function createNodeChatHandler(
  loadCatalog: (
    incoming: IncomingMessage,
  ) => PreparedAnswer[] | Promise<PreparedAnswer[]>,
  getConfig: (incoming: IncomingMessage) => ChatConfig,
  proxyAddresses: string[] = [],
): RequestListener {
  const allowRequest = createRateLimiter();
  const normalizeIP = (ip: string) => ip.replace(/^::ffff:/, '');
  const trustedProxies = new Set(
    proxyAddresses.map((ip) => normalizeIP(ip.trim())).filter(Boolean),
  );
  return async (incoming: IncomingMessage, outgoing: ServerResponse) => {
    if (incoming.url?.split('?')[0] !== '/api/chat') {
      outgoing.writeHead(404).end();
      return;
    }
    const abort = new AbortController();
    incoming.on('aborted', () => abort.abort());
    outgoing.on('close', () => {
      if (!outgoing.writableEnded) abort.abort();
    });
    const send = async (response: Response) => {
      if (outgoing.destroyed || outgoing.writableEnded) return;
      outgoing.writeHead(response.status, Object.fromEntries(response.headers));
      outgoing.end(await response.text());
    };
    try {
      const config = getConfig(incoming);
      let ip = normalizeIP(incoming.socket.remoteAddress || 'unknown');
      const forwarded = incoming.headers['x-forwarded-for'];
      if (trustedProxies.has(ip) && typeof forwarded === 'string') {
        const address = forwarded.split(',').at(-1)?.trim();
        if (address && isIP(address)) ip = normalizeIP(address);
      }
      const headers = new Headers();
      for (const [key, value] of Object.entries(incoming.headers)) {
        if (value)
          headers.set(key, Array.isArray(value) ? value.join(',') : value);
      }
      const envelope = new Request('http://localhost/api/chat', {
        method: incoming.method,
        headers,
        signal: abort.signal,
      });
      const early = preflightChatRequest(envelope, config);
      if (early) {
        outgoing.shouldKeepAlive = false;
        await send(early);
        return;
      }
      const chunks: Buffer[] = [];
      let size = 0;
      for await (const chunk of incoming) {
        const bytes = Buffer.from(chunk);
        size += bytes.length;
        if (size > MAX_BODY_BYTES) {
          outgoing.shouldKeepAlive = false;
          await send(
            new Response(JSON.stringify({ error: 'Message is too large.' }), {
              status: 413,
              headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store',
                'Access-Control-Allow-Origin': headers.get('Origin')!,
                Vary: 'Origin',
              },
            }),
          );
          return;
        }
        chunks.push(bytes);
      }
      const request = new Request(envelope, { body: Buffer.concat(chunks) });
      const catalog = await loadCatalog(incoming);
      await send(
        await handleChatRequest(request, catalog, config, fetch, () =>
          allowRequest(ip),
        ),
      );
    } catch {
      if (outgoing.destroyed || outgoing.writableEnded) return;
      outgoing
        .writeHead(500, {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        })
        .end(JSON.stringify({ error: 'Chat is unavailable.' }));
    }
  };
}
