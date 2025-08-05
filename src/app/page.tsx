"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, GitBranch, Sun, FileText, MoreHorizontal, ListTodo, AlertTriangle, Search, Wand2, Star } from 'lucide-react';
import type { ResumeData } from '@/lib/types';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { resumeDataSchema } from '@/lib/types';
import { ShinyButton } from '@/components/magicui/shiny-button';

const AppLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.75 1.5C12.3358 1.5 12 1.83579 12 2.25V7.54289C12 7.95711 12.3358 8.29289 12.75 8.29289H21.75C22.1642 8.29289 22.5 7.95711 22.5 7.54289V2.25C22.5 1.83579 22.1642 1.5 21.75 1.5H12.75Z" fill="url(#paint0_linear_1_2)"/>
      <path d="M1.5 12.75C1.5 12.3358 1.83579 12 2.25 12H7.54289C7.95711 12 8.29289 12.3358 8.29289 12.75V21.75C8.29289 22.1642 7.95711 22.5 7.54289 22.5H2.25C1.83579 22.5 1.5 22.1642 1.5 21.75V12.75Z" fill="url(#paint1_linear_1_2)"/>
      <path d="M1.5 2.25C1.5 1.83579 1.83579 1.5 2.25 1.5H11.25C11.6642 1.5 12 1.83579 12 2.25V11.25C12 11.6642 11.6642 12 11.25 12H2.25C1.83579 12 1.5 11.6642 1.5 11.25V2.25Z" fill="url(#paint2_linear_1_2)"/>
      <path d="M12.75 9.70711C12.3358 9.70711 12 10.0429 12 10.4571V21.75C12 22.1642 12.3358 22.5 12.75 22.5H21.75C22.1642 22.5 22.5 22.1642 22.5 21.75V10.4571C22.5 10.0429 22.1642 9.70711 21.75 9.70711H12.75Z" fill="url(#paint3_linear_1_2)"/>
      <defs>
        <linearGradient id="paint0_linear_1_2" x1="12.75" y1="1.5" x2="22.5" y2="8.29289" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B"/>
          <stop offset="1" stopColor="#EF4444"/>
        </linearGradient>
        <linearGradient id="paint1_linear_1_2" x1="1.5" y1="12.75" x2="8.29289" y2="22.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6"/>
          <stop offset="1" stopColor="#EC4899"/>
        </linearGradient>
        <linearGradient id="paint2_linear_1_2" x1="1.5" y1="1.5" x2="12" y2="12" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6"/>
          <stop offset="1" stopColor="#10B981"/>
        </linearGradient>
        <linearGradient id="paint3_linear_1_2" x1="12" y1="22.5" x2="22.5" y2="9.70711" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B"/>
          <stop offset="1" stopColor="#EF4444"/>
        </linearGradient>
      </defs>
    </svg>
  );

export default function Home() {
  const [projects, setProjects] = useState<ResumeData[]>([]);
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

  const createNewProject = () => {
    if (hasReachedLimit) return;
    const newProject = resumeDataSchema.parse({
      id: `studio-${Math.random().toString(36).substring(2, 12)}`,
      name: `New Resume ${projects.length + 1}`,
    });

    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    localStorage.setItem('resuMasterProjects', JSON.stringify(updatedProjects));
    router.push(`/workspace/${newProject.id}`);
  };

  const deleteProject = (projectId: string) => {
    const updatedProjects = projects.filter(p => p.id !== projectId);
    setProjects(updatedProjects);
    localStorage.setItem('resuMasterProjects', JSON.stringify(updatedProjects));
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="p-4 flex justify-between items-center border-b border-border">
          <div className="flex items-center gap-4">
              <AppLogo />
          </div>
          <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon"><Sun className="h-5 w-5"/></Button>
              <Avatar>
                  <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="user avatar" />
                  <AvatarFallback>U</AvatarFallback>
              </Avatar>
          </div>
      </header>

      <main className="p-8 max-w-6xl mx-auto">
        <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold">
              Hey there, let&apos;s build your next
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500">
                  &nbsp;Resume
              </span>
            </h1>
        </div>

        <div className="mb-12 flex justify-center">
            <ShinyButton className="h-16 text-xl px-12 border" onClick={createNewProject} disabled={hasReachedLimit}>
                <Plus className="mr-4 h-6 w-6" /> Create New Resume
            </ShinyButton>
        </div>
        
        {hasReachedLimit && (
          <Card className="mb-8 bg-card border-border">
            <CardHeader className="flex flex-row items-center gap-4">
              <ListTodo className="w-6 h-6 text-primary"/>
              <div className="flex-1">
                <CardTitle>You have reached your workspace limit.</CardTitle>
                <CardDescription>Upgrade to premium to create more resumes.</CardDescription>
              </div>
              <Button>Upgrade</Button>
            </CardHeader>
          </Card>
        )}

        <Tabs defaultValue="workspaces">
          <TabsList>
            <TabsTrigger value="workspaces">My Resumes</TabsTrigger>
            <TabsTrigger value="shared">Shared with me</TabsTrigger>
          </TabsList>
          <TabsContent value="workspaces" className="mt-6">
            {projects.length > 0 ? (
              <div className="space-y-2">
                {projects.map(project => (
                  <Card key={project.id} className="bg-card border-border p-3 flex items-center gap-4 hover:bg-accent/50 transition-colors">
                    <FileText className="w-6 h-6 text-orange-400" />
                    <div className="flex-1">
                      <Link href={`/workspace/${project.id}`} className="font-semibold hover:underline">{project.name}</Link>
                      <div className="text-xs text-muted-foreground flex items-center gap-2">
                          <span>{project.id}</span>
                          <span>•</span>
                          <span>Accessed 6 minutes ago</span>
                      </div>
                    </div>
                     <AlertDialog>
                      <AlertDialogTrigger asChild>
                         <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                           <MoreHorizontal className="h-4 w-4" />
                         </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your project.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteProject(project.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </Card>
                ))}
              </div>
            ) : (
                <div className="text-center py-16 border-2 border-dashed border-border rounded-lg">
                    <h3 className="text-xl font-medium text-muted-foreground">No resumes yet.</h3>
                    <p className="text-muted-foreground mb-4">Click "Create New Resume" to get started.</p>
                </div>
            )}
          </TabsContent>
          <TabsContent value="shared" className="mt-6">
              <div className="text-center py-16 border-2 border-dashed border-border rounded-lg">
                <h3 className="text-xl font-medium text-muted-foreground">No shared resumes.</h3>
                <p className="text-muted-foreground">Resumes shared with you will appear here.</p>
              </div>
          </TabsContent>
        </Tabs>

      </main>
    </div>
  );
}
