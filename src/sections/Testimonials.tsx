"use client";

import { FC, useRef, useState } from "react";
import image1 from "@/assets/images/testi-1.png";
import image2 from "@/assets/images/testi-2.png";
import image3 from "@/assets/images/testimonial-3.jpg";

import {
  useScroll,
  motion,
  useTransform,
  useVelocity,
  useSpring,
  AnimatePresence,
  // useAnimate,
} from "motion/react";
import Testimonial from "@/components/Testimonial";
// import SplitType from "split-type";
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const testimonials = [
  {
    name: "Ryan Pratama",
    company: "Pixel Perfect",
    role: "Head of Design",
    quote:
      "Ilham's expertise in both technical development and design created a beautiful, high-performing website.",
    image: image1,
    imagePositionY: 0.2,
  },
  {
    name: "Alvin Pratama",
    company: "Craft Coffee Co.",
    role: "Founder",
    quote:
      "Ilham transformed our boutique coffee brand with a website that perfectly balances aesthetics and functionality.",
    image: image2,
    imagePositionY: 0.1,
  },
  {
    name: "Fakhrul",
    company: "Studio Minimal",
    role: "Creative Director",
    quote:
      "The collaborative process was amazing. Alex brought lots of fresh perspectives and innovative solutions.",
    image: image3,
    imagePositionY: 0.55,
  },
];

const Testimonials: FC = () => {
  const titleRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: ["start end", "end start"],
  });

  // Get velocity from scroll progress
  const rawScrollVelocity = useVelocity(scrollYProgress);

  // Apply spring physics to smooth out the velocity
  const scrollVelocity = useSpring(rawScrollVelocity, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Transform velocity to appropriate range for animation with more nuanced values
  const transformTop = useTransform(
    scrollVelocity,
    [-1, -0.5, 0, 0.5, 1],
    ["7%", "3.5%", "0%", "-3.5%", "-7%"]
  );

  const transformBottom = useTransform(
    scrollVelocity,
    [-1, -0.5, 0, 0.5, 1],
    ["-7%", "-3.5%", "0%", "3.5%", "7%"]
  );

  const [testimonialsIndex, setTestimonialIndex] = useState(0);
  const handleClickPrev = () => {
    setTestimonialIndex((curr) => {
      if (curr === 0) {
        return testimonials.length - 1;
      }
      return curr - 1;
    });
  };

  const handleClickNext = () => {
    setTestimonialIndex((curr) => {
      if (curr === testimonials.length - 1) {
        return 0;
      }
      return curr + 1;
    });
  };
  return (
    <section id="testimonials" ref={titleRef}>
      <h2 className="flex flex-col overflow-hidden lg:text-8xl md:text-7xl text-4xl">
        <motion.span
          className="whitespace-nowrap"
          style={{
            x: transformTop,
          }}
          transition={{ type: "tween", ease: "easeOut" }}
        >
          Some nice words from my past clients
        </motion.span>
        <motion.span
          className="whitespace-nowrap text-red-orange-500 self-end"
          style={{
            x: transformBottom,
          }}
          transition={{ type: "tween", ease: "easeOut" }}
        >
          Some nice words from my past clients
        </motion.span>
      </h2>
      <div className="container">
        <div className="mt-20">
          <AnimatePresence mode="wait" initial={false}>
            {testimonials.map(
              ({ name, company, role, quote, image, imagePositionY }, index) =>
                index === testimonialsIndex && (
                  <Testimonial
                    name={name}
                    company={company}
                    role={role}
                    quote={quote}
                    image={image}
                    imagePositionY={imagePositionY}
                    key={name}
                  />
                )
            )}
          </AnimatePresence>
        </div>
        <div className="mt-6 lg:mt-10 flex gap-4">
          <button
            onClick={handleClickPrev}
            className="border hover:bg-red-orange-500 border-stone-400 hover:text-white hover:border-red-orange-500 transition-all duration-300 size-11 inline-flex items-center justify-center rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <button
            onClick={handleClickNext}
            className="border border-stone-400 hover:bg-red-orange-500 hover:text-white hover:border-red-orange-500 transition-all duration-300  size-11 inline-flex items-center justify-center rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
