"use client";
import Button from "@/components/button";
import useTextReveal from "@/hooks/useTextReveal";
import { useInView } from "motion/react";
import { FC, useEffect } from "react";

const navItems = [
  {
    href: "#about",
    label: "About",
  },
  {
    href: "#projects",
    label: "Projects",
  },
  {
    href: "#testimonials",
    label: "Testimonials",
  },
  {
    href: "#footer",
    label: "Contact",
  },
  {
    href: "#faqs",
    label: "Faqs",
  },
];

const Footer: FC = () => {
  const { scope, entranceAnimation } = useTextReveal();
  const inView = useInView(scope);

  useEffect(() => {
    if (inView) {
      entranceAnimation();
    }
  }, [inView, entranceAnimation]);

  const handleClickNavItem = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget.getAttribute("href");
    if (target) {
      e.preventDefault();
      const targetElement = document.querySelector(target);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };
  return (
    <footer id="contact" className="bg-stone-900 text-white">
      <div className="container">
        <div className="section">
          <div className="flex items-center gap-3">
            <div className="size-3 bg-green-400 animate-pulse rounded-full "></div>
            <span className="uppercase">Available for this month</span>
          </div>
          <div className="grid  md:grid-cols-3  md:items-center">
            <div className="md:col-span-2">
              <h2
                ref={scope}
                className="text-4xl lg:text-8xl md:text-7xl mt-8 font-extralight"
              >
                Enough talk, let&apos;s make something great together.
              </h2>
              <Button
                variant="secondary"
                className="mt-8"
                iconAfter={
                  <div className="size-6 overflow-hidden">
                    <div className="w-12 h-6 flex group-hover/button:-translate-x-1/2 transition-transform duration-300">
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
                          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                        />
                      </svg>
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
                          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                        />
                      </svg>
                    </div>
                  </div>
                }
              >
                milham.ak10@gmail.com
              </Button>
            </div>
            <div>
              <nav className="flex flex-col md:items-end gap-8 md:mt-0 mt-16">
                {navItems.map(({ href, label }) => (
                  <a href={href} key={label} onClick={handleClickNavItem}>
                    <Button variant="text" className="text-lg">
                      {label}
                    </Button>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <p className="py-16 text-white/30 text-sm">
          Copyright &copy; Ilham &bull; All rigths reserved{" "}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
