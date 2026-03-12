import React from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Instagram } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  adminButton?: React.ReactNode;
}

export function Navigation({ activeSection, onSectionChange, adminButton }: NavigationProps) {
  const sections = ['home', 'experience', 'portfolio', 'personal', 'contact'];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-background/90 backdrop-blur-md z-50 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {sections.map((section) => (
              <Button
                key={section}
                variant="ghost"
                className={`capitalize whitespace-nowrap transition-colors ${
                  activeSection === section
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:text-primary hover:bg-primary/5'
                }`}
                onClick={section === 'contact' ? scrollToContact : () => onSectionChange(section)}
              >
                {section}
              </Button>
            ))}
          </div>
          <div className="flex gap-2 items-center">
            {adminButton}
            <a href="https://github.com/Jonnezom" target="_blank" rel="noreferrer">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/jonne-zomerdijk-36b49285/" target="_blank" rel="noreferrer">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Button>
            </a>
            <a href="https://instagram.com/djonkobonko" target="_blank" rel="noreferrer">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
