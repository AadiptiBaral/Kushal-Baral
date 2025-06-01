"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Introduction from "./sections/Introduction";
import Navbar from "@/components/Navbar";
import About from "./sections/About";
import Portfolio from "./sections/Portfolio";
import Contact from "./sections/Contact";
import { getSignedUrl } from "@/lib/uploadOnAWS";

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const [introductionData, setIntroductionData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
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
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />
      <Introduction introductionData={introductionData} />
      <About introductionData = {introductionData} />
      <Portfolio />
      <Contact  introductionData = {introductionData} />
    </>
  );
}
