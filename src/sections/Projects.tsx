"use client";

import { FC, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import { projectsData } from "@/data/projects";

const Projects: FC = () => {
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 md:py-32 lg:py-40">
      <div className="container">
        <h2
          ref={titleRef}
          className="text-4xl md:text-7xl lg:text-8xl mb-16 md:mb-24"
        >
          <motion.span
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: isInView ? 1 : 0,
              y: isInView ? 0 : 50,
            }}
            transition={{ duration: 0.8 }}
          >
            Selected Projects
          </motion.span>
        </h2>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-16 lg:gap-x-16 lg:gap-y-24">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: (typeof projectsData)[0];
  index: number;
}

const ProjectCard: FC<ProjectCardProps> = ({ project, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 50,
      }}
      transition={{
        duration: 0.8,
        delay: Math.min(index * 0.2, 0.6),
      }}
      className="group"
    >
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="mb-6 aspect-video overflow-hidden rounded-xl relative">
          <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/0 transition-colors duration-300 z-10"></div>
          <Image
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-medium group-hover:text-red-orange-500 transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-stone-500">{project.category}</p>
          </div>
          <div className="bg-stone-100 rounded-full p-3 text-stone-700 group-hover:bg-red-orange-500 group-hover:text-white transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Projects;
