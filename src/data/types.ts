export type TechCategory = 
  | 'Consumer Electronics & Mobile Tech'
  | 'AI & Future Tech'
  | 'Cybersecurity & Software'
  | 'Smart Home & Enterprise Hardware';

export type CategoryId = 
  | 'consumer-electronics'
  | 'ai-future-tech'
  | 'cybersecurity-software'
  | 'smart-home-enterprise';

export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface InfographicPanel {
  id: string;
  title: string;
  badge: string;
  stat: string;
  description: string;
  details: string[];
}

export interface InfographicData {
  title: string;
  subtitle: string;
  theme: {
    bg: string;
    accent1: string;
    accent2: string;
  };
  panels: InfographicPanel[];
}

export interface BenchmarkRow {
  device: string;
  values: string[];
  highlight?: boolean;
}

export interface BenchmarkTable {
  title: string;
  headers: string[];
  rows: BenchmarkRow[];
}

export interface ArticleSection {
  heading: string;
  lead?: string;
  paragraphs: string[];
  quote?: string;
  takeaways?: string[];
}

export interface ArticleVerdict {
  winner: string;
  pros: string[];
  cons: string[];
  finalScore: string;
  recommendation: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  keyword: string;
  subtitle: string;
  category: TechCategory;
  categoryId: CategoryId;
  readTime: string;
  publishDate: string;
  author: Author;
  leadSummary: string;
  infographic: InfographicData;
  benchmarkTable: BenchmarkTable;
  sections: ArticleSection[];
  verdict: ArticleVerdict;
  relatedIds: string[];
  views: number;
  featured?: boolean;
}

export interface CategoryInfo {
  id: CategoryId;
  name: TechCategory;
  description: string;
  accent: string;
  articleCount: number;
}
