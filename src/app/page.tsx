"use client";
import Image from "next/image";
import Introduction from "./sections/Introduction";
import Navbar from "@/components/Navbar";
import About from "./sections/About";
import { useState } from "react";
import Portfolio from "./sections/Portfolio";
import Contact from "./sections/Contact";
export default function Home() {
  const [activeSection, setActiveSection] = useState("about");

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    // Add scroll to section logic here if needed
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />
      <Introduction />
      <About />
      <Portfolio />
      <Contact />
      {/* Add more sections as needed */}
    </>
  );
}
