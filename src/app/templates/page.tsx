
import TemplateCard from '@/components/templates/template-card';

const templates = [
  {
    name: 'Classic',
    imageUrl: 'https://placehold.co/400x565.png',
    tags: ['Traditional', 'Professional'],
    dataAiHint: 'resume professional',
  },
  {
    name: 'Modern',
    imageUrl: 'https://placehold.co/400x565.png',
    tags: ['Creative', 'Minimalist'],
    dataAiHint: 'resume creative',
  },
  {
    name: 'Elegant',
    imageUrl: 'https://placehold.co/400x565.png',
    tags: ['Sophisticated', 'Simple'],
    dataAiHint: 'resume simple',
  },
    {
    name: 'Corporate',
    imageUrl: 'https://placehold.co/400x565.png',
    tags: ['ATS-Friendly', 'Formal'],
    dataAiHint: 'resume formal',
  },
  {
    name: 'Tech',
    imageUrl: 'https://placehold.co/400x565.png',
    tags: ['Developer', 'Modern'],
    dataAiHint: 'resume tech',
  },
  {
    name: 'Creative',
    imageUrl: 'https://placehold.co/400x565.png',
    tags: ['Designer', 'Visual'],
    dataAiHint: 'resume design',
  },
];

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <main className="max-w-7xl mx-auto p-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Resume Templates</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Choose a professionally designed template to kickstart your career. Each one is crafted to be ATS-friendly and fully customizable.
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <TemplateCard key={index} {...template} />
          ))}
        </div>
      </main>
    </div>
  );
}
