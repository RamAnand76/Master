
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your application settings.
        </p>
      </header>
      <main className="max-w-7xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Settings Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
                We are currently building the settings page. You'll be able to manage your preferences here shortly.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
