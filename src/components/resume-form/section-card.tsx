
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';

type SectionCardProps = {
    title: string;
    children: React.ReactNode;
    onAdd?: () => void;
    addText?: string;
};

export default function SectionCard({ title, children, onAdd, addText }: SectionCardProps) {
    return (
        <Card className="bg-card border-border/20 shadow-lg mb-6 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-primary">{title}</CardTitle>
                {onAdd && addText && (
                    <Button variant="ghost" size="sm" onClick={onAdd} type="button">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        {addText}
                    </Button>
                )}
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );
}
