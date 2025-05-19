"use client";

import { FC, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { projectsData } from "@/data/projects";
import Link from "next/link";
import useTextReveal from "@/hooks/useTextReveal";
import { useInView } from "motion/react";

const ProjectDetail: FC = () => {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;

  const project = projectsData.find((p) => p.slug === slug);
  const { scope: titleScope, entranceAnimation: titleAnimation } =
    useTextReveal();
  const { scope: descScope, entranceAnimation: descAnimation } =
    useTextReveal();
  const imageRef = useRef(null);
  const inViewTitle = useInView(titleScope, { once: true });
  const inViewDesc = useInView(descScope, { once: true });
  const inViewImage = useInView(imageRef, { once: true });

  useEffect(() => {
    if (inViewTitle) titleAnimation();
    if (inViewDesc) descAnimation();
  }, [inViewTitle, inViewDesc, titleAnimation, descAnimation]);

  if (!project) {
    return <div className="container py-20">Project not found</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="h-screen w-full fixed top-0 left-0 -z-10">
          <motion.div
            initial={{ height: "100%" }}
            // animate={{ height: "50%" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            className="w-full h-full bg-stone-100"
          />
        </div>

        <div className="container pt-32 pb-20">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10"
          >
            <Link
              href="/#projects"
              className="flex items-center text-lg hover:text-red-orange-500 transition-colors"
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
              Back to projects
            </Link>
          </motion.div>

          <header className="mb-16">
            <h1
              ref={titleScope}
              className="text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight"
            >
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-3 mb-8">
              {project.technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="px-4 py-2 rounded-full bg-stone-200 text-stone-800 text-sm font-medium"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </header>

          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: inViewImage ? 1 : 0,
              y: inViewImage ? 0 : 50,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-16 aspect-video w-full rounded-xl overflow-hidden shadow-md"
          >
            <Image
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              width={1200}
              height={675}
            />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-16 mb-16">
            <div className="md:col-span-2">
              <h2 className="text-2xl mb-6 font-medium">Project Overview</h2>
              <div  className="text-lg space-y-4">
                <p>{project.description}</p>
                {/* <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam auctor, nisl eget ultricies lacinia, nisl nunc aliquet
                  nunc, eget tincidunt nisl nunc eget nisl.
                </p> */}
              </div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm"
              >
                <h3 className="text-xl mb-4 font-medium">Project Details</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-stone-500 text-sm">Client</p>
                    <p className="font-medium">{project.client}</p>
                  </div>
                  <div>
                    <p className="text-stone-500 text-sm">Year</p>
                    <p className="font-medium">{project.year}</p>
                  </div>
                  <div>
                    <p className="text-stone-500 text-sm">Role</p>
                    <p className="font-medium">{project.role}</p>
                  </div>
                  <div className="pt-4">
                    <a
                      href={project.liveURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full text-center py-3 px-6 bg-red-orange-500 text-white rounded-lg hover:bg-red-orange-600 transition-colors"
                    >
                      Visit Live Site
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="aspect-[16/9] w-full rounded-xl overflow-hidden shadow-md"
            >
              <Image
                src={project.detailImages?.[0] || project.image}
                alt={`${project.title} detail 1`}
                className="w-full h-full object-cover"
                width={1200}
                height={675}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="aspect-[16/9] w-full rounded-xl overflow-hidden shadow-md"
            >
              <Image
                src={project.detailImages?.[1] || project.image}
                alt={`${project.title} detail 2`}
                className="w-full h-full object-cover"
                width={1200}
                height={675}
              />
            </motion.div>
          </div>

          <div className="mt-32">
            <h2 className="text-2xl md:text-3xl mb-8">More Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projectsData
                .filter((p) => p.slug !== project.slug)
                .slice(0, 2)
                .map((relatedProject) => (
                  <motion.div
                    key={relatedProject.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <Link
                      href={`/projects/${relatedProject.slug}`}
                      className="block"
                    >
                      <div className="aspect-video w-full rounded-lg overflow-hidden mb-4">
                        <Image
                          src={relatedProject.image}
                          alt={relatedProject.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          width={600}
                          height={338}
                        />
                      </div>
                      <h3 className="text-xl font-medium group-hover:text-red-orange-500 transition-colors">
                        {relatedProject.title}
                      </h3>
                      <p className="text-stone-500">
                        {relatedProject.category}
                      </p>
                    </Link>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectDetail;
