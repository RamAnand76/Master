
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

type FieldArrayItemProps = {
    index: number;
    onRemove: (index: number) => void;
    children: React.ReactNode;
};

export default function FieldArrayItem({ index, onRemove, children }: FieldArrayItemProps) {
    return (
        <div className="relative p-4 border border-border rounded-lg mb-4">
            {children}
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-muted-foreground hover:text-red-500"
                onClick={() => onRemove(index)}
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
}
