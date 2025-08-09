
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HomeHeader from '@/components/home/home-header';
import TemplateCard from '@/components/templates/template-card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { InputGroup } from '@/components/ui/input-group';
import type { ResumeData } from '@/lib/types';

const templates = [
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
    name: 'Elegant',
    imageUrl: 'https://placehold.co/400x565.png',
    tags: ['Sophisticated', 'Simple'],
    dataAiHint: 'resume simple',
    tier: 'Pro',
    category: 'Creative',
  },
  {
    name: 'Corporate',
    id: 'classic',
    imageUrl: 'https://placehold.co/400x565.png',
    tags: ['ATS-Friendly', 'Formal'],
    dataAiHint: 'resume formal',
    tier: 'Pro',
    category: 'Professional',
  },
  {
    name: 'Tech',
    id: 'modern',
    imageUrl: 'https://placehold.co/400x565.png',
    tags: ['Developer', 'Modern'],
    dataAiHint: 'resume tech',
    tier: 'Premium',
    category: 'Modern',
  },
  {
    name: 'Creative',
    id: 'creative',
    imageUrl: 'https://placehold.co/400x565.png',
    tags: ['Designer', 'Visual'],
    dataAiHint: 'resume design',
    tier: 'Premium',
    category: 'Creative',
  },
];

const categories = ['All', 'Creative', 'Professional', 'Modern'];
const tiers = ['All', 'Free', 'Pro', 'Premium'];

export default function TemplatesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTier, setActiveTier] = useState('All');
  const [activeCategory, setActiveCategory] = useState('All');
  const router = useRouter();

  const handleUseTemplate = (templateId: string) => {
    const savedProjects = localStorage.getItem('resuMasterProjects');
    if (savedProjects) {
        try {
            const projects: ResumeData[] = JSON.parse(savedProjects);
            if (projects.length > 0) {
                // Get the most recent project
                const sortedProjects = projects.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                const mostRecentProject = sortedProjects[0];
                
                // Update its template
                mostRecentProject.template = templateId;
                
                // Save back to local storage
                localStorage.setItem('resuMasterProjects', JSON.stringify(projects));
                
                // Navigate to the workspace
                router.push(`/workspace/${mostRecentProject.id}`);
            } else {
                 // Handle case where there are no projects
                 router.push('/');
            }
        } catch (error) {
            console.error("Failed to update template:", error);
        }
    } else {
        router.push('/');
    }
  };

  const filteredTemplates = templates.filter(template => {
    const tierMatch = activeTier === 'All' || template.tier === activeTier;
    const categoryMatch = activeCategory === 'All' || template.category === activeCategory;
    const searchMatch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) || template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return tierMatch && categoryMatch && searchMatch;
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

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
          <div className="w-full md:w-auto md:min-w-64">
            <InputGroup startContent={<Search />}>
              <Input 
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </div>
          <div className="w-full md:w-auto">
            <Select onValueChange={setActiveTier} defaultValue="All">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by tier" />
              </SelectTrigger>
              <SelectContent>
                {tiers.map(tier => (
                  <SelectItem key={tier} value={tier}>{tier}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-center mb-8">
            <Tabs defaultValue="All" onValueChange={setActiveCategory}>
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
              <TemplateCard key={index} {...template} onUseTemplate={() => handleUseTemplate(template.id)} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
                <h3 className="text-lg font-medium text-muted-foreground">No templates match your criteria.</h3>
                <p className="text-sm text-muted-foreground">Try selecting a different filter or adjusting your search.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
