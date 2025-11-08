
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TemplateCard from '@/components/templates/template-card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { InputGroup } from '@/components/ui/input-group';
import type { ResumeData, Template as TemplateType } from '@/lib/types';
import { templates } from '@/lib/templates';
import TemplatePreviewModal from '@/components/templates/template-preview-modal';
import NewProjectModal from '@/components/new-project-modal';
import { motion } from 'framer-motion';

const categories = ['All', 'Creative', 'Professional', 'Modern'];
const tiers = ['All', 'Free', 'Pro', 'Premium'];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};

export default function TemplatesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTier, setActiveTier] = useState('All');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedTemplateForPreview, setSelectedTemplateForPreview] = useState<TemplateType | null>(null);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [selectedTemplateForNewProject, setSelectedTemplateForNewProject] = useState<string | undefined>(undefined);
  const router = useRouter();

  const handleUseTemplate = (templateId: string) => {
    setSelectedTemplateForNewProject(templateId);
    setIsNewProjectModalOpen(true);
  };
  
  const handlePreview = (template: TemplateType) => {
    setSelectedTemplateForPreview(template);
  };
  
  const handleProjectCreate = (newProject: ResumeData) => {
    const savedProjects = localStorage.getItem('resuMasterProjects');
    let projects: ResumeData[] = savedProjects ? JSON.parse(savedProjects) : [];
    const updatedProjects = [...projects, newProject].sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
    });
    localStorage.setItem('resuMasterProjects', JSON.stringify(updatedProjects));
    router.push(`/workspace/${newProject.id}`);
  };


  const filteredTemplates = templates.filter(template => {
    const tierMatch = activeTier === 'All' || template.tier === activeTier;
    const categoryMatch = activeCategory === 'All' || template.category === activeCategory;
    const searchMatch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) || template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return tierMatch && categoryMatch && searchMatch;
  });

  return (
    <>
    <div className="min-h-screen bg-background text-foreground pb-24">
      <main className="max-w-7xl mx-auto p-8 pt-12">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold tracking-tight">Resume Templates</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Choose a professionally designed template to kickstart your career. Each one is crafted to be ATS-friendly and fully customizable.
          </p>
        </motion.header>

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


        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        >
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template) => (
                <motion.div key={template.id} variants={itemVariants}>
                    <TemplateCard 
                        template={template} 
                        onUseTemplate={() => handleUseTemplate(template.id)}
                        onPreview={() => handlePreview(template)}
                    />
                </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
                <h3 className="text-lg font-medium text-muted-foreground">No templates match your criteria.</h3>
                <p className="text-sm text-muted-foreground">Try selecting a different filter or adjusting your search.</p>
            </div>
          )}
        </motion.div>
      </main>
    </div>
    <TemplatePreviewModal
        isOpen={!!selectedTemplateForPreview}
        onOpenChange={() => setSelectedTemplateForPreview(null)}
        template={selectedTemplateForPreview}
        onUseTemplate={handleUseTemplate}
    />
    <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onOpenChange={setIsNewProjectModalOpen}
        onProjectCreate={handleProjectCreate}
        initialTemplate={selectedTemplateForNewProject}
    />
    </>
  );
}
