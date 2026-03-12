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
import { useData } from '@/contexts/DataContext';
import type { Experience } from '@/types';

interface ExperienceFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  experience?: Experience;
}

export function ExperienceForm({ open, onOpenChange, experience }: ExperienceFormProps) {
  const { addExperience, updateExperience } = useData();
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(experience?.title ?? '');
  const [company, setCompany] = useState(experience?.company ?? '');
  const [location, setLocation] = useState(experience?.location ?? '');
  const [periodStart, setPeriodStart] = useState(experience?.periodStart ?? '');
  const [periodEnd, setPeriodEnd] = useState(experience?.periodEnd ?? '');
  const [description, setDescription] = useState(experience?.description ?? '');
  const [achievements, setAchievements] = useState(experience?.achievements.join('\n') ?? '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      title,
      company,
      location,
      periodStart,
      periodEnd: periodEnd || null,
      description,
      achievements: achievements.split('\n').filter(Boolean),
      order: experience?.order ?? 0,
    };

    try {
      if (experience) {
        await updateExperience(experience.id, data);
      } else {
        await addExperience(data);
      }
      onOpenChange(false);
    } catch (err) {
      console.error('Failed to save experience:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading">{experience ? 'Edit' : 'Add'} Experience</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="bg-secondary border-border" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} required className="bg-secondary border-border" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} required className="bg-secondary border-border" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="periodStart">Start Period</Label>
              <Input id="periodStart" value={periodStart} onChange={(e) => setPeriodStart(e.target.value)} placeholder="e.g. Dec 2021" required className="bg-secondary border-border" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="periodEnd">End Period</Label>
              <Input id="periodEnd" value={periodEnd} onChange={(e) => setPeriodEnd(e.target.value)} placeholder="Leave empty for present" className="bg-secondary border-border" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required rows={3} className="bg-secondary border-border" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="achievements">Achievements (one per line)</Label>
            <Textarea id="achievements" value={achievements} onChange={(e) => setAchievements(e.target.value)} rows={3} className="bg-secondary border-border" />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Saving...' : experience ? 'Update' : 'Add'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
