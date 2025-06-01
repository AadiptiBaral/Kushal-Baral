"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Palette,
  Video,
  Layers,
  Code,
  Lightbulb,
  Users
} from "lucide-react";
import { IIntroduction } from "@/models/introduction.model";

interface AboutProps {
  introductionData: IIntroduction | null;
  onStartProject?: () => void;
}

const About = ({introductionData, onStartProject}: AboutProps) => {
  const expertiseAreas = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Brand Designing",
      description:
        "Creating memorable visual identities that capture brand essence and resonate with target audiences through strategic design thinking.",
      skills: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Strategy"]
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Motion Graphics",
      description:
        "Bringing static designs to life with engaging animations and dynamic visual storytelling that captivate and communicate effectively.",
      skills: ["2D Animation", "Video Editing", "Motion Design", "Visual Effects"]
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Graphics Designing",
      description:
        "Crafting compelling visual solutions from print materials to digital assets that communicate messages clearly and beautifully.",
      skills: ["Print Design", "Digital Graphics", "Layout Design", "Typography"]
    }
  ];

  const aboutStats = [
    { number: introductionData?.numberOfProjects, label: "Projects Completed" },
    { number: introductionData?.yearsOfExperience + "+", label: "Years Experience" },
    { number: introductionData?.numberOfClients + "+", label: "Happy Clients" },
    { number: introductionData?.clientSatisfaction + "%", label: "Client Satisfaction" }
  ];

  const personalValues = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Pixel Perfect",
      description: "Attention to detail in every design element"
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Creative Solutions",
      description: "Innovative approaches to design challenges"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Client Focused",
      description: "Understanding and exceeding client expectations"
    }
  ];

  return (
    <section id="about" className="py-20 lg:py-32 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Expertise Section */}
        <div className="mb-24 lg:mb-32 text-center">
          <Badge variant="outline" className="mb-6 text-blue-700 dark:text-blue-300">
            💼 My Expertise
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            What I Do <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Best</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I specialize in creating comprehensive visual solutions that help brands stand out,
            communicate effectively, and connect with their audience through strategic design.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {expertiseAreas.map((area, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mb-6 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                    {area.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {area.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {area.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {area.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* About Me Section */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div className="space-y-8">
            <Badge variant="outline" className="text-purple-700 dark:text-purple-300 text-2xl">
              👨‍💻 About Me
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
             {introductionData?.descriptionTitle}
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-lg">
             {introductionData?.description}
              </p>
             
            </div>
            <div className="grid sm:grid-cols-3 gap-6 pt-8">
              {personalValues.map((value, index) => (
                <div key={index} className="text-center group">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400 mx-auto mb-3">
                    {value.icon}
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{value.title}</h4>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats and CTA */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              {aboutStats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-foreground mb-2">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl blur opacity-20" />
              <CardContent className="relative z-10 p-8 text-center space-y-6">
                <h3 className="text-xl font-bold text-foreground">Let's Create Together</h3>
                <p className="text-muted-foreground">
                  Ready to bring your ideas to life? I'm always excited to work on new projects and collaborate with creative minds.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={onStartProject}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    Start a Project
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Download CV
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
