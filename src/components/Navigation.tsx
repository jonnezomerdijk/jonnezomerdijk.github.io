// @ts-ignore
import React from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Instagram } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const sections = ['home', 'experience', 'portfolio', 'personal', 'contact'];

  // Smooth scroll function to scroll to the contact section
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50 border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-6 overflow-x-auto hide-scrollbar">
            {sections.map((section) => (
              section === 'contact' ? (
                <Button
                  key={section}
                  variant="ghost"
                  className="text-white hover:text-white/80 capitalize whitespace-nowrap"
                  onClick={scrollToContact}  // Change to use the scroll function
                >
                  {section}
                </Button>
              ) : (
                <Button
                  key={section}
                  variant="ghost"
                  className={`text-white hover:text-white/80 capitalize whitespace-nowrap ${
                    activeSection === section ? 'bg-white/10' : ''
                  }`}
                  onClick={() => onSectionChange(section)}
                >
                  {section}
                </Button>
              )
            ))}
          </div>
          <div className="flex gap-4">
            <a href="https://github.com/Jonnezom" target="_blank" rel="noreferrer">
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/jonne-zomerdijk-36b49285/" target="_blank" rel="noreferrer">
              <Button variant="ghost" size="icon">
                <Linkedin className="h-5 w-5" />
              </Button>
            </a>
            <a href="https://instagram.com/djonkobonko" target="_blank" rel="noreferrer">
              <Button variant="ghost" size="icon">
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
