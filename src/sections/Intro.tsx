"use client";
import useTextReveal from "@/hooks/useTextReveal";
import { useInView } from "motion/react";
import { FC, useEffect, useRef } from "react";

const Intro: FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scope, entranceAnimation } = useTextReveal();
  const inView = useInView(scope, {
    once: true,
  });

  useEffect(() => {
    if (inView) {
      entranceAnimation();
    }
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      id="intro"
      className="py-24 md:py-32 lg:py-40 lg:mt-20 mt-12 md:mt-16"
    >
      <div className="container">
        <h2 ref={scope} className="text-4xl md:text-7xl lg:w-[80%] lg:text-8xl">
          Building beautiful websites with clean code and thoughful design to
          help your bussiness grow and stand out online
        </h2>
      </div>
    </section>
  );
};

export default Intro;
