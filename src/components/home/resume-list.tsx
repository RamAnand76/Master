
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
import { MoreHorizontal, ListTodo, FileText } from 'lucide-react';
import type { ResumeData } from '@/lib/types';

type ResumeListProps = {
    projects: ResumeData[];
    deleteProject: (id: string) => void;
    hasReachedLimit: boolean;
};

export default function ResumeList({ projects, deleteProject, hasReachedLimit }: ResumeListProps) {
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
        </>
    );
}
