"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Introduction from "./sections/Introduction";
import Navbar from "@/components/Navbar";
import About from "./sections/About";
import Portfolio from "./sections/Portfolio";
import Contact from "./sections/Contact";
import ScrollToTop from "@/components/ui/scroll-to-top";
import { getSignedUrl } from "@/lib/uploadOnAWS";

export default function Home() {
  const [introductionData, setIntroductionData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [activeSection, setActiveSection] = useState("home");
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "contact"];
      const scrollPosition = window.scrollY + 100; // Offset for navbar height

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check on load
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/introduction");

        if (response.status === 200) {
          const data = response.data;

          if (data.avatar) {
            const signedUrl = await getSignedUrl(data.avatar);
            data.avatar = signedUrl;
          }

          setIntroductionData(data);
        }
      } catch (error) {
        console.error("Error fetching introduction data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar activeSection={activeSection} onNavigate={scrollToSection} />
      <Introduction introductionData={introductionData} />
      <About introductionData={introductionData} />
      <Portfolio />
      <Contact introductionData={introductionData} />
      <ScrollToTop showAfter={400} />
    </>
  );
}
