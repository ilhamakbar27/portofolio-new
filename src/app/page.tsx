"use client";
import BlogPreview from "@/sections/BlogPreview";
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
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);

      // Add a small delay to ensure smooth transition
      setTimeout(() => {
        setPreloaderComplete(true);
      }, 300);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait" onExitComplete={() => setPreloaderComplete(true)}>
        {isLoading && <Preloader />}
      </AnimatePresence>

      <Header />
      <Hero preloaderComplete={preloaderComplete} />
      <Intro />
      <Projects />
      <BlogPreview/>
      <Testimonials />
      <FAQs />
      <Footer />
    </>
  );
}
