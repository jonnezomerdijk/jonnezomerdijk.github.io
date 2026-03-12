import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ProjectCardProps {
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  technologies: string[];
  onClick: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectCard({
  title,
  description,
  fullDescription,
  image,
  technologies,
  onClick,
  isOpen,
  onClose,
}: ProjectCardProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <Card
        className="overflow-hidden cursor-pointer min-w-[320px] md:min-w-[380px] border-border hover:border-primary/40 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group"
        onClick={onClick}
      >
        {/* Full-bleed image with gradient overlay */}
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Gradient fades image into card background */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
          {/* Title sits on the gradient */}
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-3 pt-8">
            <h3 className="text-lg font-semibold font-heading text-foreground group-hover:text-primary transition-colors leading-tight">
              {title}
            </h3>
          </div>
        </div>

        {/* Description + tech pills */}
        <div className="px-5 pb-5 pt-3 space-y-3">
          <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">{description}</p>
          <div className="flex flex-wrap gap-1.5">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 bg-primary/10 rounded-full text-xs text-primary font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Card>

      {/* Detail dialog */}
      <DialogContent className="max-w-2xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-heading text-foreground text-xl">{title}</DialogTitle>
        </DialogHeader>
        <img
          src={image}
          alt={title}
          className="w-full rounded-lg aspect-video object-cover"
        />
        <div className="space-y-4">
          <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{fullDescription}</p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-primary/10 rounded-full text-sm text-primary font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
