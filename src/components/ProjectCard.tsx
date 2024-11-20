import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ProjectCardProps {
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  technologies: string[];
}

export function ProjectCard({ title, description, fullDescription, image, technologies }: ProjectCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="p-6 bg-black/50 border-white/10 hover:bg-white/5 transition-colors cursor-pointer min-w-[300px] md:min-w-[400px]">
          <h3 className="text-xl font-semibold mb-4">{title}</h3>
          <img
            src={image}
            alt={title}
            className="w-full rounded-lg mb-4 aspect-video object-cover"
          />
          <p className="text-gray-300 line-clamp-2">{description}</p>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            <img
              src={image}
              alt={title}
              className="w-full rounded-lg my-4 aspect-video object-cover"
            />
            <div className="space-y-4">
              <p className="text-gray-300">{fullDescription}</p>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-white/10 rounded-full text-sm text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}