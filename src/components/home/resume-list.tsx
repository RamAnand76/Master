
"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
} from "@/components/ui/alert-dialog";
import { MoreHorizontal, ListTodo, FileText, Trash2, FilePlus2, Users } from 'lucide-react';
import type { ResumeData } from '@/lib/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ShineBorder } from '../magicui/shine-border';


type ResumeListProps = {
    projects: ResumeData[];
    deleteProject: (id: string) => void;
    hasReachedLimit: boolean;
    onNewResumeClick: () => void;
};

export default function ResumeList({ projects, deleteProject, hasReachedLimit, onNewResumeClick }: ResumeListProps) {
    return (
        <>
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
                <TabsList className="text-base md:text-sm">
                    <TabsTrigger value="workspaces" className="px-4 py-2">My Resumes</TabsTrigger>
                    <TabsTrigger value="shared" className="px-4 py-2">Shared with me</TabsTrigger>
                </TabsList>
                <TabsContent value="workspaces" className="mt-6">
                    {projects.length > 0 ? (
                        <div className="space-y-2">
                            {projects.map((project, i) => (
                                <ShineBorder 
                                    key={project.id} 
                                    className="animate-in fade-in z-10"
                                    style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'backwards' }}
                                >
                                    <div className="p-3 flex items-center gap-4 transition-colors bg-background rounded-md">
                                        <FileText className="w-6 h-6 text-primary" />
                                        <div className="flex-1">
                                            <Link href={`/workspace/${project.id}`} className="font-semibold hover:underline">{project.name}</Link>
                                            <div className="text-xs text-muted-foreground flex items-center gap-2">
                                                <span>{new Date().toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <AlertDialog>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="text-muted-foreground" aria-label="Options">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <AlertDialogTrigger asChild>
                                                        <DropdownMenuItem className="text-red-400 hover:!text-red-400 focus:!text-red-400">
                                                            <Trash2 className="mr-2 h-4 w-4"/>
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </AlertDialogTrigger>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
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
                                    </div>
                                </ShineBorder>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center">
                            <FilePlus2 className="w-16 h-16 text-muted-foreground/50 mb-4" />
                            <h3 className="text-xl font-medium text-muted-foreground">No resumes yet.</h3>
                            <p className="text-muted-foreground mb-4">Click the button below to get started.</p>
                            <Button onClick={onNewResumeClick}>
                                <FilePlus2 className="mr-2 h-4 w-4" />
                                Create New Resume
                            </Button>
                        </div>
                    )}
                </TabsContent>
                <TabsContent value="shared" className="mt-6">
                    <div className="text-center py-16 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center">
                        <Users className="w-16 h-16 text-muted-foreground/50 mb-4" />
                        <h3 className="text-xl font-medium text-muted-foreground">No shared resumes.</h3>
                        <p className="text-muted-foreground">Resumes shared with you will appear here.</p>
                    </div>
                </TabsContent>
            </Tabs>
        </>
    );
}
