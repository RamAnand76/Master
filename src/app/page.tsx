
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { ResumeData } from '@/lib/types';
import NewProjectModal from '@/components/new-project-modal';
import HomeHero from '@/components/home/home-hero';
import ResumeList from '@/components/home/resume-list';
import { useUser } from '@/hooks/use-user';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

export default function Home() {
  const [projects, setProjects] = useState<ResumeData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { user, isAuthenticated, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoaded, isAuthenticated, router]);
  
  useEffect(() => {
    if (isAuthenticated) {
      const savedProjects = localStorage.getItem('resuMasterProjects');
      if (savedProjects) {
        try {
          const parsedProjects: ResumeData[] = JSON.parse(savedProjects);
          if (Array.isArray(parsedProjects)) {
              const sortedProjects = parsedProjects.sort((a, b) => {
                const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                return dateB - dateA;
              });
              setProjects(sortedProjects);
          }
        } catch (error) {
          console.error("Failed to parse projects from localStorage", error);
          setProjects([]);
        }
      }
    }
  }, [isAuthenticated]);
  
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
  
  if (!isLoaded || !isAuthenticated) {
    return (
        <div className="min-h-screen bg-background p-8">
            <Skeleton className="h-12 w-full mb-8" />
            <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <Skeleton className="h-24 w-2/3" />
                    <Skeleton className="h-10 w-48" />
                </div>
                <div>
                    <Skeleton className="h-64 w-full" />
                </div>
            </div>
        </div>
    );
  }

  return (
    <>
      <NewProjectModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onProjectCreate={(newProject) => {
          const updatedProjects = [...projects, newProject].sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
          });
          setProjects(updatedProjects);
          localStorage.setItem('resuMasterProjects', JSON.stringify(updatedProjects));
          router.push(`/workspace/${newProject.id}`);
        }}
      />
      <main className="flex-1 overflow-y-auto pt-4">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center py-12"
        >
            <div className="max-w-screen-xl w-full mx-auto grid lg:grid-cols-2 gap-12 p-8">
                <div className="lg:col-span-1">
                  <HomeHero 
                    onNewResumeClick={handleOpenModal} 
                    hasReachedLimit={hasReachedLimit} 
                  />
                </div>
                <div className="lg:col-span-1">
                  <ResumeList 
                    projects={projects} 
                    deleteProject={deleteProject} 
                    hasReachedLimit={hasReachedLimit}
                    onNewResumeClick={handleOpenModal} 
                  />
                </div>
            </div>
        </motion.div>
      </main>
    </>
  );
}
