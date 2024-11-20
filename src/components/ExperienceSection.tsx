import { Card } from '@/components/ui/card';

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

export function ExperienceSection() {
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
        </div>
      </div>
    </section>
  );
}