import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IProject } from "@/models/projects.model";
import Image from "next/image";

interface FeaturedProjectsProps  {
  projects: IProject[];
}

export default async function FeaturedProjects({
  projects,
}: FeaturedProjectsProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 pb-4">
        <div className="space-y-1">
          <CardTitle className="text-xl sm:text-2xl">Featured Projects</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Highlighted portfolio projects
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        {projects.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            <p>No featured projects available</p>
          </div>
        ) : (
          <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {projects.map((project) => (
              <Card 
                key={project.id} 
                className="group overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              >
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
                  <Image
                    src={project?.image || ""}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                    priority={false}
                  />
                </div>
                <CardContent className="p-3 sm:p-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-sm sm:text-base leading-tight line-clamp-2 flex-1">
                        {project.title}
                      </h3>
                      <Badge 
                        variant="outline" 
                        className="text-xs shrink-0 ml-2"
                      >
                        {project.year}
                      </Badge>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}