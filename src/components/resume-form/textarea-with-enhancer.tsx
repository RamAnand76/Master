
'use client';

import { ControllerRenderProps } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
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

  return (
    <div className="relative">
      <Textarea
        {...field}
        placeholder={placeholder}
        rows={rows}
        className="pb-10 pr-10" // Add padding to make space for the button and count
      />
      <div className="absolute bottom-2 right-2 flex items-center gap-2">
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="h-7 w-7 text-primary hover:text-primary"
          onClick={onEnhance}
          aria-label="Enhance with AI"
        >
          <Sparkles className="h-4 w-4" />
        </Button>
      </div>
      <div className="absolute bottom-2.5 left-3">
        <CharacterCount name={field.name as keyof ResumeData} max={max} />
      </div>
    </div>
  );
}
