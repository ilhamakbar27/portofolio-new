"use client";
import Button from "@/components/button";
import { motion, useAnimate } from "motion/react";
import Link from "next/link";
import { FC, MouseEvent, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */

const navItems = [
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Selected Works",
    href: "#projects",
  },
  {
    label: "Testimonials",
    href: "#testimonials",
  },
  {
    label: "FAQs",
    href: "#faqs",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

// Define supported languages with their display names and flags
const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
];

const Header: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [topLineScope, topLineAnimate] = useAnimate();
  const [bottomLineScope, bottomLineAnimate] = useAnimate();
  const [navScope, navAnimate] = useAnimate();
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  useEffect(() => {
    if (isOpen) {
      topLineAnimate([
        [
          topLineScope.current,
          {
            translateY: 4,
          },
        ],
        [
          topLineScope.current,
          {
            rotate: 45,
          },
        ],
      ]);
      bottomLineAnimate([
        [
          bottomLineScope.current,
          {
            translateY: -4,
          },
        ],
        [
          bottomLineScope.current,
          {
            rotate: -45,
          },
        ],
      ]);

      navAnimate(
        navScope.current,
        {
          height: "100%",
        },
        {
          duration: 0.7,
        },
      );
    } else {
      topLineAnimate([
        [
          topLineScope.current,
          {
            rotate: 0,
          },
        ],
        [
          topLineScope.current,
          {
            translateY: 0,
          },
        ],
      ]);
      bottomLineAnimate([
        [
          bottomLineScope.current,
          {
            rotate: 0,
          },
        ],
        [
          bottomLineScope.current,
          {
            translateY: 0,
          },
        ],
      ]);

      navAnimate(navScope.current, { height: 0 });
    }
  }, [
    isOpen,
    topLineAnimate,
    bottomLineAnimate,
    topLineScope,
    bottomLineScope,
    navScope,
    navAnimate,
  ]);

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const langMenu = document.getElementById("language-menu");
      const langButton = document.getElementById("language-button");

      if (
        langMenu &&
        langButton &&
        !langMenu.contains(target) &&
        !langButton.contains(target)
      ) {
        setLangMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside as unknown as EventListener);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside as unknown as EventListener);
    };
  }, []);

  const handleClickMobileNavItem = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsOpen(false);
    const url = new URL(e.currentTarget.href);
    if (url.hash) {
      const target = document.querySelector(url.hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = url.pathname;
    }
  };

  const changeLanguage = (locale: string) => {
    // Get the pathname without the locale prefix
    let newPathname = pathname;
    const segments = pathname.split("/");

    // Check if the first segment after / is a locale
    if (
      segments.length > 1 &&
      languages.some((lang) => lang.code === segments[1])
    ) {
      // Remove the current locale from the path
      segments.splice(1, 1);
      newPathname = segments.join("/") || "/";
    }

    // Ensure path starts with /
    if (!newPathname.startsWith("/")) {
      newPathname = `/${newPathname}`;
    }

    // Build the new path with the selected locale
    const newPath = `/${locale}${newPathname === "/" ? "" : newPathname}`;

    // Navigate to the new path
    router.push(newPath);
    setLangMenuOpen(false);
  };

  // Get current language display info
  const currentLanguage =
    languages.find((lang) => lang.code === currentLocale) || languages[0];

  return (
    <header>
      <div
        ref={navScope}
        className="fixed top-0 left-0 w-full h-0 overflow-hidden bg-stone-900 z-10"
      >
        <nav className="mt-20 flex flex-col  ">
          {navItems.map(({ href, label }) => (
            <Link
              href={href}
              className="text-stone-200 group/nav-item relative isolate  py-8 border-t border-stone-800 last:border-b"
              key={label}
              onClick={handleClickMobileNavItem}
            >
              <div className="container !max-w-full flex items-center justify-between">
                <span className="text-3xl group-hover/nav-item:pl-4 transition-all duration-500">
                  {label}
                </span>
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
              <div className="absolute w-full h-0 bg-stone-800 group-hover/nav-item:h-full transition-all duration-500 bottom-0 -z-10"></div>
            </Link>
          ))}
        </nav>
      </div>
      <div className="fixed top-0 z-10 left-0 w-full mix-blend-difference backdrop-blur-md">
        <div className="container !max-w-full">
          <div className="flex justify-between h-20 items-center">
            <div>
              <a href="/">
                <span className="text-xl font-bold text-white uppercase">
                  Ilham akbar
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed z-10 top-0 left-0 w-full">
        <div className="container !max-w-full">
          <div className="flex justify-end h-20 items-center">
            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              <div className="relative">
                <motion.button
                  id="language-button"
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="inline-flex items-center justify-center gap-1 px-3 py-2 text-sm bg-stone-200 border border-stone-400 rounded-full hover:bg-stone-300 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg mr-1">{currentLanguage.flag}</span>
                  <span className="hidden sm:inline">
                    {currentLanguage.name}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-4 h-4 transition-transform duration-200 ${langMenuOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </motion.button>

                {/* Language Menu */}
                {langMenuOpen && (
                  <motion.div
                    id="language-menu"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-1 z-20"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full text-left px-4 py-2 hover:bg-stone-100 transition-colors flex items-center ${
                          currentLocale === lang.code
                            ? "bg-stone-50 text-red-orange-500 font-medium"
                            : ""
                        }`}
                      >
                        <span className="text-lg mr-2">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Menu Toggle Button */}
              <div
                onClick={() => setIsOpen((prev) => !prev)}
                className="size-11 border border-stone-400 bg-stone-200 rounded-full inline-flex justify-center items-center"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.rect
                    x="3"
                    y="7"
                    width="18"
                    height="2"
                    fill="currentColor"
                    ref={topLineScope}
                    style={{
                      transformOrigin: "12px 8px",
                    }}
                  />
                  <motion.rect
                    x="3"
                    y="15"
                    width="18"
                    height="2"
                    fill="currentColor"
                    ref={bottomLineScope}
                    style={{
                      transformOrigin: "12px 16px",
                    }}
                  />
                </svg>
              </div>

              {/* Contact Button */}
              <Button className="hidden md:inline-flex" variant="primary">
                Contact me
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
