// import { useState } from 'react';
import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
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
                From February to July 2015 I went on an Erasmus exchange in Budapest, Hungary. At the time, I started to develop an in interest in the Spanish language.
                Starting with a simple course in Duolingo, my interest started to dwell and before I knew it I was looking up every word that came into my mind. I decided to take a university course in Spanish and finished Spanish 1 and 2 with good grades, and also went to Madrid for a week to visit some friends and practice even more!
                Then I started working in several touristic companies, which helped me a lot with my language practice, for about a year in total to save up to travel around South America. My Spanish level has peaked since I did embark on that trip of which you can read more in the Travel-sector of this page. After not having practiced much for several years, I moved to Barcelona in August 2022 putting me in a great spot to practice once again.
                <br></br>
                During that same Erasmus, I had many Italian friends. That's why when I started to work in tourism I already knew quite some Italian words. In September 2021, I decided to take it a step further by spending a month in Florence, and doing a full course of A1 and A2 Italian. I have been practicing every once in a while since then.
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
                    src="https://res.cloudinary.com/jonne/image/upload/v1519130561/MUKC6488.jpg"
                    alt="Travel"
                    className="rounded-lg mb-4"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">International Experience</h3>
                  <p className="text-gray-300">
                    When I was young I was lucky enough to have parents that brought me to many beautiful places around the world. Together with my mother, my father, and my sister, I traveled to several destinations rich of culture and usually sunny weather.
                    Although that's still my favorite type of destination, I have developed a more wide interest in traveling in my adolescent years. 
                    My personal journey began with an Erasmus exchange in Budapest, Hungary, which sparked my interest in international experiences.
                    <br></br>
                    Since then I started to travel a lot on my own, visiting friends or hopping hostels mainly within Europe. I've been on amazing trips, but I've also experienced how things can go wrong.
                    I learned a lot more about different types of tourism and what type I like the best myself. I worked in tourism,
                    traveled extensively through South America, and I'm now living in Barcelona, each experience 
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