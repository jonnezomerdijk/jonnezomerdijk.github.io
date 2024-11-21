import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectCard } from './ProjectCard';

const projects = [
  {
    title: 'Search Functions - Elastic Search',
    description: 'Improved search functions using Elastic Search, combining multiple metrics for better results.',
    fullDescription: `When I first started at Stuvia, one of my largest projects was to improve the search functions that were set up years before. They were based on basic statistics, and set up using functions from Elastic Search. This way our search function was very fast, but it was not the most accurate. It was heavily preferring documents that were downloaded often enough, not taking into account the recency of the document. On top of that, there seemed to be several tricks for sellers that would make sure their document would end up on top of the search every time. This was because previously used functions were broken, and the search function was not updated for years.
I was tasked to fix this, and make sure the search function was up to date and accurate. I had to make complicated combinations of functions using different types of splines, whilst trying to keep it as simple as possible. In the end, the search function is an interesting combination of text match, recency, popularity and quality of the document.`,
    image: 'https://res.cloudinary.com/jonne/image/upload/v1730905090/Searchscorefunction.png',
    technologies: ['Elastic Search', 'Python', 'Data Analysis']
  },
  {
    title: 'AWS Glue → Redshift',
    description: 'Implemented data warehouse migration using AWS services for improved performance.',
    fullDescription: `After having done my analysis using MySQL, mainly in Python Notebooks, my boss and I decided it was time to update our Data Architecture to a faster and more versatile one. We decided to use AWS Glue and AWS Redshift for this, as we were already using AWS for our servers and storage.
In addition, Redshift seemed to be a great data warehousing framework to use, because it was very fast and could handle a lot of data, making it much better for doing analyses. My task was to make sure our data was ready to be sent to AWS Glue, and to write each Glue Job using PySpark. This was a huge project, as I had to find the right combinations of tables to be sent to AWS Glue, and I had to make sure the data was sent to AWS Redshift in the right way.`,
    image: 'https://res.cloudinary.com/jonne/image/upload/v1730907159/Screenshot_2024-11-06_at_16.32.31.png',
    technologies: ['AWS Glue', 'AWS Redshift', 'PySpark', 'ETL']
  },
  {
    title: 'Payment Transaction Administration',
    description: 'Streamlined financial backend and resolved payment processing issues.',
    fullDescription: `Stuvia is an international marketplace for both sellers and buyers. As a result, the company has a very complicated financial backend. It also has to deal with many different payment providers and auditors, which is why it is very important to streamline the financial administration process.
My colleague back-end developer stringed together a bunch of APIs from our payment providers to create a collection of balancing data for a new table in our database. This table could then be used for us to audit and check if all payments were processed correctly. There were still several problems however, that were my task to fix.
Many of the payments did not match between our administration and the balancing from the payment providers. Transactions were missing, or were not processed correctly resulting in a mismatch in amounts or banking country. My task was to identify these mismatches and researched their origins, which was a huge project because there were many different types of issues here.`,
    image: 'https://res.cloudinary.com/jonne/image/upload/v1730905948/exchangerateProblem.jpg',
    technologies: ['SQL', 'Python', 'Financial Analysis', 'API Integration']
  }
];

export function PortfolioSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentProjectIndex, setCurrentProjectIndex] = useState<number | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const openProject = (index: number) => {
    setCurrentProjectIndex(index);
  };

  const closeProject = () => {
    setCurrentProjectIndex(null);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (currentProjectIndex !== null) {
      if (event.key === 'ArrowRight') {
        setCurrentProjectIndex((prevIndex) => (prevIndex !== null ? (prevIndex + 1) % projects.length : 0));
      } else if (event.key === 'ArrowLeft') {
        setCurrentProjectIndex((prevIndex) => (prevIndex !== null ? (prevIndex - 1 + projects.length) % projects.length : projects.length - 1));
      }
    }
  };

  useEffect(() => {
    if (currentProjectIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [currentProjectIndex]);

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Portfolio</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => scroll('left')}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => scroll('right')}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto hide-scrollbar pb-4"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              {...project}
              onClick={() => openProject(index)}
              isOpen={currentProjectIndex === index}
              onClose={closeProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
}