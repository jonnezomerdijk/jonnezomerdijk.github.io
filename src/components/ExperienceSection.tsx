import { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const experiences = [
  {
    title: 'Data Analyst',
    company: 'Stuvia',
    location: 'Amsterdam, NL',
    period: 'Since Dec 2021',
    description: 'Responsible for analysis in marketing, finance, and user experience. Tracking user behavior to optimize website functionalities.',
    achievements: [
      'Reconstructed search function formulas and weights',
      'Set up AWS Redshift data warehouse using AWS Glue'
    ]
  },
  {
    title: 'Intern Data Science',
    company: 'DPG Media',
    location: 'Amsterdam, NL',
    period: 'May 2021 - Sep 2021',
    description: 'Part of the News Analytics Team at the biggest media company in Benelux.',
    achievements: [
      'Analyzed article success through contextual variables',
      'Implemented visualization using Looker'
    ]
  },
  {
    title: 'Intern Data Analysis',
    company: 'Prowise Learn',
    location: 'Amsterdam, NL',
    period: 'Feb 2020 - Jul 2020',
    description: `Prowise Learn, formerly called "Oefenweb", is a software company with an application that contains adaptive online exercises for primary and secondary education.`,
    achievements: [
      'Worked on an adaptive scoring system by psychometrically analyzing and evaluating scoring values',
      'Enhanced skills in psychometric evaluation and analysis'
    ]
  }
];

const education = [
  {
    degree: 'MSc Behavioural Data Science',
    institution: 'University of Amsterdam',
    location: 'Amsterdam, NL',
    period: '2019 - 2021',
    description: "This master's combines techniques from Psychology with approaches from computer science, teaching the use of big data to better understand and predict human behaviour.",
    achievements: [
      'Thesis: "Assessing the Role of Goal Types in Pedestrian Behaviour: a Simulation Study"',
      'Graduated cum laude with a 9/10 thesis grade'
    ]
  },
  {
    degree: 'BSc Psychology',
    institution: 'Vrije Universiteit Amsterdam',
    location: 'Amsterdam, NL',
    period: '2012 - 2016',
    description: 'Focused on Cognitive Psychology, gaining experience in quantitative analysis with SPSS.',
    achievements: [
      'Thesis: "Temporal Order in the Visual Working Memory"',
      'Created experiments using Python-based OpenSesame software'
    ]
  }
];

const skills = [
  { category: 'Programming', items: ['Python', 'R', 'MySQL', 'Redshift SQL', 'CSS'] },
  { category: 'Data Analysis', items: ['Pandas', 'NumPy', 'Scikit-learn', 'HuggingFace', 'TensorFlow'] },
  { category: 'Engineering Tools', items: ['AWS Glue', 'Amazon Redshift', 'AWS Lambda', 'PySpark'] },
  { category: 'Visualization', items: ['Plotly', 'Looker', 'Matplotlib', 'Seaborn'] },
  { category: 'Other Tools', items: ['Amplitude', 'SPSS', 'GitHub', 'Jupyter Notebooks'] },
];

export function ExperienceSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <section id="experience" className="py-20 bg-white/5">
      <div className="container mx-auto px-4">
        <div className="space-y-12">

          <div>
            <h2 className="text-3xl font-bold mb-8">Experience</h2>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <Card key={exp.title} className="p-6 bg-black/50 border-white/10">
                  <div className="flex justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{exp.title}</h3>
                      <p className="text-gray-400">{exp.company} • {exp.location}</p>
                    </div>
                    <span className="text-gray-400">{exp.period}</span>
                  </div>
                  <p className="text-gray-300">{exp.description}</p>
                  <ul className="mt-4 space-y-2">
                    {exp.achievements.map((achievement, index) => (
                      <li key={index} className="text-gray-300">• {achievement}</li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-8">Education</h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <Card key={edu.degree} className="p-6 bg-black/50 border-white/10">
                  <div className="flex justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{edu.degree}</h3>
                      <p className="text-gray-400">{edu.institution} • {edu.location}</p>
                    </div>
                    <span className="text-gray-400">{edu.period}</span>
                  </div>
                  <p className="text-gray-300">{edu.description}</p>
                  <ul className="mt-4 space-y-2">
                    {edu.achievements.map((achievement, index) => (
                      <li key={index} className="text-gray-300">• {achievement}</li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Skills</h2>
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
              className="overflow-x-auto hide-scrollbar"
            >
              <div className="flex gap-6 pb-4" style={{ minWidth: 'min-content' }}>
                {skills.map((skillGroup) => (
                  <Card key={skillGroup.category} className="p-6 bg-black/50 border-white/10" style={{ minWidth: '300px' }}>
                    <h3 className="text-xl font-semibold mb-4">{skillGroup.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-white/10 rounded-full text-gray-300 hover:bg-white/20 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}