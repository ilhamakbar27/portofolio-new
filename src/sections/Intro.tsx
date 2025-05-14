"use client";
import { stagger } from "motion";
import { useInView, useAnimate } from "motion/react";
import { FC, useEffect } from "react";
import SplitType from "split-type";

const Intro: FC = () => {
  const [scope, animate] = useAnimate();
  const inView = useInView(scope, {
    once: true,
  });

  useEffect(() => {
    new SplitType(scope.current.querySelector("h2"), {
      types: "lines,words",
      tagName: "span",
    });
  }, [scope]);
  useEffect(() => {
    if (inView) {
      animate(
        scope.current.querySelectorAll(".word"),
        {
          transform: "translateY(0)",
        },
        {
          duration: 0.5,
          delay: stagger(0.2),
        }
      );
    }
  }, [inView, animate, scope]);
  return (
    <section
      ref={scope}
      id="intro"
      className="py-24 md:py-32 lg:py-40 lg:mt-20 mt-12 md:mt-16"
    >
      <div className="container">
        <h2 className="text-4xl md:text-7xl lg:w-[80%] lg:text-8xl">
          Building beautiful websites with clean code and thoughful design to
          help your bussiness grow and stand out online
        </h2>
      </div>
    </section>
  );
};

export default Intro;
