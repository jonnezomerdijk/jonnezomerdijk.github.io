// @ts-ignore
import { useState } from 'react';
import { Card } from '@/components/ui/card';
// @ts-ignore
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function PersonalSection() {
  return (
    <section id="personal" className="py-20 bg-white/5">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12">Personal</h2>
        <Tabs defaultValue="languages" className="w-full">
          <TabsList className="w-full justify-start mb-8">
            <TabsTrigger value="languages">Languages</TabsTrigger>
            <TabsTrigger value="travel">Travel</TabsTrigger>
          </TabsList>
          <TabsContent value="languages">
            <Card className="p-6 bg-black/50 border-white/10">
              <p className="text-gray-300 mb-6">
                During my Erasmus exchange in Budapest, I developed a strong interest in languages, particularly Spanish. 
                Starting with Duolingo and progressing through university courses, I achieved proficiency through practical 
                experience in Madrid and South America. Later, while working in tourism, I picked up Italian and spent a 
                month in Florence improving my skills.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  { name: 'Dutch', level: 5, note: 'Native' },
                  { name: 'English', level: 5, note: 'Fluent' },
                  { name: 'Spanish', level: 4, note: 'Advanced' },
                  { name: 'Italian', level: 3, note: 'Intermediate' },
                  { name: 'German', level: 2, note: 'Basic' }
                ].map((lang) => (
                  <div key={lang.name} className="flex items-center justify-between">
                    <div>
                      <span className="text-white font-medium">{lang.name}</span>
                      <span className="text-gray-400 text-sm ml-2">({lang.note})</span>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={`text-lg ${i < lang.level ? 'text-yellow-400' : 'text-gray-600'}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="travel">
            <Card className="p-6 bg-black/50 border-white/10">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <img
                    src="http://res.cloudinary.com/jonne/image/upload/v1519130561/MUKC6488.jpg"
                    alt="Travel"
                    className="rounded-lg mb-4"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">International Experience</h3>
                  <p className="text-gray-300">
                    My journey began with an Erasmus exchange in Budapest, Hungary, which sparked my 
                    interest in international experiences. I've since traveled extensively through 
                    South America, worked in tourism, and lived in Barcelona, each experience 
                    enriching my cultural understanding and language skills.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}