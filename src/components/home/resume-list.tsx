
"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
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
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '../ui/tooltip';
import { ShineBorder } from '../magicui/shine-border';
import { ShinyButton } from '../magicui/shiny-button';


type ResumeListProps = {
    projects: ResumeData[];
    deleteProject: (id: string) => void;
    hasReachedLimit: boolean;
    onNewResumeClick: () => void;
};

export default function ResumeList({ projects, deleteProject, hasReachedLimit, onNewResumeClick }: ResumeListProps) {
    return (
        <ShineBorder
            className="bg-card border-border/20 shadow-sm light-theme-glow"
            color={["#408080", "#00FFFF", "#408080"]}
        >
        <Card className="bg-transparent border-0">
            {hasReachedLimit && (
                <CardHeader className="flex flex-row items-center gap-4 p-4 border-b border-border/40">
                    <ListTodo className="w-5 h-5 text-primary"/>
                    <div className="flex-1">
                        <CardTitle className="text-base">You have reached your workspace limit.</CardTitle>
                        <CardDescription className="text-xs">Upgrade to premium to create more resumes.</CardDescription>
                    </div>
                    <ShinyButton borderRadius='0.5rem'>Upgrade</ShinyButton>
                </CardHeader>
            )}

            <Tabs defaultValue="workspaces" className="p-1">
                <CardHeader className="px-4 pt-4 pb-2">
                    <TabsList>
                        <TabsTrigger value="workspaces">My Resumes</TabsTrigger>
                        <TabsTrigger value="shared">Shared with me</TabsTrigger>
                    </TabsList>
                </CardHeader>
                <TabsContent value="workspaces" className="m-0 min-h-[250px]">
                    <CardContent className="p-4 pt-2">
                    {projects.length > 0 ? (
                        <div className="space-y-2">
                            {projects.map((project) => (
                                <ShineBorder 
                                    key={project.id} 
                                    className="bg-card/30 border-border/20 shadow-sm"
                                    color={["#408080", "#00FFFF", "#408080"]}
                                >
                                <div 
                                    className="p-2.5 flex items-center gap-3 transition-all duration-200 rounded-md bg-background/50 hover:bg-background/80 hover:shadow-md hover:border-primary/20"
                                >
                                    <FileText className="w-5 h-5 text-primary" />
                                    <div className="flex-1">
                                        <Link href={`/workspace/${project.id}`} className="font-medium text-sm hover:underline">{project.name}</Link>
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        <span>{project.createdAt ? new Date(project.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}</span>
                                    </div>
                                    <AlertDialog>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" aria-label="Options">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <AlertDialogTrigger asChild>
                                                    <DropdownMenuItem 
                                                        className="text-red-400 hover:!text-red-400 focus:!text-red-400 focus:!bg-red-400/10" 
                                                        aria-label="Delete resume"
                                                        onSelect={(e) => e.preventDefault()}
                                                    >
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
                        <div className="text-center py-12 border-2 border-dashed border-border/30 rounded-lg flex flex-col items-center justify-center">
                            <FilePlus2 className="w-12 h-12 text-muted-foreground/50 mb-3" />
                            <h3 className="text-lg font-medium text-muted-foreground">No resumes yet.</h3>
                            <p className="text-sm text-muted-foreground mb-4">Click the button below to get started.</p>
                            <Button onClick={onNewResumeClick} size="sm" variant="outline">
                                <FilePlus2 className="mr-2 h-4 w-4" />
                                Create New Resume
                            </Button>
                        </div>
                    )}
                    </CardContent>
                </TabsContent>
                <TabsContent value="shared" className="mt-0 min-h-[250px]">
                    <div className="p-4 pt-2">
                        <div className="text-center py-12 border-2 border-dashed border-border/30 rounded-lg flex flex-col items-center justify-center">
                            <Users className="w-12 h-12 text-muted-foreground/50 mb-3" />
                            <h3 className="text-lg font-medium text-muted-foreground">No shared resumes.</h3>
                            <p className="text-sm text-muted-foreground">Resumes shared with you will appear here.</p>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </Card>
        </ShineBorder>
    );
}
