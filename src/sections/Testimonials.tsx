"use client";

import { FC, useRef } from "react";
import image1 from "@/assets/images/testimonial-1.jpg";
import image2 from "@/assets/images/testimonial-2.jpg";
import image3 from "@/assets/images/testimonial-3.jpg";
import Image from "next/image";
import { useScroll, motion, useTransform } from "motion/react";
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const testimonials = [
  {
    name: "Sarah Chen",
    company: "Pixel Perfect",
    role: "Head of Design",
    quote:
      "Alex's expertise in both technical development and design created a beautiful, high-performing website.",
    image: image1,
    imagePositionY: 0.2,
  },
  {
    name: "Marcus Rodriguez",
    company: "Craft Coffee Co.",
    role: "Founder",
    quote:
      "Alex transformed our boutique coffee brand with a website that perfectly balances aesthetics and functionality.",
    image: image2,
    imagePositionY: 0.1,
  },
  {
    name: "Emily Watson",
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

  const transformTop = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const transformBottom = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const testimonialsIndex = 0;
  return (
    <section id="testimonials">
      <h2 className="flex flex-col overflow-hidden lg:text-8xl md:text-7xl text-4xl">
        <motion.span
          className="whitespace-nowrap"
          style={{
            x: transformTop,
          }}
        >
          Some nice words from my past clients
        </motion.span>
        <motion.span
          className="whitespace-nowrap text-red-orange-500 self-end"
          style={{
            x: transformBottom,
          }}
        >
          Some nice words from my past clients
        </motion.span>
      </h2>
      <div className="container">
        <div className="mt-20">
          {testimonials.map(
            ({ name, company, role, quote, image, imagePositionY }, index) =>
              index === testimonialsIndex && (
                <div
                  key={name}
                  className="grid md:grid-cols-5 md:items-center lg:gap-16  gap-8"
                >
                  <div className="aspect-square md:aspect-[9/16] md:col-span-2 ">
                    <Image
                      className="size-full object-cover"
                      src={image}
                      alt={name}
                      style={{
                        objectPosition: `50% ${imagePositionY * 100}%`,
                      }}
                    />
                  </div>
                  <blockquote className="md:col-span-3">
                    <div className="text-3xl md:mt-0 md:text-5xl lg:text-6xl mt-8">
                      <span>&ldquo;</span>
                      <span>{quote}</span>
                    </div>
                    <cite className="mt-4 md:mt-8 lg:text-xl  md:text-lg not-italic block">
                      {name}, {role} at {company}
                    </cite>
                  </blockquote>
                </div>
              )
          )}
        </div>
        <div className="mt-6 lg:mt-10 flex gap-4">
          <button className="border border-stone-400 size-11 inline-flex items-center justify-center rounded-full">
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
          <button className="border border-stone-400 size-11 inline-flex items-center justify-center rounded-full">
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
