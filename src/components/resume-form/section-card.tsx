
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PlusCircle } from 'lucide-react';
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
                <CardHeader>
                    <div className="flex justify-between items-center w-full">
                        <AccordionTrigger className="flex-1 hover:no-underline p-0 text-left">
                            <CardTitle className="text-accent">{title}</CardTitle>
                        </AccordionTrigger>
                        {onAdd && addText && (
                            <Button variant="ghost" size="sm" onClick={onAdd} type="button" className="mr-4">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                {addText}
                            </Button>
                        )}
                    </div>
                </CardHeader>
                <AccordionContent>
                    <CardContent>{children}</CardContent>
                </AccordionContent>
            </Card>
        </AccordionItem>
    );
}
