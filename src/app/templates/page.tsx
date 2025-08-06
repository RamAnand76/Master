
"use client";

import { useState } from 'react';
import HomeHeader from '@/components/home/home-header';
import TemplateCard from '@/components/templates/template-card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const templates = [
  {
    name: 'Classic',
    imageUrl: 'https://placehold.co/400x565.png',
    tags: ['Traditional', 'Professional'],
    dataAiHint: 'resume professional',
    tier: 'Free',
    category: 'Professional',
  },
  {
    name: 'Modern',
    imageUrl: 'https://placehold.co/400x565.png',
    tags: ['Creative', 'Minimalist'],
    dataAiHint: 'resume creative',
    tier: 'Free',
    category: 'Modern',
  },
  {
    name: 'Elegant',
    imageUrl: 'https://placehold.co/400x565.png',
    tags: ['Sophisticated', 'Simple'],
    dataAiHint: 'resume simple',
    tier: 'Pro',
    category: 'Creative',
  },
  {
    name: 'Corporate',
    imageUrl: 'https://placehold.co/400x565.png',
    tags: ['ATS-Friendly', 'Formal'],
    dataAiHint: 'resume formal',
    tier: 'Pro',
    category: 'Professional',
  },
  {
    name: 'Tech',
    imageUrl: 'https://placehold.co/400x565.png',
    tags: ['Developer', 'Modern'],
    dataAiHint: 'resume tech',
    tier: 'Premium',
    category: 'Modern',
  },
  {
    name: 'Creative',
    imageUrl: 'https://placehold.co/400x565.png',
    tags: ['Designer', 'Visual'],
    dataAiHint: 'resume design',
    tier: 'Premium',
    category: 'Creative',
  },
];

const categories = ['All', 'Creative', 'Professional', 'Modern'];

export default function TemplatesPage() {
  const [activeTier, setActiveTier] = useState('All');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredTemplates = templates.filter(template => {
    const tierMatch = activeTier === 'All' || template.tier === activeTier;
    const categoryMatch = activeCategory === 'All' || template.category === activeCategory;
    return tierMatch && categoryMatch;
  });

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <HomeHeader />
      <main className="max-w-7xl mx-auto p-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Resume Templates</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Choose a professionally designed template to kickstart your career. Each one is crafted to be ATS-friendly and fully customizable.
          </p>
        </header>

        <div className="flex flex-col items-center gap-6">
            <Tabs defaultValue="All" onValueChange={setActiveTier} className="w-full max-w-sm mx-auto">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="All">All</TabsTrigger>
                    <TabsTrigger value="Free">Free</TabsTrigger>
                    <TabsTrigger value="Pro">Pro</TabsTrigger>
                    <TabsTrigger value="Premium">Premium</TabsTrigger>
                </TabsList>
            </Tabs>

            <Tabs defaultValue="All" onValueChange={setActiveCategory} className="w-full max-w-md mx-auto">
                 <TabsList>
                    {categories.map(category => (
                        <TabsTrigger key={category} value={category} className="capitalize">
                            {category}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template, index) => (
              <TemplateCard key={index} {...template} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
                <h3 className="text-lg font-medium text-muted-foreground">No templates match your criteria.</h3>
                <p className="text-sm text-muted-foreground">Try selecting a different filter.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
