import { Article, CategoryId } from '../types';
import { CATEGORY_1_ARTICLES } from './category1';
import { CATEGORY_2_ARTICLES } from './category2';
import { CATEGORY_3_ARTICLES } from './category3';
import { CATEGORY_4_ARTICLES } from './category4';

export const ALL_ARTICLES: Article[] = [
  ...CATEGORY_1_ARTICLES,
  ...CATEGORY_2_ARTICLES,
  ...CATEGORY_3_ARTICLES,
  ...CATEGORY_4_ARTICLES,
];

export function getAllArticles(): Article[] {
  return ALL_ARTICLES;
}

export function getArticleById(id: string): Article | undefined {
  return ALL_ARTICLES.find(a => a.id === id);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return ALL_ARTICLES.find(a => a.slug === slug);
}

export function getArticlesByCategory(categoryId: CategoryId): Article[] {
  return ALL_ARTICLES.filter(a => a.categoryId === categoryId);
}

export function getFeaturedArticles(): Article[] {
  return ALL_ARTICLES.filter(a => a.featured);
}

export function searchArticles(query: string): Article[] {
  if (!query.trim()) return ALL_ARTICLES;
  const q = query.toLowerCase();
  return ALL_ARTICLES.filter(a => 
    a.title.toLowerCase().includes(q) ||
    a.keyword.toLowerCase().includes(q) ||
    a.subtitle.toLowerCase().includes(q) ||
    a.leadSummary.toLowerCase().includes(q) ||
    a.category.toLowerCase().includes(q)
  );
}

export function getBreakingHeadlines(): Array<{ id: string; title: string; category: string; tag: string }> {
  return [
    { id: 'art-01', title: 'Silicon-Carbon Anodes Enter 2026 Mobile Flagships with 5,800mAh Capacities', category: 'Mobile Tech', tag: 'SILICON' },
    { id: 'art-06', title: 'Spatiotemporal Diffusion Transformers Achieve Photorealistic 4K 60fps Synthesis', category: 'Generative AI', tag: 'NEURAL' },
    { id: 'art-11', title: 'NIST Standardizes ML-KEM Post-Quantum Cryptography for Encrypted Tunnels', category: 'Cybersecurity', tag: 'SECURITY' },
    { id: 'art-18', title: 'Gate-All-Around (GAA) Nanosheet CPUs Break 6.0 GHz Clock Barrier', category: 'Hardware', tag: 'CHIPSET' },
    { id: 'art-10', title: 'Vision-Language-Action Models Deploy on Bipedal Factory Humanoids', category: 'Robotics', tag: 'ROBOTICS' },
    { id: 'art-16', title: 'Matter 1.4 Over Thread Eliminates Cloud Lock-In for Home Coordinators', category: 'Smart Home', tag: 'MATTER' },
    { id: 'art-09', title: 'PyTorch 3.0 Integrates Triton Compiler Kernels for 45% Faster Inference', category: 'AI Frameworks', tag: 'COMPILER' },
    { id: 'art-20', title: 'Variable-Speed Inverter Heat Pumps Cut Household Power Drain by 64%', category: 'Energy', tag: 'ENERGY' },
  ];
}
