import { absoluteUrl } from '../lib/seo';

// Generated so the sitemap URL always follows the configured site origin.
// /cdn-cgi/ is Cloudflare's own endpoint (challenge scripts, speculation rules);
// Cloudflare recommends disallowing it so crawlers do not report it as site content.
export function GET() {
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /cdn-cgi/',
    '',
    `Sitemap: ${absoluteUrl('/sitemap-index.xml')}`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
