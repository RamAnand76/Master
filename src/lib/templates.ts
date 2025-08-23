
export const templates = [
  {
    id: 'classic',
    name: 'Classic',
    imageUrl: 'https://placehold.co/400x565.png',
    tags: ['Traditional', 'Professional'],
    dataAiHint: 'resume professional',
    tier: 'Free',
    category: 'Professional',
  },
  {
    id: 'modern',
    name: 'Modern',
    imageUrl: 'https://placehold.co/400x565.png',
    tags: ['Creative', 'Minimalist'],
    dataAiHint: 'resume creative',
    tier: 'Free',
    category: 'Modern',
  },
  {
    id: 'creative',
    name: 'Creative',
    imageUrl: 'https://placehold.co/400x565.png',
    tags: ['Designer', 'Visual'],
    dataAiHint: 'resume design',
    tier: 'Pro',
    category: 'Creative',
  },
  {
    id: 'elegant',
    name: 'Elegant',
    imageUrl: 'https://placehold.co/400x565.png',
    tags: ['Sophisticated', 'Simple'],
    dataAiHint: 'resume simple',
    tier: 'Pro',
    category: 'Creative',
  },
  {
    name: 'Corporate',
    id: 'corporate',
    imageUrl: 'https://placehold.co/400x565.png',
    tags: ['ATS-Friendly', 'Formal'],
    dataAiHint: 'resume formal',
    tier: 'Pro',
    category: 'Professional',
  },
  {
    name: 'Tech',
    id: 'tech',
    imageUrl: 'https://placehold.co/400x565.png',
    tags: ['Developer', 'Modern'],
    dataAiHint: 'resume tech',
    tier: 'Premium',
    category: 'Modern',
  },
];

export type Template = (typeof templates)[0];
