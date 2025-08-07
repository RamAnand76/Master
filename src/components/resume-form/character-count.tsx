
'use client';

import { useFormContext } from 'react-hook-form';
import type { FieldPath, FieldValues } from 'react-hook-form';
import { cn } from '@/lib/utils';

type CharacterCountProps<T extends FieldValues> = {
  name: FieldPath<T>;
  max: number;
};

export function CharacterCount<T extends FieldValues>({ name, max }: CharacterCountProps<T>) {
  const { watch } = useFormContext<T>();
  const value = watch(name);
  const length = value?.length || 0;
  const isOverLimit = length > max;

  return (
    <div
      className={cn('text-xs text-right text-muted-foreground', {
        'text-destructive': isOverLimit,
      })}
    >
      {length} / {max}
    </div>
  );
}
