import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import type { PreparedAnswer } from '../src/lib/prepared-answers.ts';
import { createNodeChatHandler } from './node-handler.ts';

const catalog = JSON.parse(
  readFileSync(new URL('../dist/chat-knowledge.json', import.meta.url), 'utf8'),
) as PreparedAnswer[];
const config = {
  apiKey: process.env.OPENROUTER_API_KEY,
  model: process.env.OPENROUTER_MODEL,
  allowedOrigins: (
    process.env.CHAT_ALLOWED_ORIGINS ||
    'http://localhost:4321,http://localhost:4322,http://127.0.0.1:4321,https://gnikesh.github.io,https://gnikesh.com,https://www.gnikesh.com'
  )
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
};
const port = Number(process.env.PORT || 8787);
const host = process.env.CHAT_HOST || '127.0.0.1';
const proxies = (process.env.CHAT_TRUSTED_PROXY_IPS || '').split(',');

createServer(
  { requestTimeout: 10000, headersTimeout: 10000 },
  createNodeChatHandler(
    () => catalog,
    () => config,
    proxies,
  ),
).listen(port, host, () => {
  console.log(
    `Nikesh chat backend listening at http://${host}:${port}/api/chat`,
  );
});
