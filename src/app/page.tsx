
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { ResumeData } from '@/lib/types';
import NewProjectModal from '@/components/new-project-modal';
import HomeHeader from '@/components/home/home-header';
import HomeHero from '@/components/home/home-hero';
import ResumeList from '@/components/home/resume-list';

export default function Home() {
  const [projects, setProjects] = useState<ResumeData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedProjects = localStorage.getItem('resuMasterProjects');
    if (savedProjects) {
      try {
        const parsedProjects = JSON.parse(savedProjects);
        if (Array.isArray(parsedProjects)) {
            setProjects(parsedProjects);
        }
      } catch (error) {
        console.error("Failed to parse projects from localStorage", error);
        setProjects([]);
      }
    }
  }, []);
  
  const hasReachedLimit = projects.length >= 5;

  const handleOpenModal = () => {
    if (!hasReachedLimit) {
      setIsModalOpen(true);
    }
  };

  const deleteProject = (projectId: string) => {
    const updatedProjects = projects.filter(p => p.id !== projectId);
    setProjects(updatedProjects);
    localStorage.setItem('resuMasterProjects', JSON.stringify(updatedProjects));
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NewProjectModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onProjectCreate={(newProject) => {
          const updatedProjects = [...projects, newProject];
          setProjects(updatedProjects);
          localStorage.setItem('resuMasterProjects', JSON.stringify(updatedProjects));
          router.push(`/workspace/${newProject.id}`);
        }}
      />
      <HomeHeader />

      <main className="p-8 max-w-6xl mx-auto">
        <HomeHero onNewResumeClick={handleOpenModal} hasReachedLimit={hasReachedLimit} />
        
        <ResumeList 
          projects={projects} 
          deleteProject={deleteProject} 
          hasReachedLimit={hasReachedLimit} 
        />
      </main>
    </div>
  );
}
