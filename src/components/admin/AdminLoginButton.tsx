import { useState } from 'react';
import { Lock, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LoginDialog } from './LoginDialog';

export function AdminLoginButton() {
  const { isAdmin, logout } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);

  if (isAdmin) {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={logout}
        className="text-primary/60 hover:text-primary transition-colors"
        title="Logout"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setLoginOpen(true)}
        className="text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors"
        title="Admin Login"
      >
        <Lock className="h-4 w-4" />
      </Button>
      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
}
