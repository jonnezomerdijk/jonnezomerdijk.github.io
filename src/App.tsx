import React from 'react';
import { Navigation } from '@/components/Navigation';
import { ExperienceSection } from '@/components/ExperienceSection';
import { PortfolioSection } from '@/components/PortfolioSection';
import { PersonalSection } from '@/components/PersonalSection';
import { ContactSection } from '@/components/ContactSection';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

function App() {
  console.log('App is rendering');  // Check if this is logged
  const [activeSection, setActiveSection] = React.useState('home');

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation activeSection={activeSection} onSectionChange={scrollToSection} />

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-6">Jonne Zomerdijk</h1>
              <p className="text-lg text-gray-300 mb-8">
                Data Scientist with 4+ years of expertise in Advanced Data Analysis, Engineering, and Visualization to drive business performance
              </p>
              <div className="flex gap-4">
                <Button onClick={() => scrollToSection('experience')}>
                  View Experience
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" asChild>
                  <a href="./assets/Zomerdijk_J.CV_(EN-2024).pdf" target="_blank">Download CV</a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://res.cloudinary.com/jonne/image/upload/v1519083282/Jonne.jpg"
                alt="Jonne Zomerdijk"
                className="rounded-lg shadow-xl w-full max-w-md mx-auto main-image"
              />
            </div>
          </div>
        </div>
      </section>

      <ExperienceSection />
      <PortfolioSection />
      <PersonalSection />
      <ContactSection />

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p className="text-sm">
            Website self-made and designed • Contact me through{' '}
            <a
              href="mailto:jonnezomerdijk@hotmail.com"
              className="text-white hover:text-white/80"
            >
              email
            </a>{' '}
            for more information
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;