"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IIntroduction } from "@/models/introduction.model";

interface IntroductionProps {
  introductionData: IIntroduction | null;
}
const Introduction = ({ introductionData }: IntroductionProps) => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-background to-blue-50/50 dark:to-blue-950/30 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-200 dark:bg-blue-800 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-200 dark:bg-purple-800 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col items-center text-center space-y-8">
          {/* Profile Image with enhanced styling */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative w-40 h-40 rounded-full border-4 border-background shadow-2xl overflow-hidden bg-background">
              <Image
                src={introductionData?.avatar || ""}
                alt="Kushal Baral - UI/UX Designer"
                width={160}
                height={160}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
                👋 Available for new projects
              </div>
              <h1 className="text-3xl font-bold text-foreground leading-tight">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Kushal Baral
                </span>
              </h1>
              <h2 className="text-xl font-semibold text-muted-foreground">
              UI/UX Designer & Creative Problem Solver
              </h2>
            </div>

            <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
              I craft intuitive digital experiences that blend beautiful design with seamless functionality. 
              Specializing in user-centered design, I help brands connect with their audience through 
              thoughtful interfaces and engaging interactions.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Let's Work Together
              </Button>
              <Button
                variant="outline"
                className="border-2 border-border hover:border-muted-foreground text-foreground font-semibold px-8 py-3 rounded-xl transition-all duration-300"
              >
                View Portfolio
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between gap-16">
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium">
                👋 Available for new projects
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Kushal Baral
                </span>
              </h1>
              <h2 className="text-2xl lg:text-3xl font-semibold text-muted-foreground">
              UI/UX Designer & Creative Problem Solver
              </h2>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              I craft intuitive digital experiences that blend beautiful design with seamless functionality. 
              Specializing in user-centered design, I help brands connect with their audience through 
              thoughtful interfaces and engaging interactions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Let's Work Together
              </Button>
              <Button
                variant="outline"
                className="border-2 border-border hover:border-muted-foreground text-foreground font-semibold px-10 py-4 rounded-xl transition-all duration-300"
              >
                View Portfolio
              </Button>
            </div>

            {/* Stats or additional info */}
            <div className="flex gap-8 pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{introductionData?.numberOfProjects}</div>
                <div className="text-sm text-muted-foreground">
                  Projects Completed
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{introductionData?.yearsOfExperience}</div>
                <div className="text-sm text-muted-foreground">
                  Years Experience
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{introductionData?.clientSatisfaction + "%"}</div>
                <div className="text-sm text-muted-foreground">
                  Client Satisfaction
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Image Section */}
          <div className="flex-1 flex justify-end">
            <div className="relative group">
              <div className="absolute -inset-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
              <div className="relative w-96 h-96 bg-background rounded-2xl shadow-2xl overflow-hidden border border-border">
                <Image
                  src={introductionData?.avatar || ""}
                  alt="Kushal Baral - UI/UX Designer"
                  width={384}
                  height={384}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay with subtle pattern */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent dark:from-black/20"></div>
              </div>

              {/* Floating elements for visual interest */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full shadow-lg animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full shadow-lg animate-pulse delay-300"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
