"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Loader2 } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import useSWR from "swr";

// TypeScript interfaces for type safety
interface ProjectTag {
  id: string;
  name: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  imageUrl?: string | null;
  category: string;
  tags: ProjectTag[];
  status: 'completed' | 'in-progress' | 'draft' | 'concept';
  featured: boolean;
  year: number;
  client?: string;
  duration?: string;
  link?: string;
}

type ProjectCategory = 'All Projects' | 'Graphics Design' | 'Motion Graphics' | 'Logo Designs' | 'User Interface';

interface TabConfig {
  value: ProjectCategory;
  label: string;
  description: string;
  icon: string;
}

const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All Projects');

  // Tab configuration with TypeScript
  const tabsConfig: TabConfig[] = [
    {
      value: 'All Projects',
      label: 'All Projects',
      description: 'Complete portfolio showcase',
      icon: '🎨'
    },
    {
      value: 'Graphics Design',
      label: 'Graphics Design',
      description: 'Print & digital graphics',
      icon: '🎭'
    },
    {
      value: 'Motion Graphics',
      label: 'Motion Graphics',
      description: 'Animation & video content',
      icon: '🎬'
    },
    {
      value: 'Logo Designs',
      label: 'Logo Design',
      description: 'Brand identity & logos',
      icon: '🏷️'
    },
    {
      value: 'User Interface',
      label: 'User Interface',
      description: 'UI/UX design projects',
      icon: '💻'
    }
  ];

  // SWR fetcher function
  const fetcher = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  };

  // Construct API URL with category filter
  const getApiUrl = (category: ProjectCategory) => {
    if (category === 'All Projects') {
      return '/api/project';
    }
    return `/api/project?category=${encodeURIComponent(category)}`;
  };

  // Fetch projects using SWR
  const { data: projects = [], error, isLoading } = useSWR(
    getApiUrl(activeCategory),
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveCategory(value as ProjectCategory);
  };

  // Get status display text
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'In Progress';
      case 'draft':
        return 'Draft';
      case 'concept':
        return 'Concept';
      case 'completed':
      default:
        return 'Completed';
    }
  };

  // Get status variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'in-progress':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  // Render project card
  const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
    <Card className="group overflow-hidden border-border hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      {/* Project Image */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              // Fallback to placeholder if signed URL fails
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-project.jpg';
            }}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
            <div className="text-4xl text-muted-foreground">🎨</div>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            <Button size="sm" className="bg-blue-500/20 backdrop-blur-sm hover:bg-blue-500/30 text-white border-none">
              <Eye className="w-4 h-4 mr-1" />
              View Details
            </Button>
          </div>
        </div>
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <Badge 
            variant={getStatusVariant(project.status)}
            className="bg-background/90 backdrop-blur-sm text-foreground"
          >
            {getStatusDisplay(project.status)}
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
              variant="outline"
              className="text-xs"
            >
              {tag.name}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          variant="ghost" 
          className="w-full group-hover:bg-blue-50 dark:group-hover:bg-blue-950/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300"
          onClick={() => {
            if (project.link) {
              window.open(project.link, '_blank');
            }
          }}
        >
          View Project Details
          <Eye className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );

  // Loading component
  const LoadingGrid = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <div className="aspect-video bg-muted animate-pulse" />
          <CardHeader>
            <div className="h-6 bg-muted animate-pulse rounded mb-2" />
            <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <div className="h-6 bg-muted animate-pulse rounded w-16" />
              <div className="h-6 bg-muted animate-pulse rounded w-20" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  // Error component
  const ErrorDisplay = () => (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">⚠️</div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        Failed to Load Projects
      </h3>
      <p className="text-muted-foreground mb-4">
        {error?.message || 'Something went wrong while fetching projects.'}
      </p>
      <Button 
        onClick={() => window.location.reload()} 
        variant="outline"
      >
        Try Again
      </Button>
    </div>
  );

  return (
    <section id="projects" className="py-20 lg:py-32 bg-gradient-to-b from-muted/20 to-background">
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
        <Tabs value={activeCategory} onValueChange={handleTabChange} className="w-full">
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
              {/* Loading State */}
              {isLoading && <LoadingGrid />}
              
              {/* Error State */}
              {error && <ErrorDisplay />}
              
              {/* Success State */}
              {!isLoading && !error && (
                <>
                  {projects.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {projects.map((project: Project) => (
                        <ProjectCard key={project._id} project={project} />
                      ))}
                    </div>
                  ) : (
                    /* Empty State */
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
                </>
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
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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