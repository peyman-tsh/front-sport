import { MetadataRoute } from 'next';
import { FALLBACK_PRODUCTS } from '../lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lumix-sport.ir';

  // 1. Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/consultation`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/car-guide`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
  ];

  // 2. High-Intent Tuning & Sport Categories Landing Pages
  const categories = [
    'سیستم اگزوز و مکش',
    'سیستم تعلیق و فنربندی',
    'کیت بدنه و آیرودینامیک',
    'تزئینات و کابین اسپرت',
    'روشنایی و هدلایت',
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/products?category=${encodeURIComponent(cat)}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  // 3. Socket / Part Type routes
  const sockets = ['H1', 'H4', 'H7', 'H11', '9005'];
  const socketRoutes: MetadataRoute.Sitemap = sockets.map((socket) => ({
    url: `${baseUrl}/products?socketType=${socket}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  // 4. Dynamic Product Pages (from API with fallback)
  let productSlugs: string[] = [];
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
    const res = await fetch(`${apiBase}/products?limit=200`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const json = await res.json();
      productSlugs = (json.data?.data || []).map((p: any) => p.slug);
    }
  } catch {
    // Fallback if backend is not reachable at build time
  }

  if (productSlugs.length === 0) {
    productSlugs = FALLBACK_PRODUCTS.map((p) => p.slug);
  }

  const productRoutes: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${baseUrl}/products/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.95,
  }));

  return [...staticRoutes, ...categoryRoutes, ...socketRoutes, ...productRoutes];
}
