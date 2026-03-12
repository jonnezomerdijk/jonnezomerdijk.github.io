import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pencil } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { PersonalForm } from '@/components/admin/PersonalForm';

export function PersonalSection() {
  const { isAdmin } = useAuth();
  const { personalContent } = useData();
  const [formOpen, setFormOpen] = useState(false);

  const tabs = [...(personalContent.tabs ?? [])].sort((a, b) => a.order - b.order);
  const defaultTab = tabs[0]?.id ?? 'languages';

  return (
    <section id="personal" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl font-bold font-heading">Personal</h2>
          {isAdmin && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setFormOpen(true)}
              className="h-8 w-8 border-primary/30 text-primary hover:bg-primary/10"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          )}
        </div>

        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="w-full justify-start mb-8 bg-secondary">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              <Card className="p-6 bg-card border-border">
                {/* Travel-style: image beside text */}
                {tab.image && !tab.languages ? (
                  <div className="grid md:grid-cols-2 gap-12">
                    <div>
                      <img src={tab.image} alt={tab.title} className="rounded-lg mb-4 w-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4 font-heading">International Experience</h3>
                      <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{tab.text}</p>
                    </div>
                  </div>
                ) : (
                  /* Languages-style or plain text */
                  <div className="space-y-6">
                    {tab.text && (
                      <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{tab.text}</p>
                    )}
                    {tab.image && (
                      <img src={tab.image} alt={tab.title} className="rounded-lg w-full max-w-md object-cover" />
                    )}
                    {tab.languages && tab.languages.length > 0 && (
                      <div className="grid md:grid-cols-2 gap-6">
                        {tab.languages.map((lang) => (
                          <div key={lang.name} className="flex items-center justify-between">
                            <div>
                              <span className="text-foreground font-medium">{lang.name}</span>
                              <span className="text-muted-foreground text-sm ml-2">({lang.note})</span>
                            </div>
                            <div className="flex gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <span key={i} className={`text-lg ${i < lang.level ? 'text-primary' : 'text-secondary'}`}>
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <PersonalForm
        key={formOpen ? 'open' : 'closed'}
        open={formOpen}
        onOpenChange={setFormOpen}
        content={personalContent}
      />
    </section>
  );
}
