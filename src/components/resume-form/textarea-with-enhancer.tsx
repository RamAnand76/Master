
'use client';

import { ControllerRenderProps } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CharacterCount } from './character-count';
import { ResumeData } from '@/lib/types';

type TextareaWithEnhancerProps = {
  field: ControllerRenderProps<any, any>;
  placeholder: string;
  max: number;
  onEnhance: () => void;
  rows?: number;
};

export default function TextareaWithEnhancer({
  field,
  placeholder,
  max,
  onEnhance,
  rows = 5,
}: TextareaWithEnhancerProps) {
  const value = field.value || '';
  const length = value.length;
  const isOverLimit = length > max;

  return (
    <div className="relative">
      <Textarea
        {...field}
        placeholder={placeholder}
        rows={rows}
        className="pb-10" // Add padding to the bottom to make space for the button and count
      />
      <div className="absolute bottom-2 right-2 flex items-center gap-2">
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="h-7 w-7 text-primary hover:text-primary"
          onClick={onEnhance}
        >
          <Wand2 className="h-4 w-4" />
        </Button>
      </div>
      <div
        className={cn(
          'absolute bottom-2.5 left-3 text-xs text-muted-foreground',
          {
            'text-destructive': isOverLimit,
          }
        )}
      >
        {length} / {max}
      </div>
    </div>
  );
}
