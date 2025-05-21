// import { getAllPosts } from "@/lib/api";
"use client";

import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import Header from "@/sections/Header";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { motion } from "motion/react";
import { internalGroqTypeReferenceTo, Post } from "../../../sanity.types";

// Function to format dates
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

// Loading skeleton component
const PostSkeleton = () => (
  <div className="border-t border-stone-200 pt-8">
    <div className="grid md:grid-cols-12 gap-8">
      <div className="md:col-span-4">
        <div className="aspect-[4/3] bg-stone-200 rounded-md animate-pulse"></div>
      </div>
      <div className="md:col-span-8">
        <div className="w-24 h-5 bg-stone-200 rounded mb-3 animate-pulse"></div>
        <div className="w-3/4 h-8 bg-stone-200 rounded mb-4 animate-pulse"></div>
        <div className="w-48 h-5 bg-stone-200 rounded mb-4 animate-pulse"></div>
        <div className="w-full h-16 bg-stone-200 rounded mb-4 animate-pulse"></div>
        <div className="w-32 h-8 bg-stone-200 rounded animate-pulse"></div>
      </div>
    </div>
  </div>
);

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      "mainImage": mainImage.asset->url,
      "categories": categories[]->{"title": title, _id},
      "author": author->name
    }`;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await client.fetch(query);
        setPosts(await response);
        setLoading(false);
      } catch (error) {
        console.log("Post Fetching error", error);
        // setError(error);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      <Header />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-32 pb-20"
      >
        <div className="container">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl mb-12 font-light"
          >
            Blog
          </motion.h1>

          {loading ? (
            <div className="grid gap-12 md:gap-16">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <PostSkeleton />
                </motion.div>
              ))}
            </div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 border border-red-200 rounded-lg p-8 text-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-red-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <h2 className="text-xl font-medium text-red-700 mb-2">
                Unable to load blog posts
              </h2>
              <p className="text-red-600">
                There was a problem loading the blog posts. Please try again
                later.
              </p>
              <button
                className="mt-6 px-5 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </motion.div>
          ) : posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-stone-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <h2 className="text-2xl font-light text-stone-600 mb-2">
                No blog posts found
              </h2>
              <p className="text-stone-500 max-w-md mx-auto">
                Check back later for new content or try refreshing the page.
              </p>
            </motion.div>
          ) : (
            <div className="grid gap-12 md:gap-16">
              {posts.map((post: Post, index) => (
                <motion.article
                  key={post._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="border-t border-stone-200 pt-8 group"
                >
                  <div className="grid md:grid-cols-12 gap-8">
                    {post.mainImage && (
                      <div className="md:col-span-4 overflow-hidden rounded-lg shadow-sm">
                        <Link
                          href={`/blog/${post?.slug}`}
                          className="block aspect-[4/3] overflow-hidden"
                        >
                          <Image
                            src={urlFor(post?.mainImage).url() || ""}
                            alt={post?.title || ""}
                            width={400}
                            height={300}
                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                          />
                        </Link>
                      </div>
                    )}

                    <div
                      className={
                        post?.mainImage ? "md:col-span-8" : "md:col-span-12"
                      }
                    >
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.categories?.map((category) => (
                          <span
                            key={category._key}
                            className="text-xs  py-1  uppercase tracking-wider text-blue-600"
                          >
                            {category.title}
                          </span>
                        ))}
                      </div>

                      <h2 className="text-2xl md:text-3xl font-light mb-3 transition-colors">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="hover:text-blue-500"
                        >
                          {post.title}
                        </Link>
                      </h2>

                      <div className="flex items-center text-sm text-stone-500 mb-4">
                        <span>{post.author?.[internalGroqTypeReferenceTo]|| "Ilham Akbar"}</span>
                        <span className="mx-2">•</span>
                        <time dateTime={post?.publishedAt}>
                          {formatDate(
                            post?.publishedAt || new Date().toISOString(),
                          )}
                        </time>
                      </div>

                      {/* {post.excerpt && (
                        <p className="text-stone-700 mb-4">{post.excerpt}</p>
                      )} */}

                      <div className="mt-5">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center text-blue-500 hover:text-blue-700 transition-colors group-hover:underline"
                        >
                          Read more
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5 ml-1 transform transition-transform group-hover:translate-x-1"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </motion.main>
    </>
  );
}
