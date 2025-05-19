"use client";

import { FC, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import useTextReveal from "@/hooks/useTextReveal";
import Link from "next/link";

// Replace this with your own image
import profileImage from "@/assets/images/image.jpg";

const AboutPage: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const { scope: titleScope, entranceAnimation: titleAnimation } =
    useTextReveal();
  const { scope: subtitleScope, entranceAnimation: subtitleAnimation } =
    useTextReveal();
  const { scope: bioScope, entranceAnimation: bioAnimation } = useTextReveal();

  const titleInView = useInView(titleScope, { once: true });
  const subtitleInView = useInView(subtitleScope, { once: true });
  const bioInView = useInView(bioScope, { once: true });
  const imageInView = useInView(imageRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    if (titleInView) titleAnimation();
    if (subtitleInView) subtitleAnimation();
    if (bioInView) bioAnimation();
  }, [
    titleInView,
    subtitleInView,
    bioInView,
    titleAnimation,
    subtitleAnimation,
    bioAnimation,
  ]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      {/* Hero Section */}
      <div className="container mx-auto pt-40 pb-24 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[120px] h-[1px] bg-stone-200"></div>

        <div className="flex flex-col items-start">
          <Link
            href="/"
            className="flex items-center text-base hover:text-red-orange-500 transition-colors mb-16"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            Back to home
          </Link>

          <motion.div
            className="flex w-full flex-col lg:flex-row lg:items-end justify-between"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <span className="text-sm uppercase tracking-wider text-stone-500 mb-4 block">
                About
              </span>
              <h1
                ref={titleScope}
                className="text-5xl md:text-7xl lg:text-8xl font-light mb-6"
              >
                Ilham Akbar
              </h1>
              <div
                ref={subtitleScope}
                className="text-xl md:text-2xl text-stone-600 mb-10 max-w-2xl"
              >
                Helping brands thrive in the digital world
              </div>
            </div>

            <motion.div
              className="flex-shrink-0 rounded-full bg-blue-500 size-24 md:size-32 flex items-center justify-center mt-6 lg:mt-0"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: "backOut", delay: 0.3 }}
            >
              <svg
                className="size-10 md:size-12 text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.5 12H15.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 8.5V15.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-5 gap-16">
          {/* Left Column: Bio */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="max-w-2xl">
              <div ref={bioScope} className="text-lg space-y-6 text-stone-800">
                <p>
                  I help companies from all over the world with tailor-made
                  solutions. With each project, I push my work to new horizons,
                  always putting quality first.
                </p>
                <p>
                  My journey in web development began in 2017, and I've since
                  worked with various technologies focusing on React, Next.js,
                  and modern JavaScript. I'm particularly interested in
                  animation, interactivity, and crafting delightful user
                  experiences.
                </p>
                <p>
                  When I'm not coding, you might find me exploring design
                  trends, experimenting with new technologies, or seeking
                  inspiration from art, architecture, and nature.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="my-16 border-t border-stone-200 pt-16"
              >
                <h2 className="text-2xl mb-8 font-light">
                  Technical Expertise
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                  {[
                    "JavaScript",
                    "TypeScript",
                    "React",
                    "Next.js",
                    "Tailwind CSS",
                    "Framer Motion",
                    "Redux",
                    "GraphQL",
                    "Node.js",
                    "Git",
                    "Figma",
                    "Responsive Design",
                  ].map((skill) => (
                    <div key={skill} className="flex items-center">
                      <span className="block h-[6px] w-[6px] rounded-full bg-blue-500 mr-3"></span>
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <motion.div
              ref={imageRef}
              style={{ y: imageY }}
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: imageInView ? 1 : 0,
                y: imageInView ? 0 : 30,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="sticky top-40"
            >
              <div className="relative">
                <div className="overflow-hidden">
                  <Image
                    src={profileImage}
                    alt="Ilham Akbar"
                    className="w-full h-auto object-cover"
                    width={800}
                    height={1000}
                    priority
                  />
                </div>

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "60%" }}
                  transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                  className="absolute -bottom-3 -right-3 h-1 bg-blue-500"
                />
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "60%" }}
                  transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                  className="absolute -bottom-3 -right-3 w-1 bg-blue-500"
                />
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="my-32 max-w-3xl"
        >
          <div className="h-[1px] w-24 bg-stone-300 mb-16"></div>
          <h2 className="text-2xl font-light mb-8">My Approach</h2>
          <div className="space-y-6 text-lg text-stone-800">
            <p>
              Always exploring. I believe that great websites are a perfect
              blend of aesthetic design, technical excellence, and thoughtful
              user experience. My approach to projects always starts with
              understanding the core objectives and target audience.
            </p>
            <p>
              I'm passionate about creating websites that not only look good but
              also perform exceptionally well. I pay special attention to web
              performance, accessibility, and creating responsive designs that
              work seamlessly across all devices.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="my-32 border-t border-stone-200 pt-16"
        >
          <h2 className="text-2xl font-light mb-12">Get In Touch</h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <Link
              href="mailto:hello@ilhamakbar.com"
              className="px-8 py-4 border border-stone-900 bg-stone-900 text-white hover:bg-stone-800 transition-all flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 mr-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
              hello@ilhamakbar.com
            </Link>
            <Link
              href="https://github.com/ilhamakbar"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-stone-200 hover:border-stone-900 transition-all flex items-center"
            >
              <svg
                className="size-5 mr-3"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              GitHub
            </Link>
            <Link
              href="https://linkedin.com/in/ilhamakbar"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-stone-200 hover:border-stone-900 transition-all flex items-center"
            >
              <svg
                className="size-5 mr-3"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
              LinkedIn
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto border-t border-stone-200 py-12 mt-16 mb-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-sm text-stone-500"
        >
          © {new Date().getFullYear()} Ilham Akbar. All rights reserved.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default AboutPage;
