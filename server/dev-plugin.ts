import { existsSync } from 'node:fs';
import { loadEnvFile } from 'node:process';
import type { Plugin } from 'vite';
import type { PreparedAnswer } from '../src/lib/prepared-answers.ts';
import { createNodeChatHandler } from './node-handler.ts';
import { readJson } from './chat.ts';

export function nikeshChatDev(): Plugin {
  return {
    name: 'nikesh-chat-dev',
    enforce: 'pre',
    apply: 'serve',
    configureServer(server) {
      if (existsSync('.env')) loadEnvFile('.env');
      // Run before Astro buffers request bodies. The same bounded Node handler
      // serves local development and the standalone production backend.
      const handle = createNodeChatHandler(
        async (incoming) => {
          const port = incoming.socket.localPort;
          const response = await fetch(
            `http://localhost:${port}/chat-knowledge.json`,
            {
              signal: AbortSignal.timeout(5000),
            },
          );
          if (!response.ok)
            throw new Error('The site answer catalog is unavailable.');
          return (await readJson(response, 256000)) as PreparedAnswer[];
        },
        (incoming) => {
          const port = incoming.socket.localPort;
          const address = incoming.socket.localAddress || '127.0.0.1';
          const host = address.includes(':') ? `[${address}]` : address;
          return {
            apiKey: process.env.OPENROUTER_API_KEY,
            model: process.env.OPENROUTER_MODEL,
            allowedOrigins: [
              `http://localhost:${port}`,
              `http://127.0.0.1:${port}`,
              `http://${host}:${port}`,
            ],
          };
        },
      );
      server.middlewares.use((incoming, outgoing, next) => {
        if (incoming.url?.split('?')[0] !== '/api/chat') {
          next();
          return;
        }
        void handle(incoming, outgoing);
      });
    },
  };
}
