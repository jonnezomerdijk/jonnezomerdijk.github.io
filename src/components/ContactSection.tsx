import { Github, Linkedin, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function ContactSection() {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 font-heading">Contact</h2>
        <Card className="p-8 bg-card border-border">
          <p className="text-muted-foreground mb-6">Feel free to reach out with any questions!</p>

          <div className="space-y-3 text-sm">
            <div className="flex">
              <p className="text-muted-foreground w-28">Name:</p>
              <p className="text-foreground">Jonne Zomerdijk</p>
            </div>
            <div className="flex">
              <p className="text-muted-foreground w-28">Location:</p>
              <p className="text-foreground">Barcelona, Spain</p>
            </div>
            <div className="flex">
              <p className="text-muted-foreground w-28">E-mail:</p>
              <p>
                <a href="mailto:jonnezomerdijk@hotmail.com" className="text-primary hover:text-primary/80 transition-colors">
                  jonnezomerdijk@hotmail.com
                </a>
              </p>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
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
        </Card>
      </div>
    </section>
  );
}
