"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
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

  const createNewProject = () => {
    const newProject = resumeDataSchema.parse({
      id: crypto.randomUUID(),
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
    <main className="min-h-screen bg-background text-foreground p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold font-headline text-primary">ResuMaster</h1>
          <Button onClick={createNewProject} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Button>
        </header>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Your Workspaces</h2>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(project => (
                <Card key={project.id} className="bg-secondary border-border transition-all hover:shadow-lg hover:shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="truncate">{project.name}</CardTitle>
                    <CardDescription>
                      {project.personalDetails?.name || 'No name yet'}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between">
                    <Button asChild variant="link" className="p-0 h-auto text-accent hover:text-accent/80">
                      <Link href={`/workspace/${project.id}`}>
                        Open Workspace
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                         <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                           <Trash2 className="h-4 w-4" />
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
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed border-border rounded-lg">
              <h3 className="text-xl font-medium text-muted-foreground">No projects yet.</h3>
              <p className="text-muted-foreground mb-4">Click "New Project" to get started.</p>
              <Button onClick={createNewProject} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="mr-2 h-4 w-4" /> Create Your First Project
              </Button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
