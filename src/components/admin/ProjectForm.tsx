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
import type { Project } from '@/types';

interface ProjectFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project?: Project;
}

export function ProjectForm({ open, onOpenChange, project }: ProjectFormProps) {
  const { addProject, updateProject } = useData();
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(project?.title ?? '');
  const [description, setDescription] = useState(project?.description ?? '');
  const [fullDescription, setFullDescription] = useState(project?.fullDescription ?? '');
  const [image, setImage] = useState(project?.image ?? '');
  const [technologies, setTechnologies] = useState(project?.technologies.join(', ') ?? '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      title,
      description,
      fullDescription,
      image,
      technologies: technologies.split(',').map((t) => t.trim()).filter(Boolean),
      order: project?.order ?? 0,
    };

    try {
      if (project) {
        await updateProject(project.id, data);
      } else {
        await addProject(data);
      }
      onOpenChange(false);
    } catch (err) {
      console.error('Failed to save project:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading">{project ? 'Edit' : 'Add'} Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="bg-secondary border-border" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Short Description</Label>
            <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} required className="bg-secondary border-border" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fullDescription">Full Description</Label>
            <Textarea
              id="fullDescription"
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              rows={6}
              className="bg-secondary border-border resize-none"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input id="image" value={image} onChange={(e) => setImage(e.target.value)} className="bg-secondary border-border" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="technologies">Technologies (comma-separated)</Label>
            <Input id="technologies" value={technologies} onChange={(e) => setTechnologies(e.target.value)} className="bg-secondary border-border" placeholder="Python, SQL, AWS" />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Saving...' : project ? 'Update' : 'Add'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
