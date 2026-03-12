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
import type { Education } from '@/types';

interface EducationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  education?: Education;
}

export function EducationForm({ open, onOpenChange, education }: EducationFormProps) {
  const { addEducation, updateEducation } = useData();
  const [loading, setLoading] = useState(false);

  const [degree, setDegree] = useState(education?.degree ?? '');
  const [institution, setInstitution] = useState(education?.institution ?? '');
  const [location, setLocation] = useState(education?.location ?? '');
  const [periodStart, setPeriodStart] = useState(education?.periodStart ?? '');
  const [periodEnd, setPeriodEnd] = useState(education?.periodEnd ?? '');
  const [description, setDescription] = useState(education?.description ?? '');
  const [achievements, setAchievements] = useState(education?.achievements.join('\n') ?? '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      degree,
      institution,
      location,
      periodStart,
      periodEnd,
      description,
      achievements: achievements.split('\n').filter(Boolean),
      order: education?.order ?? 0,
    };

    try {
      if (education) {
        await updateEducation(education.id, data);
      } else {
        await addEducation(data);
      }
      onOpenChange(false);
    } catch (err) {
      console.error('Failed to save education:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading">{education ? 'Edit' : 'Add'} Education</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="degree">Degree</Label>
            <Input id="degree" value={degree} onChange={(e) => setDegree(e.target.value)} required className="bg-secondary border-border" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="institution">Institution</Label>
              <Input id="institution" value={institution} onChange={(e) => setInstitution(e.target.value)} required className="bg-secondary border-border" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} required className="bg-secondary border-border" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="periodStart">Start Period</Label>
              <Input id="periodStart" value={periodStart} onChange={(e) => setPeriodStart(e.target.value)} placeholder="e.g. Sep 2019" required className="bg-secondary border-border" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="periodEnd">End Period</Label>
              <Input id="periodEnd" value={periodEnd} onChange={(e) => setPeriodEnd(e.target.value)} placeholder="e.g. Sep 2021" required className="bg-secondary border-border" />
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
            {loading ? 'Saving...' : education ? 'Update' : 'Add'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
