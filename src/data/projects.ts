import { StaticImageData } from "next/image";
import project1 from "@/assets/images/project-1.jpg"; // Add your project images
import project2 from "@/assets/images/project-2.jpg";
import project3 from "@/assets/images/project-3.jpg";

// You'll need to add these images to your assets folder

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  image: StaticImageData;
  detailImages?: StaticImageData[];
  technologies: string[];
  client: string;
  year: string;
  role: string;
  liveURL: string;
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Craft Coffee Co. Website Redesign",
    slug: "craft-coffee-website",
    description:
      "A complete redesign of the Craft Coffee Co. website to improve user experience and showcase their premium coffee products with an elegant, modern interface.",
    category: "Web Design",
    image: project1,
    detailImages: [project2, project3],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    client: "Craft Coffee Co.",
    year: "2023",
    role: "Lead Developer & Designer",
    liveURL: "https://example.com",
  },
  {
    id: 2,
    title: "Pixel Perfect Design System",
    slug: "pixel-perfect-design-system",
    description:
      "Created a comprehensive design system for Pixel Perfect, enabling their team to build consistent interfaces across all their digital products.",
    category: "Design System",
    image: project2,
    technologies: ["Figma", "React", "Storybook", "SCSS"],
    client: "Pixel Perfect",
    year: "2023",
    role: "UI/UX Designer",
    liveURL: "https://example.com",
  },
  {
    id: 3,
    title: "Studio Minimal E-commerce Platform",
    slug: "studio-minimal-ecommerce",
    description:
      "Built a custom e-commerce platform for Studio Minimal, focusing on minimal aesthetics, high performance, and seamless checkout experience.",
    category: "E-commerce",
    image: project3,
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    client: "Studio Minimal",
    year: "2022",
    role: "Full Stack Developer",
    liveURL: "https://example.com",
  },
];