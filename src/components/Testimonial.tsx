import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React, { HTMLAttributes, useEffect } from "react";

import {  usePresence, motion } from "motion/react";
import useTextReveal from "@/hooks/useTextReveal";

const Testimonial = (
  props: {
    quote: string;
    name: string;
    role: string;
    company: string;
    image: string | StaticImport;
    imagePositionY: number;
    className?: string;
  } & HTMLAttributes<HTMLDivElement>
) => {
  const {
    quote,
    name,
    role,
    company,
    image,
    imagePositionY,
    className,
    ...rest
  } = props;
  const {
    scope: quoteScope,
    entranceAnimation: quoteEntranceAnimation,
    exitAnimation: quoteExitAnimation,
  } = useTextReveal();
  const {
    scope: citeScope,
    entranceAnimation: citeEntranceAnimation,
    exitAnimation: citeExitAnimation,
  } = useTextReveal();
  // const [citeScope, citeAnimate] = useAnimate();
  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    if (isPresent) {
      quoteEntranceAnimation().then(() => {
        citeEntranceAnimation();
      });
    } else {
      Promise.all([quoteExitAnimation(), citeExitAnimation()]).then(() => {
        safeToRemove();
      });
    }
  }, [isPresent, quoteEntranceAnimation, quoteExitAnimation, citeEntranceAnimation, citeExitAnimation, safeToRemove]);

  return (
    <div
      key={name}
      className={`grid md:grid-cols-5 md:items-center lg:gap-16 gap-8 ${className ?? ''}`}
      {...rest}
    >
      <div className="aspect-square md:aspect-[9/16] md:col-span-2 relative ">
        <motion.div
          initial={{
            width: "100%",
          }}
          animate={{
            width: "0%",
          }}
          exit={{
            width: "100%",
          }}
          transition={{
            duration: 0.5,
          }}
          className="absolute h-full bg-stone-900  "
        ></motion.div>
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
        <div
          className="text-3xl md:mt-0 md:text-5xl lg:text-6xl mt-8"
          ref={quoteScope}
        >
          <span>&ldquo;</span>
          {/* <span>{quote}</span> */}
          {quote}
          <span>&ldquo;</span>
        </div>
        <cite
          ref={citeScope}
          className="mt-4 md:mt-8 lg:text-xl  md:text-lg not-italic block"
        >
          {name}, {role} at {company}
        </cite>
      </blockquote>
    </div>
  );
};

export default Testimonial;
