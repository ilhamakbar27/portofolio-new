
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

// Function to format dates
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

const BlogPreview: FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = `*[_type == "post"] | order(publishedAt desc)[0...3] {
          _id,
          title,
          "slug": slug.current,
          publishedAt,
          "mainImage": mainImage.asset->url,
          "categories": categories[]->title
        }`;

        const response = await client.fetch(query);
        setPosts(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="pb-32">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24">
          <h2 ref={titleRef} className="text-4xl md:text-7xl lg:text-8xl">
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 50,
              }}
              transition={{ duration: 0.8 }}
            >
              From the Blog
            </motion.span>
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isInView ? 1 : 0,
              y: isInView ? 0 : 20,
            }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/blog"
              className="group inline-flex items-center text-xl"
            >
              <span className="mr-2 relative">
                View all posts
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-stone-200 rounded-lg mb-4"></div>
                <div className="w-24 h-4 bg-stone-200 rounded mb-3"></div>
                <div className="w-full h-6 bg-stone-200 rounded mb-3"></div>
                <div className="w-32 h-4 bg-stone-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-x-8 gap-y-12">
            {posts.map((post, index) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="aspect-[4/3] overflow-hidden rounded-lg mb-4 relative">
                    {post.mainImage ? (
                      <Image
                        src={urlFor(post.mainImage)
                          .width(600)
                          .height(450)
                          .url()}
                        alt={post.title}
                        width={600}
                        height={450}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-stone-200 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1"
                          stroke="currentColor"
                          className="w-12 h-12 text-stone-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div>
                    {post.categories && post.categories.length > 0 && (
                      <div className="mb-2">
                        <span className="text-sm text-blue-600 uppercase tracking-wider">
                          {post.categories[0]}
                        </span>
                      </div>
                    )}

                    <h3 className="text-xl font-medium mb-2 group-hover:text-red-orange-500 transition-colors">
                      {post.title}
                    </h3>

                    <time
                      className="text-sm text-stone-500"
                      dateTime={post.publishedAt}
                    >
                      {formatDate(post.publishedAt || new Date().toISOString())}
                    </time>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}

        {!loading && posts.length === 0 && (
          <div className="text-center py-16">
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
            <h3 className="text-2xl font-light text-stone-600 mb-2">
              No blog posts yet
            </h3>
            <p className="text-stone-500 max-w-md mx-auto">
              Blog posts will appear here once they&apos;re published.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPreview;
