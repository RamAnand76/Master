
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ChevronDown, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type SectionCardProps = {
    title: string;
    value: string;
    children: React.ReactNode;
    onAdd?: () => void;
    addText?: string;
    className?: string;
};

export default function SectionCard({ title, value, children, onAdd, addText, className }: SectionCardProps) {
    return (
        <AccordionItem value={value}>
            <Card className={cn("bg-card border-border/20 shadow-lg overflow-hidden", className)}>
                <AccordionTrigger className="w-full hover:no-underline">
                     <CardHeader className="flex flex-row items-center justify-between w-full p-4">
                        <CardTitle className="text-accent">{title}</CardTitle>
                        <div className="flex items-center gap-4">
                            {onAdd && addText && (
                                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onAdd(); }} type="button">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    {addText}
                                </Button>
                            )}
                            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 text-muted-foreground group-data-[state=open]:rotate-180" />
                        </div>
                    </CardHeader>
                </AccordionTrigger>
                <AccordionContent>
                    <CardContent>{children}</CardContent>
                </AccordionContent>
            </Card>
        </AccordionItem>
    );
}
