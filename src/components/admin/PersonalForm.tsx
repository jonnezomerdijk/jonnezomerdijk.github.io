import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Plus, ChevronUp, ChevronDown } from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import type { PersonalContent, PersonalTab, Language } from '@/types';

interface PersonalFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: PersonalContent;
}

export function PersonalForm({ open, onOpenChange, content }: PersonalFormProps) {
  const { updatePersonalContent } = useData();
  const [loading, setLoading] = useState(false);
  const [tabs, setTabs] = useState<PersonalTab[]>(
    [...content.tabs].sort((a, b) => a.order - b.order)
  );
  const [activeTab, setActiveTab] = useState(0);

  const updateTab = (index: number, field: keyof PersonalTab, value: unknown) => {
    setTabs((prev) => prev.map((t, i) => i === index ? { ...t, [field]: value } : t));
  };

  const moveTab = (index: number, dir: 'up' | 'down') => {
    const target = dir === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= tabs.length) return;
    const next = [...tabs];
    [next[index], next[target]] = [next[target], next[index]];
    setTabs(next);
    setActiveTab(target);
  };

  const addTab = () => {
    const newTab: PersonalTab = {
      id: `tab-${Date.now()}`,
      title: 'New Section',
      order: tabs.length,
      text: '',
    };
    setTabs((prev) => [...prev, newTab]);
    setActiveTab(tabs.length);
  };

  const removeTab = (index: number) => {
    setTabs((prev) => prev.filter((_, i) => i !== index));
    setActiveTab(Math.max(0, index - 1));
  };

  const toggleLanguages = (index: number) => {
    const tab = tabs[index];
    if (tab.languages) {
      updateTab(index, 'languages', undefined);
    } else {
      updateTab(index, 'languages', [{ name: '', level: 3, note: '' }]);
    }
  };

  const toggleImage = (index: number) => {
    const tab = tabs[index];
    if (tab.image !== undefined) {
      updateTab(index, 'image', undefined);
    } else {
      updateTab(index, 'image', '');
    }
  };

  const updateLanguage = (tabIndex: number, langIndex: number, field: keyof Language, value: string | number) => {
    const langs = [...(tabs[tabIndex].languages ?? [])];
    langs[langIndex] = { ...langs[langIndex], [field]: value };
    updateTab(tabIndex, 'languages', langs);
  };

  const addLanguage = (tabIndex: number) => {
    const langs = [...(tabs[tabIndex].languages ?? []), { name: '', level: 3, note: '' }];
    updateTab(tabIndex, 'languages', langs);
  };

  const removeLanguage = (tabIndex: number, langIndex: number) => {
    const langs = (tabs[tabIndex].languages ?? []).filter((_, i) => i !== langIndex);
    updateTab(tabIndex, 'languages', langs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const numbered = tabs.map((t, i) => ({ ...t, order: i }));
      await updatePersonalContent({ tabs: numbered });
      onOpenChange(false);
    } catch (err) {
      console.error('Failed to save personal content:', err);
    } finally {
      setLoading(false);
    }
  };

  const tab = tabs[activeTab];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading">Edit Personal Sections</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Section selector */}
          <div className="flex flex-wrap gap-2 items-center">
            {tabs.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(i)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  i === activeTab
                    ? 'bg-primary/15 text-primary border border-primary/40'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                {t.title || 'Untitled'}
              </button>
            ))}
            <Button type="button" variant="ghost" size="sm" onClick={addTab} className="text-primary hover:bg-primary/10 h-7 px-2">
              <Plus className="h-3.5 w-3.5 mr-1" /> Add Section
            </Button>
          </div>

          {tab && (
            <div className="space-y-4 border border-border rounded-lg p-4">
              {/* Tab header controls */}
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-3">
                  <Label htmlFor="tab-title">Section Title</Label>
                  <Input
                    id="tab-title"
                    value={tab.title}
                    onChange={(e) => updateTab(activeTab, 'title', e.target.value)}
                    className="bg-secondary border-border mt-1"
                  />
                </div>
                <div className="flex gap-1 mt-5">
                  <Button type="button" variant="ghost" size="icon" onClick={() => moveTab(activeTab, 'up')} disabled={activeTab === 0} className="h-8 w-8 hover:bg-primary/10 disabled:opacity-30">
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="icon" onClick={() => moveTab(activeTab, 'down')} disabled={activeTab === tabs.length - 1} className="h-8 w-8 hover:bg-primary/10 disabled:opacity-30">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeTab(activeTab)} className="h-8 w-8 text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Text */}
              <div className="space-y-1">
                <Label>Text</Label>
                <Textarea
                  value={tab.text}
                  onChange={(e) => updateTab(activeTab, 'text', e.target.value)}
                  rows={5}
                  className="bg-secondary border-border resize-none"
                />
              </div>

              {/* Image toggle */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="has-image"
                    checked={tab.image !== undefined}
                    onChange={() => toggleImage(activeTab)}
                    className="accent-primary"
                  />
                  <Label htmlFor="has-image" className="cursor-pointer">Show image</Label>
                </div>
                {tab.image !== undefined && (
                  <Input
                    value={tab.image}
                    onChange={(e) => updateTab(activeTab, 'image', e.target.value)}
                    placeholder="Image URL"
                    className="bg-secondary border-border"
                  />
                )}
              </div>

              {/* Languages toggle */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="has-languages"
                    checked={!!tab.languages}
                    onChange={() => toggleLanguages(activeTab)}
                    className="accent-primary"
                  />
                  <Label htmlFor="has-languages" className="cursor-pointer">Show language ratings</Label>
                </div>
                {tab.languages && (
                  <div className="space-y-2">
                    {tab.languages.map((lang, langIdx) => (
                      <div key={langIdx} className="flex items-center gap-2">
                        <Input
                          value={lang.name}
                          onChange={(e) => updateLanguage(activeTab, langIdx, 'name', e.target.value)}
                          placeholder="Language"
                          className="bg-secondary border-border flex-1"
                        />
                        <Input
                          value={lang.note}
                          onChange={(e) => updateLanguage(activeTab, langIdx, 'note', e.target.value)}
                          placeholder="e.g. Fluent"
                          className="bg-secondary border-border flex-1"
                        />
                        <div className="flex items-center gap-1 shrink-0">
                          <span className="text-xs text-muted-foreground w-4 text-center">{lang.level}</span>
                          <input
                            type="range" min="1" max="5" value={lang.level}
                            onChange={(e) => updateLanguage(activeTab, langIdx, 'level', Number(e.target.value))}
                            className="w-20 accent-primary"
                          />
                        </div>
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeLanguage(activeTab, langIdx)} className="h-7 w-7 text-destructive hover:bg-destructive/10 shrink-0">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => addLanguage(activeTab)} className="border-primary/30 text-primary hover:bg-primary/10">
                      <Plus className="h-3.5 w-3.5 mr-1" /> Add Language
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
