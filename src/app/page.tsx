"use client";
import FAQs from "@/sections/FAQs";
import Footer from "@/sections/Footer";
import Header from "@/sections/Header";
import Hero from "@/sections/Hero";
import Intro from "@/sections/Intro";
import Preloader from "@/sections/Preloader";
import Projects from "@/sections/Projects";
import Testimonials from "@/sections/Testimonials";
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = "default";
    }, 2000);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Header />
      <Hero />
      <Intro />
   
      <Projects />
      <Testimonials />
      <FAQs />
      <Footer />
    </>
  );
}
