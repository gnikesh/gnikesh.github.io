import { site } from '../data/site';

export const absoluteUrl = (path: string): string => new URL(path, site.url).toString();

export type Schema = Record<string, unknown>;

export function websiteSchema(): Schema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: site.title,
    description: site.description,
    inLanguage: 'en-US',
    publisher: { '@id': `${site.url}/#person` },
  };
}

export function personSchema(): Schema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${site.url}/#person`,
    name: site.author.name,
    alternateName: 'gnikesh',
    url: site.url,
    image: absoluteUrl(site.ogImage),
    description: site.author.bio,
    jobTitle: site.author.title,
    worksFor: {
      '@type': 'Organization',
      name: 'Kansas State University',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Kansas State University',
    },
    sameAs: Object.values(site.social),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]): Schema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
