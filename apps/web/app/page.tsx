"use client";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, Clock, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { blogPosts } from "@/data/blogPosts";

const updates = [
  {
    id: 1,
    title:
      "Bank of Baroda Technical Recruitment 2026 – 400+ IT Vacancies, Salary Up to ₹1 Lakh | BOB SO 2026",
    category: "Job Post",
    time: "2 hours ago",
    color: "bg-blue-500",
    link: "https://fml8evtv7z.ufs.sh/f/Gu11H2PmlhX6OEYf9HVRpJBMe3jHfzWxUCYThtwm8qVkPu1Q",
  },
];

const Hero = () => {
  const [activeCategory, _setActiveCategory] = useState("All");

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post?.category === activeCategory);
  return (
    <>
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-linear-to-br from-secondary via-background to-muted -z-10" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <motion.div
              className="text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 bg-accent/10 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Sparkles className="w-4 h-4 text-accent" />
                <span>New articles every week</span>
              </motion.div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Unlock Your{" "}
                <span className="text-gradient">Learning Potential</span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8">
                Discover curated study resources, expert insights, and the
                latest educational trends to accelerate your academic journey.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="group">
                  Explore Articles
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline">
                  Browse Categories
                </Button>
              </div>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-border"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                {[
                  { value: "500+", label: "Articles" },
                  { value: "50K+", label: "Readers" },
                  { value: "100+", label: "Topics" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center lg:text-left">
                    <div className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Featured Image/Card */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="relative rounded-2xl overflow-hidden card-shadow">
                <img
                  src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop"
                  alt="Student studying with books and laptop"
                  className="w-full h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    Featured
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-primary-foreground mb-2">
                    Latest Gate updated&apos;s
                  </h3>
                  <p className="text-primary-foreground/80 text-sm">
                    Boost your retention and ace your exams with these proven
                    methods.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section id="updates" className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
                Latest Updates
              </h2>
              <p className="text-muted-foreground">
                Stay informed with the newest study materials
              </p>
            </div>
            <a
              href="#"
              className="flex items-center gap-2 text-primary font-medium mt-4 sm:mt-0 hover:gap-3 transition-all"
            >
              View all updates
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {updates.map((update, index) => (
              <motion.article
                key={update.id}
                className="bg-card rounded-xl p-6 card-shadow hover:card-shadow-hover transition-shadow cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-3 h-3 rounded-full ${update.color} mt-2 shrink-0`}
                  />
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {update.category}
                    </span>
                    <h3 className="font-semibold text-foreground mt-1 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {update.title}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{update.time}</span>
                    </div>
                    <div>
                      <a target="_blank" href={update.link}>Read more</a>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      <section id="blog" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Featured Articles
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our curated collection of study guides, educational
              insights, and learning resources.
            </p>
          </motion.div>

          {/* Category Filter */}
          {/* <motion.div
            className="flex flex-wrap justify-center gap-2 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div> */}

          <div className="text-center text-bold">No Articles</div>
          {/* Blog Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="block bg-card rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image.replace("w=1200&h=600", "w=400&h=250")}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {post.author}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Load More */}
          {/* <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button variant="outline" size="lg" className="group">
              Load More Articles
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div> */}
        </div>
      </section>
    </>
  );
};

export default Hero;
