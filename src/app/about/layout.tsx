import type { Metadata } from "next";
import Header from "@/sections/Header";

export const metadata: Metadata = {
  title: "About Ilham Akbar | Creative Frontend Developer",
  description:
    "Ilham Akbar is a creative frontend developer specializing in building beautiful websites with clean code and thoughtful design.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
