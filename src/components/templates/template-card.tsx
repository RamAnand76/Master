
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Code } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Template } from '@/lib/types';

type TemplateCardProps = {
  template: Template;
  onUseTemplate: (id: string) => void;
<<<<<<< HEAD
  onPreview: (template: Template) => void;
};

export default function TemplateCard({ template, onUseTemplate, onPreview }: TemplateCardProps) {
    const { id, name, imageUrl, tags, dataAiHint, tier } = template;

=======
  onPreview: () => void;
};

export default function TemplateCard({ id, name, imageUrl, tags, dataAiHint, tier, onUseTemplate, onPreview }: TemplateCardProps) {
>>>>>>> 6121b74a068eff449b5f42d302190bd0c409e7eb
    const tierBadgeColor = {
        Free: 'bg-primary/80',
        Pro: 'bg-orange-500',
        Premium: 'bg-purple-600'
    };
    const tierButtonColor = {
        Free: 'bg-primary/80 hover:bg-primary/70',
        Pro: 'bg-orange-500 hover:bg-orange-500/90',
        Premium: 'bg-purple-600 hover:bg-purple-600/90'
    };
  return (
    <Card className="overflow-hidden group border-border/20 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
        <CardHeader className="p-0 relative">
          <Image
            src={imageUrl}
            alt={`${name} resume template`}
            width={400}
            height={565}
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={dataAiHint}
          />
          <Badge className={cn("absolute top-2 right-2 border-none text-white", tierBadgeColor[tier])}>
            {tier}
          </Badge>
<<<<<<< HEAD
        </CardHeader>
        <CardContent className="p-4 flex-1">
            <CardTitle className="text-base">{name}</CardTitle>
            <div className="flex flex-wrap gap-2 mt-2">
            {tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
                </Badge>
            ))}
            </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center gap-2">
<<<<<<< HEAD
            <Button variant="outline" size="sm" className="w-full" onClick={() => onPreview(template)}>
=======
            <Button variant="outline" size="sm" className="w-full">
=======
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4">
             <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs backdrop-blur-sm bg-background/30">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button variant="outline" size="sm" className="bg-background/80 hover:bg-background" onClick={onPreview}>
>>>>>>> 1395b611130e3487acf2df7701c696a74f881e73
>>>>>>> 6121b74a068eff449b5f42d302190bd0c409e7eb
                <Eye className="mr-2 h-4 w-4"/>
                Preview
            </Button>
            <Button size="sm" className={cn("w-full text-white", tierButtonColor[tier])} onClick={() => onUseTemplate(id)}>
                <Code className="mr-2 h-4 w-4"/>
                Use Template
            </Button>
        </CardFooter>
    </Card>
  );
}
