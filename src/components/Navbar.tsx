"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

interface NavbarProps {
  activeSection: string
  onNavigate: (section: string) => void
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ]

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId)
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 border-b shadow-lg' 
        : 'bg-background/60 backdrop-blur-sm supports-[backdrop-filter]:bg-background/40'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo with enhanced styling */}
          <div className="flex-shrink-0 group">
            <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent cursor-pointer transition-all duration-300 group-hover:scale-105">
              Kushal Baral
            </h1>
            <div className="h-0.5 w-0 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 transition-all duration-300 group-hover:w-full"></div>
          </div>

          {/* Desktop Navigation with enhanced styling */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1 lg:space-x-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 lg:px-6 lg:py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                    activeSection === item.id
                      ? 'text-foreground bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 shadow-md'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  {item.label}
                  {/* Active indicator */}
                  {activeSection === item.id && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 rounded-full"></div>
                  )}
                </Button>
              ))}
              
              {/* CTA Button */}
              <div className="ml-4 lg:ml-6">
                <Button 
                  onClick={() => handleNavClick('contact')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-2 lg:px-8 lg:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  Let's Talk
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile menu button with animation */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative w-10 h-10 rounded-xl transition-all duration-300 hover:bg-accent/50"
            >
              <div className="relative w-6 h-6">
                <Menu className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'
                }`} />
                <X className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-0 opacity-100' : '-rotate-180 opacity-0'
                }`} />
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation with slide animation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-2 pt-4 pb-6 space-y-2 bg-background/95 backdrop-blur-md border-t border-border/50 rounded-b-2xl shadow-lg">
            {navItems.map((item, index) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => handleNavClick(item.id)}
                className={`w-full justify-start px-4 py-3 rounded-xl font-medium transition-all duration-300 transform ${
                  activeSection === item.id
                    ? 'text-foreground bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 shadow-md scale-105'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50 hover:scale-105'
                } ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms'
                }}
              >
                <span className="relative">
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 rounded-full"></div>
                  )}
                </span>
              </Button>
            ))}
            
            {/* Mobile CTA */}
            <div className="pt-4 border-t border-border/50">
              <Button 
                onClick={() => handleNavClick('contact')}
                className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                  isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                }`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${navItems.length * 50}ms` : '0ms'
                }}
              >
                Let's Work Together
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}