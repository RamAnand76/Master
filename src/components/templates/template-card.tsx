
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Code } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Template } from '@/lib/types';

type Tier = 'Free' | 'Pro' | 'Premium';

type TemplateCardProps = {
  template: Template;
  onUseTemplate: (id: string) => void;
  onPreview: (template: Template) => void;
};

export default function TemplateCard({ template, onUseTemplate, onPreview }: TemplateCardProps) { 
    const { id, name, imageUrl, tags, dataAiHint, tier } = template as Template & { tier: Tier };
    
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
            <Button variant="outline" size="sm" className="w-full" onClick={() => onPreview(template)}>
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
