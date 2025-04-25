"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

// Define content categories
const categories = [
  { id: "all", name: "All Content" },
  { id: "nutrition", name: "Nutrition" },
  { id: "fitness", name: "Fitness" },
  { id: "mental-health", name: "Mental Health" },
  { id: "weight-management", name: "Weight Management" },
]

// Sample content items
const contentItems = [
  {
    id: "1",
    title: "Understanding Macronutrients",
    description: "A comprehensive guide to proteins, carbs, and fats in your diet",
    category: "nutrition",
    type: "article",
    readTime: "10 min",
    image: "/vibrant-healthy-spread.png",
    featured: true,
  },
  {
    id: "2",
    title: "15-Minute Home Workout",
    description: "Quick effective exercises you can do without equipment",
    category: "fitness",
    type: "video",
    readTime: "5 min",
    image: "/diverse-fitness-group.png",
    featured: true,
  },
  {
    id: "3",
    title: "Mindfulness Meditation Guide",
    description: "Simple techniques to practice mindfulness in your daily life",
    category: "mental-health",
    type: "article",
    readTime: "7 min",
    image: "/serene-meditation.png",
    featured: true,
  },
  {
    id: "4",
    title: "Meal Prep for Beginners",
    description: "How to prepare healthy meals for the entire week",
    category: "nutrition",
    type: "article",
    readTime: "12 min",
    image: "/colorful-meal-prep.png",
  },
  {
    id: "5",
    title: "Cardio vs. Strength Training",
    description: "Understanding the benefits of different exercise types",
    category: "fitness",
    type: "article",
    readTime: "8 min",
    image: "/diverse-strength-training.png",
  },
  {
    id: "6",
    title: "Improving Sleep Quality",
    description: "Tips for better sleep and improved health",
    category: "mental-health",
    type: "video",
    readTime: "9 min",
    image: "/restful-night.png",
  },
  {
    id: "7",
    title: "Healthy Breakfast Ideas",
    description: "Start your day with these nutritious breakfast options",
    category: "nutrition",
    type: "article",
    readTime: "6 min",
    image: "/vibrant-breakfast-spread.png",
  },
  {
    id: "8",
    title: "Strength Training Basics",
    description: "Essential exercises for building muscle and strength",
    category: "fitness",
    type: "video",
    readTime: "15 min",
    image: "/diverse-strength-training.png",
  },
]

export function DashboardContentPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  // Filter content based on active category
  const filteredContent =
    activeCategory === "all" ? contentItems : contentItems.filter((item) => item.category === activeCategory)

  // Get featured content
  const featuredContent = contentItems.filter((item) => item.featured)

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Health & Wellness Content</h1>
        <p className="text-muted-foreground">Educational resources to support your health journey</p>
      </div>

      {/* Category Navigation */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="outline"
            onClick={() => setActiveCategory(category.id)}
            className={
              activeCategory === category.id
                ? "bg-white border-2 border-outlive-green-600 text-outlive-green-600 font-medium shadow-sm text-gray-700"
                : "bg-white border border-gray-200 text-gray-700 hover:border-outlive-green-400 hover:text-outlive-green-500 hover:bg-outlive-green-50 transition-colors"
            }
          >
            {category.name}
            {activeCategory === category.id && (
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-outlive-green-600 rounded-full" />
            )}
          </Button>
        ))}
      </div>

      {/* Featured Content */}
      {activeCategory === "all" && (
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Content</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredContent.map((content) => (
              <Link key={content.id} href={`/dashboard/content/${content.id}`} className="block h-full">
                <Card className="overflow-hidden h-full hover:shadow-md transition-all bg-white dark:bg-gray-800">
                  <div className="aspect-video w-full bg-muted">
                    <img
                      src={content.image || "/placeholder.svg"}
                      alt={content.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-5">
                    <h3 className="text-lg font-semibold mb-2">{content.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{content.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-outlive-green-200 px-2 py-0.5 text-xs text-outlive-green-600 dark:bg-outlive-green-900/40 dark:text-outlive-green-300">
                        {content.type === "video" ? "Video" : "Article"}
                      </span>
                      <span className="text-xs text-muted-foreground">{content.readTime} read</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Content Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6">
          {activeCategory === "all" ? "All Content" : categories.find((c) => c.id === activeCategory)?.name}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredContent.map((content) => (
            <Link key={content.id} href={`/dashboard/content/${content.id}`} className="block h-full">
              <Card className="overflow-hidden h-full hover:shadow-md transition-all bg-white dark:bg-gray-800">
                <div className="aspect-video w-full bg-muted">
                  <img
                    src={content.image || "/placeholder.svg"}
                    alt={content.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="text-lg font-semibold mb-2">{content.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{content.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-outlive-green-200 px-2 py-0.5 text-xs text-outlive-green-600 dark:bg-outlive-green-900/40 dark:text-outlive-green-300">
                      {content.type === "video" ? "Video" : "Article"}
                    </span>
                    <span className="text-xs text-muted-foreground">{content.readTime} read</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Blog Link */}
      <div className="flex justify-center mt-12">
        <Link href="/dashboard/content/blog">
          <Button className="bg-outlive-green-400 hover:bg-outlive-green-500">
            View All Blog Posts
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
