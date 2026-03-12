import React from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { ExperienceSection } from '@/components/ExperienceSection';
import { PortfolioSection } from '@/components/PortfolioSection';
import { PersonalSection } from '@/components/PersonalSection';
import { ContactSection } from '@/components/ContactSection';
import { AdminLoginButton } from '@/components/admin/AdminLoginButton';
import { Toaster } from '@/components/ui/sonner';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const START_DATE = new Date(2020, 8); // September 2020 (month is 0-indexed)
const yearsOfExperience = Math.floor(
  (Date.now() - START_DATE.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
);

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function App() {
  const [activeSection, setActiveSection] = React.useState('home');

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation activeSection={activeSection} onSectionChange={scrollToSection} adminButton={<AdminLoginButton />} />

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
                Jonne Zomerdijk
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Data Expert with {yearsOfExperience}+ years of experience in Data Analysis, Engineering, and Visualization to drive business performance
              </p>
              <div className="flex gap-4">
                <Button
                  onClick={() => scrollToSection('experience')}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  View Experience
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" asChild className="border-border hover:border-primary/50 hover:text-primary">
                  <a href="/assets/Zomerdijk_J.CV_(EN-2024).pdf" target="_blank">Download CV</a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/10 rounded-2xl blur-2xl" />
              <img
                src="https://res.cloudinary.com/jonne/image/upload/v1519083282/Jonne.jpg"
                alt="Jonne Zomerdijk"
                className="rounded-lg shadow-xl w-full max-w-md mx-auto main-image relative"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
        <ExperienceSection />
      </motion.div>

      <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
        <PortfolioSection />
      </motion.div>

      <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
        <PersonalSection />
      </motion.div>

      <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
        <ContactSection />
      </motion.div>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-sm">
            Website self-made and designed • Contact me through{' '}
            <a
              href="mailto:jonnezomerdijk@hotmail.com"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              email
            </a>{' '}
            for more information
          </p>
        </div>
      </footer>
      <Toaster />
    </div>
  );
}

export default App;
