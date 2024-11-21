import { Github, Linkedin, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ContactSection() {
  return (
    <section id="contact" className="text-white">
      {/* Gray background section with no padding on top */}
      <section className="w-full bg-gray-800">
        <div className="container mx-auto px-4 py-4"> {/* Reduced top padding */}
          <h2 className="text-2xl font-bold mb-4">Contact</h2> {/* Reduced font size */}
          <p className="text-sm">Feel free to reach out with any questions!</p> {/* Reduced font size */}
        </div>
      </section>

      {/* Personal Details with Full Width Black Background */}
      <div className="mt-4 bg-black p-6 rounded-lg w-full"> {/* Reduced top margin */}
        <div className="space-y-1 text-sm"> {/* Reduced space between items */}
          <div className="flex">
            <p className="text-gray-600 w-28">Name:</p>
            <p className="ml-2 text-gray-400">Jonne Zomerdijk</p> {/* Reduced margin */}
          </div>
          <div className="flex">
            <p className="text-gray-600 w-28">Location:</p>
            <p className="ml-2 text-gray-400">Barcelona, Spain</p> {/* Reduced margin */}
          </div>
          <div className="flex">
            <p className="text-gray-600 w-28">E-mail:</p>
            <p className="ml-2 text-gray-400">
              <a href="mailto:jonnezomerdijk@hotmail.com" className="text-gray-400 hover:text-blue-200">
                jonnezomerdijk@hotmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex gap-4 mt-4"> {/* Reduced top margin */}
          <a href="https://github.com/Jonnezom" target="_blank" rel="noreferrer">
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-400">
              <Github className="h-5 w-5" />
            </Button>
          </a>
          <a href="https://www.linkedin.com/in/jonne-zomerdijk-36b49285/" target="_blank" rel="noreferrer">
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-400">
              <Linkedin className="h-5 w-5" />
            </Button>
          </a>
          <a href="https://instagram.com/djonkobonko" target="_blank" rel="noreferrer">
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-400">
              <Instagram className="h-5 w-5" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
