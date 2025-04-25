"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function BlogClientPage() {
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
      excerpt:
        "Sleep is essential for physical and mental health. This article explores the science behind sleep cycles and provides practical tips for improving your sleep quality.",
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
      excerpt:
        "With so much conflicting nutrition information available, it can be hard to know what to believe. This article examines common nutrition myths and provides evidence-based facts.",
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
      excerpt:
        "Developing healthy habits is key to long-term wellness. Learn science-backed strategies for creating and maintaining positive health routines that stick.",
    },
    {
      id: 104,
      title: "Understanding Heart Health",
      description: "Key factors that affect your cardiovascular system",
      category: "wellness",
      readTime: "10 min",
      image: "/healthy-heart-lifestyle.png",
      slug: "understanding-heart-health",
      date: "July 5, 2023",
      excerpt:
        "Your heart health affects every aspect of your wellbeing. This comprehensive guide explains the key factors that influence your cardiovascular system and how to keep it healthy.",
    },
    {
      id: 105,
      title: "Mindful Eating Practices",
      description: "Developing a healthier relationship with food",
      category: "nutrition",
      readTime: "8 min",
      image: "/mindful-meal.png",
      slug: "mindful-eating-practices",
      date: "July 22, 2023",
      excerpt:
        "Mindful eating can transform your relationship with food. Discover practical techniques to become more aware of your eating habits and make healthier choices.",
    },
    {
      id: 106,
      title: "The Benefits of Strength Training",
      description: "Why everyone should incorporate resistance training",
      category: "fitness",
      readTime: "9 min",
      image: "/diverse-strength-training.png",
      slug: "benefits-of-strength-training",
      date: "August 10, 2023",
      excerpt:
        "Strength training isn't just for bodybuilders. Learn why resistance training is essential for everyone, regardless of age or fitness level, and how to get started safely.",
    },
  ]

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
    <div>
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/dashboard/content">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Content
          </Link>
        </Button>
        <h1 className="text-3xl font-bold mb-2 text-premium-dark dark:text-white">Blog Articles</h1>
        <p className="text-muted-foreground">Latest health and wellness insights from our experts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post, i) => (
          <div
            key={post.id}
            className="rounded-xl border overflow-hidden hover:shadow-md bg-white dark:bg-gray-800 dark:border-gray-700"
          >
            <Link href={`/dashboard/content/blog/${post.id}`} className="block h-full">
              <div className="aspect-video w-full bg-muted">
                <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs px-3 py-1 rounded-full"
                    style={{
                      backgroundColor:
                        post.category === "wellness"
                          ? "#C4D4A5"
                          : post.category === "nutrition"
                            ? "#FFD493"
                            : post.category === "fitness"
                              ? "#A5C4D4"
                              : "#E0E0E0",
                      color: "#005551",
                    }}
                  >
                    {getCategoryName(post.category)}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{post.date}</span>
                </div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{post.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{post.excerpt}</p>
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
  )
}
