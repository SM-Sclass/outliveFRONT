"use client"

import Link from "next/link"
import { ContentFilters } from "@/components/dashboard/content/content-filters"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface ContentPageProps {
  searchParams: { category?: string }
}

export default function ContentPageClient({ searchParams }: ContentPageProps) {
  const category = searchParams.category || "all"

  // Sample content data
  const allContent = [
    {
      id: 1,
      title: "10-Minute Morning Workout",
      description: "Start your day with this quick and effective routine",
      category: "fitness",
      readTime: "5 min",
      image: "/diverse-fitness-group.png",
      slug: "10-minute-morning-workout",
    },
    {
      id: 2,
      title: "Mindfulness Meditation Guide",
      description: "Simple techniques to reduce stress and improve focus",
      category: "mental-health",
      readTime: "8 min",
      image: "/serene-meditation.png",
      slug: "mindfulness-meditation-guide",
    },
    {
      id: 3,
      title: "Healthy Weight Loss Habits",
      description: "Sustainable approaches to managing your weight",
      category: "weight-management",
      readTime: "10 min",
      image: "/balanced-lifestyle-journey.png",
      slug: "healthy-weight-loss-habits",
    },
    {
      id: 4,
      title: "Strength Training Basics",
      description: "Build muscle and improve metabolism with these exercises",
      category: "fitness",
      readTime: "7 min",
      image: "/diverse-strength-training.png",
      slug: "strength-training-basics",
    },
    {
      id: 5,
      title: "Managing Anxiety",
      description: "Practical strategies to cope with anxiety in daily life",
      category: "mental-health",
      readTime: "12 min",
      image: "/calm-mind-garden.png",
      slug: "managing-anxiety",
    },
    {
      id: 6,
      title: "Portion Control Tips",
      description: "Simple ways to manage portion sizes for weight control",
      category: "weight-management",
      readTime: "6 min",
      image: "/balanced-meal-portions.png",
      slug: "portion-control-tips",
    },
  ]

  // Blog posts data
  const blogPosts = [
    {
      id: 101,
      title: "The Science of Sleep",
      description: "Understanding sleep cycles and how to improve your rest",
      category: "wellness",
      readTime: "9 min",
      image: "/brain-waves-dreaming.png",
      slug: "science-of-sleep",
      date: "May 15, 2023",
    },
    {
      id: 102,
      title: "Nutrition Myths Debunked",
      description: "Separating fact from fiction in modern nutrition advice",
      category: "nutrition",
      readTime: "11 min",
      image: "/nutrition-label-comparison.png",
      slug: "nutrition-myths-debunked",
      date: "June 2, 2023",
    },
    {
      id: 103,
      title: "Building Healthy Habits",
      description: "How to create and maintain positive health routines",
      category: "lifestyle",
      readTime: "7 min",
      image: "/vibrant-wellness-journey.png",
      slug: "building-healthy-habits",
      date: "June 18, 2023",
    },
  ]

  // Filter content based on selected category
  const filteredContent = category === "all" ? allContent : allContent.filter((item) => item.category === category)

  // Get category name for display
  const getCategoryName = (categoryId: string) => {
    switch (categoryId) {
      case "fitness":
        return "Fitness"
      case "mental-health":
        return "Mental Health"
      case "weight-management":
        return "Weight Management"
      case "wellness":
        return "Wellness"
      case "nutrition":
        return "Nutrition"
      case "lifestyle":
        return "Lifestyle"
      default:
        return "All Content"
    }
  }

  const staggerVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="md:col-span-1">
        <ContentFilters />
      </div>

      <div className="md:col-span-3">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2 text-premium-dark dark:text-white">
            {category === "all" ? "All Health Content" : getCategoryName(category)}
          </h1>
          <p className="text-muted-foreground">{filteredContent.length} articles available</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredContent.map((item, i) => (
            <div
              key={item.id}
              className="rounded-xl border overflow-hidden hover:shadow-md bg-white dark:bg-gray-800 dark:border-gray-700"
            >
              <Link href={`/dashboard/content/${item.id}`} className="block h-full">
                <div className="aspect-video w-full bg-muted">
                  <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs px-3 py-1 rounded-full"
                      style={{
                        backgroundColor:
                          item.category === "fitness"
                            ? "#C4D4A5"
                            : item.category === "mental-health"
                              ? "#FFD493"
                              : "#E0E0E0",
                        color: "#005551",
                      }}
                    >
                      {getCategoryName(item.category)}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{item.readTime} read</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Blog Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-premium-dark dark:text-white">Latest Blog Posts</h2>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/content/blog">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <div
                key={post.id}
                className="rounded-xl border overflow-hidden hover:shadow-md bg-white dark:bg-gray-800 dark:border-gray-700"
              >
                <Link href={`/dashboard/content/blog/${post.id}`} className="block h-full">
                  <div className="aspect-video w-full bg-muted">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-xs px-3 py-1 rounded-full"
                        style={{
                          backgroundColor:
                            post.category === "wellness"
                              ? "#C4D4A5"
                              : post.category === "nutrition"
                                ? "#FFD493"
                                : "#E0E0E0",
                          color: "#005551",
                        }}
                      >
                        {getCategoryName(post.category)}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{post.date}</span>
                    </div>
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{post.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{post.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#005551] dark:text-[#C4D4A5] font-medium">Read article</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{post.readTime} read</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
