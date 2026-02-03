"use client";
// import { useParams, Link } from "react-";
import { motion } from "motion/react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ReadingProgressBar from "@/components/_components/readingProgress";
import { getBlogPostBySlug, blogPosts } from "@/data/blogPosts";
import { Badge } from "@/components/ui/badge";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(slug || "");

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl font-bold text-foreground mb-4">
              Article Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The article you&apos;re looking for doesn&apos;t exist.
            </p>
            <Button asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // Get related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  // Convert markdown-like content to HTML-safe paragraphs
  const renderContent = (content: string) => {
    const lines = content.trim().split("\n");
    const elements: any = [];
    let currentList: string[] = [];
    let listType: "ul" | "ol" | null = null;

    const flushList = () => {
      if (currentList.length > 0 && listType) {
        const ListTag = listType;
        elements.push(
          <ListTag
            key={elements.length}
            className={`${listType === "ol" ? "list-decimal" : "list-disc"} list-inside space-y-2 my-4 text-muted-foreground`}
          >
            {currentList.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ListTag>,
        );
        currentList = [];
        listType = null;
      }
    };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      if (!trimmedLine) {
        flushList();
        return;
      }

      // H2 headers
      if (trimmedLine.startsWith("## ")) {
        flushList();
        elements.push(
          <h2
            key={index}
            className="font-display text-2xl font-bold text-foreground mt-10 mb-4"
          >
            {trimmedLine.replace("## ", "")}
          </h2>,
        );
        return;
      }

      // H3 headers
      if (trimmedLine.startsWith("### ")) {
        flushList();
        elements.push(
          <h3
            key={index}
            className="font-display text-xl font-semibold text-foreground mt-8 mb-3"
          >
            {trimmedLine.replace("### ", "")}
          </h3>,
        );
        return;
      }

      // Bold text paragraphs
      if (trimmedLine.startsWith("**") && trimmedLine.includes("**:")) {
        flushList();
        const [boldPart, ...rest] = trimmedLine.split("**:");
        const boldText = boldPart?.replace("**", "");
        elements.push(
          <p key={index} className="text-muted-foreground leading-relaxed my-4">
            <strong className="text-foreground">{boldText}:</strong>
            {rest.join("**:")}
          </p>,
        );
        return;
      }

      // Unordered list items
      if (trimmedLine.startsWith("- ")) {
        if (listType !== "ul") {
          flushList();
          listType = "ul";
        }
        currentList.push(trimmedLine.replace("- ", "").replace(/\*\*/g, ""));
        return;
      }

      // Ordered list items
      if (/^\d+\.\s/.test(trimmedLine)) {
        if (listType !== "ol") {
          flushList();
          listType = "ol";
        }
        currentList.push(
          trimmedLine.replace(/^\d+\.\s/, "").replace(/\*\*/g, ""),
        );
        return;
      }

      // Regular paragraphs
      flushList();
      elements.push(
        <p key={index} className="text-muted-foreground leading-relaxed my-4">
          {trimmedLine.replace(/\*\*/g, "")}
        </p>,
      );
    });

    flushList();
    return elements;
  };

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgressBar />

      <main className="pt-20 lg:pt-24">
        {/* Hero Image */}
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        {/* Article Content */}
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back Button */}
            <Link
              href="/#blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Articles
            </Link>

            {/* Category Badge */}
            <Badge className="mb-4">{post.category}</Badge>

            {/* Title */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
              <Button variant="ghost" size="sm" className="ml-auto">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-4 p-4 bg-card rounded-xl mb-10">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{post.author}</p>
                <p className="text-sm text-muted-foreground">
                  {post.authorBio}
                </p>
              </div>
            </div>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              {renderContent(post.content)}
            </div>

            {/* Tags/Share Section */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Thanks for reading!
                  </span>
                </div>
                <Button variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Article
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <motion.section
              className="max-w-5xl mx-auto mt-20 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-display text-2xl font-bold text-foreground mb-8">
                Related Articles
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="group"
                  >
                    <article className="bg-card rounded-xl overflow-hidden card-shadow hover:card-shadow-hover transition-all">
                      <div className="relative overflow-hidden">
                        <img
                          src={relatedPost.image.replace(
                            "w=1200&h=600",
                            "w=400&h=250",
                          )}
                          alt={relatedPost.title}
                          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          {relatedPost.readTime}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}
        </article>
      </main>
    </div>
  );
};

export default BlogPost;
