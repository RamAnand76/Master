
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
                <CardHeader className="flex flex-row items-center justify-between w-full p-4">
                    <AccordionTrigger className="w-full hover:no-underline flex justify-between items-center">
                        <CardTitle className="text-accent">{title}</CardTitle>
                        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 text-muted-foreground group-data-[state=open]:rotate-180" />
                    </AccordionTrigger>
                    {onAdd && addText && (
                        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onAdd(); }} type="button" className="ml-4">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            {addText}
                        </Button>
                    )}
                </CardHeader>
                <AccordionContent>
                    <CardContent>{children}</CardContent>
                </AccordionContent>
            </Card>
        </AccordionItem>
    );
}
