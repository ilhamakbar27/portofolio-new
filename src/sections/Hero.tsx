"use client";
import { FC, useEffect, useRef } from "react";
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import heroImage from "@/assets/images/hero.png";
import Image from "next/image";
import Button from "@/components/button";
import { motion, useScroll, useTransform } from "motion/react";
import useTextReveal from "@/hooks/useTextReveal";

interface HeroProps {
  preloaderComplete?: boolean;
}

const Hero: FC<HeroProps> = ({ preloaderComplete = true }) => {
  const scrollingDiv = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollingDiv,
    offset: ["start end", "end end"],
  });
  const portraitWidth = useTransform(scrollYProgress, [0, 1], ["100%", "240%"]);

  const { scope, entranceAnimation } = useTextReveal();

  useEffect(() => {
    // Only trigger entrance animation when preloader is complete
    if (preloaderComplete) {
      entranceAnimation();
    }
  }, [entranceAnimation, preloaderComplete]);

  return (
    <section>
      <div className="grid md:grid-cols-12 md:h-screen items-stretch sticky top-0">
        <div className="md:col-span-7 flex flex-col justify-center">
          <div className="container !max-w-full">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={preloaderComplete ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl mt-40 md:mt-0"
              ref={scope}
            >
              Crafting digital experiences through code and creative design
            </motion.h1>
            <div className="flex flex-col md:flex-row md:items-center items-start gap-6 mt-10">
              <motion.div
                initial={{ opacity: 0, y: "100%" }}
                animate={preloaderComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: "100%" }}
                transition={{
                  duration: 0.5,
                  delay: preloaderComplete ? 1.75 : 0,
                }}
              >
                <Button
                  variant="secondary"
                  iconAfter={
                    <div className="overflow-hidden size-5">
                      <div className="h-5 w-10 flex group-hover/button:-translate-x-1/2 transition-transform duration-500">
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
                            d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
                          />
                        </svg>
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
                            d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
                          />
                        </svg>
                      </div>
                    </div>
                  }
                >
                  <span>View my work</span>
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: "100%" }}
                animate={preloaderComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: "100%" }}
                transition={{
                  duration: 0.5,
                  delay: preloaderComplete ? 2.2 : 0,
                }}
              >
                <Button variant="text">Let&apos;s Talk</Button>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="md:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={preloaderComplete ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 md:mt-0 md:size-full md:absolute md:right-0 max-md:!w-full "
            style={{
              width: portraitWidth,
            }}
          >
            <Image
              className="size-full object-cover"
              src={heroImage}
              alt="hero"
            />
          </motion.div>
        </div>
      </div>
      <div ref={scrollingDiv} className="md:h-[200vh] "></div>
    </section>
  );
};

export default Hero;
