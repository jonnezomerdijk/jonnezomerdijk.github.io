import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectCard } from './ProjectCard';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { AdminControls } from '@/components/admin/AdminControls';
import { ProjectForm } from '@/components/admin/ProjectForm';
import { DeleteConfirmDialog } from '@/components/admin/DeleteConfirmDialog';
import type { Project } from '@/types';

export function PortfolioSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentProjectIndex, setCurrentProjectIndex] = useState<number | null>(null);
  const { isAdmin } = useAuth();
  const { projects, deleteProject, updateProject } = useData();

  // Admin state
  const [projectFormOpen, setProjectFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);

  const moveProject = async (projectIndex: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? projectIndex - 1 : projectIndex + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;
    const current = projects[projectIndex];
    const adjacent = projects[targetIndex];
    await Promise.all([
      updateProject(current.id, { order: adjacent.order }),
      updateProject(adjacent.id, { order: current.order }),
    ]);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const openProject = (index: number) => {
    setCurrentProjectIndex(index);
  };

  const closeProject = () => {
    setCurrentProjectIndex(null);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (currentProjectIndex !== null) {
      if (event.key === 'ArrowRight') {
        setCurrentProjectIndex((prevIndex) => (prevIndex !== null ? (prevIndex + 1) % projects.length : 0));
      } else if (event.key === 'ArrowLeft') {
        setCurrentProjectIndex((prevIndex) => (prevIndex !== null ? (prevIndex - 1 + projects.length) % projects.length : projects.length - 1));
      }
    }
  };

  useEffect(() => {
    if (currentProjectIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [currentProjectIndex, projects.length]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteProject(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold font-heading">Portfolio</h2>
            {isAdmin && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => { setEditingProject(undefined); setProjectFormOpen(true); }}
                className="h-8 w-8 border-primary/30 text-primary hover:bg-primary/10"
              >
                <Plus className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => scroll('left')} className="border-border hover:border-primary/50 hover:text-primary">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => scroll('right')} className="border-border hover:border-primary/50 hover:text-primary">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto hide-scrollbar pb-4"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.4 }}
              className="relative group"
            >
              {isAdmin && (
                <AdminControls
                  onEdit={() => { setEditingProject(project); setProjectFormOpen(true); }}
                  onDelete={() => setDeleteTarget({ id: project.id, name: project.title })}
                  onMoveLeft={index > 0 ? () => void moveProject(index, 'left') : undefined}
                  onMoveRight={index < projects.length - 1 ? () => void moveProject(index, 'right') : undefined}
                />
              )}
              <ProjectCard
                {...project}
                onClick={() => openProject(index)}
                isOpen={currentProjectIndex === index}
                onClose={closeProject}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectForm key={editingProject?.id ?? 'new-project'} open={projectFormOpen} onOpenChange={setProjectFormOpen} project={editingProject} />
      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}
        itemName={deleteTarget?.name ?? ''}
        onConfirm={handleDelete}
      />
    </section>
  );
}
