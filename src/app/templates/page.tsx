
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">Resume Templates</h1>
        <p className="text-muted-foreground mt-2">
          Choose a template to start building your professional resume.
        </p>
      </header>
      <main className="max-w-7xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Templates Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We are working on a variety of professional resume templates.
              Stay tuned!
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
