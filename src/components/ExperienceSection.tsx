import { useRef, useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { AdminControls } from '@/components/admin/AdminControls';
import { ExperienceForm } from '@/components/admin/ExperienceForm';
import { EducationForm } from '@/components/admin/EducationForm';
import { SkillForm } from '@/components/admin/SkillForm';
import { DeleteConfirmDialog } from '@/components/admin/DeleteConfirmDialog';
import type { Experience, Education, Skill } from '@/types';

function SkillBar({ name, proficiency }: { name: string; proficiency: number }) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-foreground font-medium">{name}</span>
        <span className="text-muted-foreground">{proficiency}%</span>
      </div>
      <Progress value={inView ? proficiency : 0} className="h-2 bg-secondary" />
    </div>
  );
}

export function ExperienceSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { isAdmin } = useAuth();
  const { experiences, education, skills, deleteExperience, deleteEducation, deleteSkill, updateSkill } = useData();

  // Admin state
  const [expFormOpen, setExpFormOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | undefined>();
  const [eduFormOpen, setEduFormOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState<Education | undefined>();
  const [skillFormOpen, setSkillFormOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | undefined>();
  const [defaultSkillCategory, setDefaultSkillCategory] = useState<string | undefined>();
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'experience' | 'education' | 'skill'; id: string; name: string } | null>(null);

  // Group skills by category
  const skillGroups = useMemo(() => {
    const groups: Record<string, { name: string; proficiency: number; id: string }[]> = {};
    for (const skill of skills) {
      if (!groups[skill.category]) groups[skill.category] = [];
      groups[skill.category].push({ name: skill.name, proficiency: skill.proficiency, id: skill.id });
    }
    return Object.entries(groups).map(([category, items]) => ({ category, items }));
  }, [skills]);

  const moveSkillCategory = async (categoryIndex: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? categoryIndex - 1 : categoryIndex + 1;
    if (targetIndex < 0 || targetIndex >= skillGroups.length) return;
    const newGroups = [...skillGroups];
    [newGroups[categoryIndex], newGroups[targetIndex]] = [newGroups[targetIndex], newGroups[categoryIndex]];
    await Promise.all(
      newGroups.flatMap((group, catIdx) =>
        group.items.map((skill, skillIdx) =>
          updateSkill(skill.id, { order: catIdx * 100 + skillIdx })
        )
      )
    );
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === 'experience') await deleteExperience(deleteTarget.id);
    else if (deleteTarget.type === 'education') await deleteEducation(deleteTarget.id);
    else if (deleteTarget.type === 'skill') await deleteSkill(deleteTarget.id);
    setDeleteTarget(null);
  };

  const formatPeriod = (start: string, end: string | null) => {
    return end ? `${start} - ${end}` : `${start} - present`;
  };

  return (
    <section id="experience" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="space-y-12">

          {/* Experience */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-bold font-heading">Experience</h2>
              {isAdmin && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => { setEditingExp(undefined); setExpFormOpen(true); }}
                  className="h-8 w-8 border-primary/30 text-primary hover:bg-primary/10"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <Card className="p-6 bg-card border-border border-l-2 border-l-primary hover:border-primary/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 relative group">
                    <AdminControls
                      onEdit={() => { setEditingExp(exp); setExpFormOpen(true); }}
                      onDelete={() => setDeleteTarget({ type: 'experience', id: exp.id, name: exp.title })}
                    />
                    <div className="flex justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{exp.title}</h3>
                        <p className="text-muted-foreground">{exp.company} • {exp.location}</p>
                      </div>
                      <span className="text-muted-foreground text-sm whitespace-nowrap ml-4">
                        {formatPeriod(exp.periodStart, exp.periodEnd)}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{exp.description}</p>
                    <ul className="mt-4 space-y-2">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index} className="text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-bold font-heading">Education</h2>
              {isAdmin && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => { setEditingEdu(undefined); setEduFormOpen(true); }}
                  className="h-8 w-8 border-accent/30 text-accent hover:bg-accent/10"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="space-y-6">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <Card className="p-6 bg-card border-border border-l-2 border-l-accent hover:border-accent/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 relative group">
                    <AdminControls
                      onEdit={() => { setEditingEdu(edu); setEduFormOpen(true); }}
                      onDelete={() => setDeleteTarget({ type: 'education', id: edu.id, name: edu.degree })}
                    />
                    <div className="flex justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{edu.degree}</h3>
                        <p className="text-muted-foreground">{edu.institution} • {edu.location}</p>
                      </div>
                      <span className="text-muted-foreground text-sm whitespace-nowrap ml-4">
                        {formatPeriod(edu.periodStart, edu.periodEnd)}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{edu.description}</p>
                    <ul className="mt-4 space-y-2">
                      {edu.achievements.map((achievement, index) => (
                        <li key={index} className="text-muted-foreground flex items-start gap-2">
                          <span className="text-accent mt-1">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-bold font-heading">Skills</h2>
                {isAdmin && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => { setEditingSkill(undefined); setDefaultSkillCategory(undefined); setSkillFormOpen(true); }}
                    className="h-8 w-8 border-primary/30 text-primary hover:bg-primary/10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => scroll('left')} className="border-border hover:border-primary/50 hover:text-primary">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => scroll('right')} className="border-border hover:border-primary/50 hover:text-primary">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div
              ref={scrollContainerRef}
              className="overflow-x-auto hide-scrollbar"
            >
              <div className="flex gap-6 pb-4" style={{ minWidth: 'min-content' }}>
                {skillGroups.map((skillGroup, catIdx) => (
                  <Card key={skillGroup.category} className="p-6 bg-card border-border hover:border-primary/20 transition-colors" style={{ minWidth: '320px' }}>
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-lg font-semibold text-primary font-heading">{skillGroup.category}</h3>
                      {isAdmin && (
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => void moveSkillCategory(catIdx, 'left')}
                            disabled={catIdx === 0}
                            className="h-6 w-6 text-muted-foreground hover:text-primary hover:bg-primary/10 disabled:opacity-30"
                          >
                            <ChevronLeft className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => void moveSkillCategory(catIdx, 'right')}
                            disabled={catIdx === skillGroups.length - 1}
                            className="h-6 w-6 text-muted-foreground hover:text-primary hover:bg-primary/10 disabled:opacity-30"
                          >
                            <ChevronRight className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditingSkill(undefined);
                              setDefaultSkillCategory(skillGroup.category);
                              setSkillFormOpen(true);
                            }}
                            className="h-6 w-6 text-primary hover:bg-primary/10"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                    <div className="space-y-4">
                      {skillGroup.items.map((skill) => (
                        <div key={skill.id} className="relative group">
                          {isAdmin && (
                            <AdminControls
                              onEdit={() => {
                                const fullSkill = skills.find(s => s.id === skill.id);
                                setEditingSkill(fullSkill);
                                setDefaultSkillCategory(undefined);
                                setSkillFormOpen(true);
                              }}
                              onDelete={() => setDeleteTarget({ type: 'skill', id: skill.id, name: skill.name })}
                            />
                          )}
                          <SkillBar name={skill.name} proficiency={skill.proficiency} />
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Admin Dialogs — key forces remount with fresh state when switching items */}
      <ExperienceForm key={editingExp?.id ?? 'new-exp'} open={expFormOpen} onOpenChange={setExpFormOpen} experience={editingExp} />
      <EducationForm key={editingEdu?.id ?? 'new-edu'} open={eduFormOpen} onOpenChange={setEduFormOpen} education={editingEdu} />
      <SkillForm key={editingSkill?.id ?? `new-skill-${defaultSkillCategory ?? ''}`} open={skillFormOpen} onOpenChange={setSkillFormOpen} skill={editingSkill} defaultCategory={defaultSkillCategory} />
      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}
        itemName={deleteTarget?.name ?? ''}
        onConfirm={handleDelete}
      />
    </section>
  );
}
