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
import { useData } from '@/contexts/DataContext';
import type { Skill } from '@/types';

interface SkillFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skill?: Skill;
  defaultCategory?: string;
}

export function SkillForm({ open, onOpenChange, skill, defaultCategory }: SkillFormProps) {
  const { addSkill, updateSkill } = useData();
  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState(skill?.category ?? defaultCategory ?? '');
  const [name, setName] = useState(skill?.name ?? '');
  const [proficiency, setProficiency] = useState(skill?.proficiency ?? 50);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      category,
      name,
      proficiency,
      order: skill?.order ?? 0,
    };

    try {
      if (skill) {
        await updateSkill(skill.id, data);
      } else {
        await addSkill(data);
      }
      onOpenChange(false);
    } catch (err) {
      console.error('Failed to save skill:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-heading">{skill ? 'Edit' : 'Add'} Skill</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} required className="bg-secondary border-border" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Skill Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required className="bg-secondary border-border" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="proficiency">Proficiency ({proficiency}%)</Label>
            <input
              id="proficiency"
              type="range"
              min="0"
              max="100"
              value={proficiency}
              onChange={(e) => setProficiency(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Saving...' : skill ? 'Update' : 'Add'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
