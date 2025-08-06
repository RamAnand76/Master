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
      <main className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
                This is where account settings will be managed. More options coming soon!
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
