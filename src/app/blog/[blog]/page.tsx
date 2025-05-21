"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/sections/Header";
import { motion } from "motion/react";

// Function to format dates
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

// Components for PortableText
const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative w-full my-8 aspect-video">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || " "}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover rounded-lg"
          />
        </div>
      );
    },
  },
};

// Loading skeleton component
const PostSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-10 w-3/4 bg-stone-200 rounded mb-6"></div>
    <div className="h-5 w-48 bg-stone-200 rounded mb-12"></div>

    <div className="h-[300px] w-full bg-stone-200 rounded-lg mb-10"></div>

    <div className="space-y-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-4 bg-stone-200 rounded w-full"></div>
      ))}
      <div className="h-4 bg-stone-200 rounded w-2/3"></div>
    </div>
  </div>
);

export default function BlogPage() {
  const params = useParams<{ blog: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        // Query to fetch the blog post with all necessary data
        const query = `*[_type == "post" && slug.current == $slug][0]{
          _id,
          title,
          "slug": slug.current,
          publishedAt,
          excerpt,
          body,
          mainImage{
            "url": asset->url,
            alt
          },
          "categories": categories[]->{ _id, title },
          "author": author->{
            name,
            "image": image.asset->url,
            bio
          }
        }`;
        const data = await client.fetch(query, { slug: params.blog });

        if (!data) {
          throw new Error("Post not found");
        }

        setPost(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blog post:", err);
        setError(err instanceof Error ? err : new Error("Failed to load post"));
        setLoading(false);
      }
    };

    if (params.blog) {
      fetchPost();
    }
  }, [params.blog]);

  if (error) {
    return (
      <>
        <Header />
        <div className="container pt-40 pb-20">
          <div className="max-w-3xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
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
                {error.message || "Error loading blog post"}
              </h2>
              <p className="text-red-600 mb-6">
                We couldn&apos;t find the blog post you were looking for.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center px-5 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to blog
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-32 pb-20"
      >
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {loading ? (
              <PostSkeleton />
            ) : (
              <motion.article
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Link
                  href="/blog"
                  className="inline-flex items-center text-base mb-10 hover:text-blue-500 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                  </svg>
                  Back to blog
                </Link>

                <header className="mb-8">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post?.categories?.map((category: any) => (
                      <span
                        key={category._id}
                        className="text-xs   uppercase tracking-wider text-blue-600"
                      >
                        {category.title}
                      </span>
                    ))}
                  </div>

                  <h1 className="text-4xl md:text-5xl font-light mb-6">
                    {post?.title}
                  </h1>

                  <div className="flex items-center mb-8">
                    <div className="flex items-center">
                      {post?.author?.image && (
                        <Image
                          src={post.author.image}
                          alt={post.author.name}
                          width={40}
                          height={40}
                          className="rounded-full mr-3"
                        />
                      )}
                      <div>
                        <p className="font-medium">
                          {post?.author?.name || "Unknown Author"}
                        </p>
                        <time
                          dateTime={post?.publishedAt || ""}
                          className="text-sm text-stone-500"
                        >
                          {post?.publishedAt
                            ? formatDate(post.publishedAt)
                            : "No date"}
                        </time>
                      </div>
                    </div>
                  </div>
                </header>

                {post?.mainImage?.url && (
                  <div className="mb-12">
                    <Image
                      src={post.mainImage.url}
                      alt={post.mainImage.alt || post.title || ""}
                      width={1200}
                      height={630}
                      className="rounded-lg w-full"
                    />
                  </div>
                )}

                <div
                  className="prose prose-xl max-w-none 
                prose-headings:font-medium
                prose-h1:text-5xl prose-h1:leading-tight
                prose-h2:text-4xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-3xl prose-h3:mt-10 prose-h3:mb-4
                prose-h4:text-2xl 
                prose-p:text-xl prose-p:leading-relaxed prose-p:mb-8
                prose-a:text-blue-600 prose-a:no-underline prose-a:border-b prose-a:border-blue-300 hover:prose-a:border-blue-600
                prose-img:rounded-xl prose-img:shadow-lg
                prose-pre:bg-gray-900 prose-pre:p-6 prose-pre:rounded-lg prose-pre:my-8
                prose-code:text-blue-600 prose-code:font-normal
                prose-ul:my-8 prose-li:text-xl prose-li:mb-2
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 
                prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-blockquote:italic
                prose-hr:my-12 prose-hr:border-t-2"
                >
                  {post?.body ? (
                    <PortableText
                      value={post.body}
                      components={{
                        ...ptComponents,
                        block: {
                          normal: ({ children }) => (
                            <p className="mb-8 text-xl leading-relaxed text-stone-800">
                              {children}
                            </p>
                          ),
                          h1: ({ children }) => (
                            <h1 className="mt-16 mb-8 text-5xl font-light text-stone-900 leading-tight">
                              {children}
                            </h1>
                          ),
                          h2: ({ children }) => (
                            <h2 className="mt-12 mb-6 text-4xl font-light text-stone-900">
                              {children}
                            </h2>
                          ),
                          h3: ({ children }) => (
                            <h3 className="mt-10 mb-4 text-3xl font-light text-stone-900">
                              {children}
                            </h3>
                          ),
                          h4: ({ children }) => (
                            <h4 className="mt-8 mb-4 text-2xl font-medium text-stone-900">
                              {children}
                            </h4>
                          ),
                          blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-blue-500 bg-blue-50 px-6 py-4 my-8 rounded-r-lg italic text-stone-800">
                              {children}
                            </blockquote>
                          ),
                          // Support for lists
                          bullet: ({ children }) => (
                            <ul className="list-disc pl-6 my-8 space-y-2 text-xl text-stone-800">
                              {children}
                            </ul>
                          ),
                          number: ({ children }) => (
                            <ol className="list-decimal pl-6 my-8 space-y-2 text-xl text-stone-800">
                              {children}
                            </ol>
                          ),
                        },
                        list: {
                          bullet: ({ children }) => (
                            <ul className="list-disc pl-6 my-8 space-y-2 text-xl text-stone-800">
                              {children}
                            </ul>
                          ),
                          number: ({ children }) => (
                            <ol className="list-decimal pl-6 my-8 space-y-2 text-xl text-stone-800">
                              {children}
                            </ol>
                          ),
                        },
                        listItem: {
                          bullet: ({ children }) => (
                            <li className="mb-2 text-xl">{children}</li>
                          ),
                          number: ({ children }) => (
                            <li className="mb-2 text-xl">{children}</li>
                          ),
                        },
                        marks: {
                          link: ({ children, value }) => (
                            <a
                              href={value?.href}
                              className="text-blue-600 transition-colors duration-200 border-b border-blue-300 hover:border-blue-600"
                              target={
                                value?.href?.startsWith("http")
                                  ? "_blank"
                                  : undefined
                              }
                              rel={
                                value?.href?.startsWith("http")
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                            >
                              {children}
                            </a>
                          ),
                          code: ({ children }) => (
                            <code className="bg-gray-100 rounded px-2 py-1 font-normal text-blue-600">
                              {children}
                            </code>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-semibold text-stone-900">
                              {children}
                            </strong>
                          ),
                          em: ({ children }) => (
                            <em className="italic text-stone-800">
                              {children}
                            </em>
                          ),
                        },
                        types: {
                          ...ptComponents.types,
                          image: ({ value }) => {
                            if (!value?.asset?._ref) {
                              return null;
                            }
                            return (
                              <figure className="my-12">
                                <div className="relative w-full aspect-video overflow-hidden rounded-xl shadow-lg">
                                  <Image
                                    src={urlFor(value)
                                      .width(1200)
                                      .height(675)
                                      .fit("max")
                                      .url()}
                                    alt={value.alt || "Blog post image"}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 1000px"
                                    className="object-cover"
                                    priority={true}
                                  />
                                </div>
                                {value.caption && (
                                  <figcaption className="mt-3 text-center text-base italic text-stone-500">
                                    {value.caption}
                                  </figcaption>
                                )}
                              </figure>
                            );
                          },
                          // Add support for code blocks
                          code: ({ value }) => (
                            <pre className="bg-gray-900 p-6 rounded-lg overflow-x-auto my-8 text-lg">
                              <code className="text-gray-100 font-normal">
                                {value?.code}
                              </code>
                            </pre>
                          ),
                        },
                      }}
                    />
                  ) : (
                    <p className="text-xl text-stone-500 italic text-center py-16">
                      No content available for this post.
                    </p>
                  )}
                </div>
              </motion.article>
            )}
          </div>
        </div>
      </motion.main>
    </>
  );
}
