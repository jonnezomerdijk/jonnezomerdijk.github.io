import { Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface AdminControlsProps {
  onEdit: () => void;
  onDelete: () => void;
  onMoveLeft?: () => void;
  onMoveRight?: () => void;
}

export function AdminControls({ onEdit, onDelete, onMoveLeft, onMoveRight }: AdminControlsProps) {
  const { isAdmin } = useAuth();

  if (!isAdmin) return null;

  return (
    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
      {onMoveLeft && (
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => { e.stopPropagation(); onMoveLeft(); }}
          className="h-7 w-7 bg-secondary/80 hover:bg-primary/20 hover:text-primary"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </Button>
      )}
      {onMoveRight && (
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => { e.stopPropagation(); onMoveRight(); }}
          className="h-7 w-7 bg-secondary/80 hover:bg-primary/20 hover:text-primary"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>
      )}
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => { e.stopPropagation(); onEdit(); }}
        className="h-7 w-7 bg-secondary/80 hover:bg-primary/20 hover:text-primary"
      >
        <Pencil className="h-3.5 w-3.5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => { e.stopPropagation(); onDelete(); }}
        className="h-7 w-7 bg-secondary/80 hover:bg-destructive/20 hover:text-destructive"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
