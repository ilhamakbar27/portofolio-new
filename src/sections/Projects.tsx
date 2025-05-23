"use client";

import { FC, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import { projectsData } from "@/data/projects";
import { useTranslations } from "next-intl";


const Projects: FC = () => {
  const titleRef = useRef(null);
  const buttonRef = useRef(null);
  const isInView = useInView(titleRef, { once: true, margin: "-100px" });
  const isButtonInView = useInView(buttonRef, { once: true, margin: "-100px" });
  const t = useTranslations("HomePage");

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
            {t("selected-projects")}
          </motion.span>
        </h2>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-16 lg:gap-x-16 lg:gap-y-24">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* See All Projects Button */}
        <motion.div 
          ref={buttonRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: isButtonInView ? 1 : 0,
            y: isButtonInView ? 0 : 30,
          }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-24 md:mt-32 text-center"
        >
          <Link 
            href="/projects" 
            className="group inline-flex flex-col items-center"
          >
            <div className="mb-6 relative overflow-hidden">
              <div className="size-[120px] md:size-[160px] rounded-full border border-stone-200 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:border-red-orange-500 group-hover:border-2">
                <div className="absolute inset-0 bg-stone-50 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-10 md:size-12 text-stone-700 group-hover:text-red-orange-500 transition-all duration-500 group-hover:scale-110"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                  />
                </svg>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="relative size-14 md:size-16">
                  <svg 
                    viewBox="0 0 100 100" 
                    className="size-full text-red-orange-500 animate-[spin_10s_linear_infinite]"
                  >
                    <path 
                      id="circle-path" 
                      d="M 50 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" 
                      fill="none" 
                      stroke="none"
                    />
                    <text className="text-[14px] uppercase tracking-widest">
                      <textPath xlinkHref="#circle-path" startOffset="0%" className="fill-current">
                        View All Projects · View All Projects ·
                      </textPath>
                    </text>
                  </svg>
                </div>
              </div>
            </div>
            
            <span className="text-2xl font-light text-stone-800 group-hover:text-red-orange-500 transition-colors duration-300">
              See All Projects
            </span>
            <div className="mt-2 h-px w-0 bg-red-orange-500 transition-all duration-500 ease-out group-hover:w-40"></div>
          </Link>
        </motion.div>
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
