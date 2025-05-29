"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye } from "lucide-react";
import Image from "next/image";

// TypeScript interfaces for type safety
interface ProjectTag {
  id: string;
  name: string;
  color: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  category: ProjectCategory;
  tags: ProjectTag[];
  status: 'completed' | 'in-progress' | 'concept';
  featured: boolean;
  year: number;
  client?: string;
  duration?: string;
}

type ProjectCategory = 'all' | 'graphics-design' | 'motion-graphics' | 'logo-design' | 'user-interface';

interface TabConfig {
  value: ProjectCategory;
  label: string;
  description: string;
  icon: string;
}

const Portfolio: React.FC = () => {
  // Tab configuration with TypeScript
  const tabsConfig: TabConfig[] = [
    {
      value: 'all',
      label: 'All Projects',
      description: 'Complete portfolio showcase',
      icon: '🎨'
    },
    {
      value: 'graphics-design',
      label: 'Graphics Design',
      description: 'Print & digital graphics',
      icon: '🎭'
    },
    {
      value: 'motion-graphics',
      label: 'Motion Graphics',
      description: 'Animation & video content',
      icon: '🎬'
    },
    {
      value: 'logo-design',
      label: 'Logo Design',
      description: 'Brand identity & logos',
      icon: '🏷️'
    },
    {
      value: 'user-interface',
      label: 'User Interface',
      description: 'UI/UX design projects',
      icon: '💻'
    }
  ];
  // Project data with consistent color scheme
  const dummyProjects: Project[] = [
    {
      id: '1',
      title: 'Modern E-commerce Dashboard',
      description: 'Clean and intuitive dashboard design for online retailers',
      longDescription: 'A comprehensive dashboard solution designed for e-commerce businesses to manage their operations efficiently. Features include analytics, inventory management, and customer insights.',
      image: '',
      category: 'user-interface',
      tags: [
        { id: 'ui', name: 'UI Design', color: 'blue' },
        { id: 'dashboard', name: 'Dashboard', color: 'purple' },
        { id: 'ecommerce', name: 'E-commerce', color: 'blue' }
      ],
      status: 'completed',
      featured: true,
      year: 2024,
      client: 'TechCorp Solutions',
      duration: '3 months'
    },
    {
      id: '2',      title: 'Brand Identity - Coffee Shop',
      description: 'Complete branding package for artisanal coffee house',
      longDescription: 'Developed a warm and inviting brand identity for a local coffee shop, including logo design, color palette, typography, and brand guidelines.',
      image: '',
      category: 'logo-design',
      tags: [
        { id: 'branding', name: 'Branding', color: 'purple' },
        { id: 'logo', name: 'Logo Design', color: 'blue' },
        { id: 'identity', name: 'Brand Identity', color: 'purple' }
      ],
      status: 'completed',
      featured: true,
      year: 2024,
      client: 'Brew & Bean',
      duration: '2 months'
    },
    {
      id: '3',
      title: 'Product Launch Animation',
      description: 'Engaging motion graphics for tech product reveal',
      longDescription: 'Created dynamic motion graphics and animations for a major tech product launch, including explainer videos and social media content.',
      image: '',
      category: 'motion-graphics',
      tags: [
        { id: 'animation', name: 'Animation', color: 'blue' },
        { id: 'motion', name: 'Motion Design', color: 'purple' },
        { id: 'product', name: 'Product Launch', color: 'blue' }
      ],
      status: 'completed',
      featured: false,
      year: 2023,
      client: 'InnovateTech',
      duration: '1 month'
    },
    {
      id: '4',
      title: 'Event Poster Series',
      description: 'Vibrant poster designs for music festival',
      longDescription: 'Designed a series of eye-catching posters and promotional materials for an annual music festival, capturing the energy and vibe of the event.',
      image: '',
      category: 'graphics-design',
      tags: [
        { id: 'poster', name: 'Poster Design', color: 'purple' },
        { id: 'print', name: 'Print Design', color: 'blue' },
        { id: 'event', name: 'Event Branding', color: 'purple' }
      ],
      status: 'completed',
      featured: false,
      year: 2023,
      client: 'MusicFest 2023',
      duration: '3 weeks'
    },
    {
      id: '5',
      title: 'Mobile Banking App',
      description: 'User-friendly mobile interface for financial services',
      longDescription: 'Designed a secure and intuitive mobile banking application with focus on user experience and accessibility for all age groups.',
      image: '',
      category: 'user-interface',
      tags: [
        { id: 'mobile', name: 'Mobile App', color: 'blue' },
        { id: 'fintech', name: 'FinTech', color: 'purple' },
        { id: 'ux', name: 'UX Design', color: 'blue' }
      ],
      status: 'in-progress',
      featured: true,
      year: 2024,
      client: 'SecureBank',
      duration: '4 months'
    },
    {
      id: '6',
      title: 'Startup Logo Collection',
      description: 'Modern minimalist logos for tech startups',
      longDescription: 'Created a collection of clean, modern logos for various tech startups, focusing on simplicity and memorable brand recognition.',
      image: '',
      category: 'logo-design',
      tags: [
        { id: 'minimal', name: 'Minimalist', color: 'blue' },
        { id: 'startup', name: 'Startup', color: 'purple' },
        { id: 'tech', name: 'Technology', color: 'blue' }
      ],
      status: 'completed',
      featured: false,
      year: 2023,
      duration: '2 weeks'
    }
  ];

  // Filter projects by category
  const getFilteredProjects = (category: ProjectCategory): Project[] => {
    if (category === 'all') return dummyProjects;
    return dummyProjects.filter(project => project.category === category);
  };
  // Get badge variant based on color - simplified for blue/purple theme
  const getBadgeVariant = (color: string) => {
    const variants: Record<string, any> = {
      blue: 'default',
      purple: 'secondary'
    };
    return variants[color] || 'outline';
  };

  // Render project card
  const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
    <Card className="group overflow-hidden border-border hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      {/* Project Image */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = ``;
          }}
        />
          {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            <Button size="sm" className="bg-blue-500/20 backdrop-blur-sm hover:bg-blue-500/30 text-white border-none">
              <Eye className="w-4 h-4 mr-1" />
              View Details
            </Button>
          </div>
        </div>        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <Badge 
            variant={project.status === 'completed' ? 'default' : project.status === 'in-progress' ? 'secondary' : 'outline'}
            className="bg-background/90 backdrop-blur-sm text-foreground"
          >
            {project.status === 'in-progress' ? 'In Progress' : project.status === 'concept' ? 'Concept' : 'Completed'}
          </Badge>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none">
              ⭐ Featured
            </Badge>
          </div>
        )}
      </div>

      {/* Project Content */}
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl font-bold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {project.title}
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              {project.description}
            </CardDescription>
          </div>
          <Badge variant="outline" className="ml-4 text-xs">
            {project.year}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        {/* Client & Duration */}
        {(project.client || project.duration) && (
          <div className="flex gap-4 text-sm text-muted-foreground mb-4">
            {project.client && <span>Client: {project.client}</span>}
            {project.duration && <span>Duration: {project.duration}</span>}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge 
              key={tag.id} 
              variant={getBadgeVariant(tag.color)}
              className="text-xs"
            >
              {tag.name}
            </Badge>
          ))}
        </div>
      </CardContent>      <CardFooter>
        <Button 
          variant="ghost" 
          className="w-full group-hover:bg-blue-50 dark:group-hover:bg-blue-950/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300"
        >
          View Project Details
          <Eye className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <section id="portfolio" className="py-20 lg:py-32 bg-gradient-to-b from-muted/20 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
            🚀 My Work
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Featured{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Portfolio
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore my latest projects across different design disciplines. Each project represents 
            a unique challenge and creative solution tailored to client needs.
          </p>
        </div>

        {/* Tabs Component */}
        <Tabs defaultValue="all" className="w-full">
          {/* Tabs List */}
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-12 bg-muted/50 p-1 rounded-2xl">
            {tabsConfig.map((tab) => (
              <TabsTrigger 
                key={tab.value} 
                value={tab.value}
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-xl py-3 px-4 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <span className="text-lg">{tab.icon}</span>
                  <div className="text-center sm:text-left">
                    <div className="font-medium text-sm">{tab.label}</div>
                    <div className="text-xs text-muted-foreground hidden sm:block">
                      {tab.description}
                    </div>
                  </div>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tabs Content */}
          {tabsConfig.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {getFilteredProjects(tab.value).map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
              
              {/* Empty State */}
              {getFilteredProjects(tab.value).length === 0 && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">{tab.icon}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No {tab.label} Yet
                  </h3>
                  <p className="text-muted-foreground">
                    Projects in this category will appear here soon.
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-background border border-border rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Like what you see?
            </h3>
            <p className="text-muted-foreground mb-6">
              Let's collaborate on your next project and create something amazing together.
            </p>            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Start a Project
              </Button>
              <Button variant="outline" className="border-2 border-border hover:border-muted-foreground text-foreground font-semibold px-8 py-3 rounded-xl transition-all duration-300">
                View All Work
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;