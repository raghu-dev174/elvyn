import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://elvyn-tau.vercel.app/' },
    { url: 'https://elvyn-tau.vercel.app/contact' },
  ];
}
