"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

// Define content categories and subcategories
const categories = [
  {
    id: "nutrition",
    name: "Nutrition",
    description: "Learn about healthy eating habits and dietary recommendations",
    subcategories: [
      { id: "meal-planning", name: "Meal Planning" },
      { id: "healthy-recipes", name: "Healthy Recipes" },
      { id: "dietary-supplements", name: "Dietary Supplements" },
      { id: "nutrition-science", name: "Nutrition Science" },
    ],
  },
  {
    id: "fitness",
    name: "Fitness",
    description: "Exercise routines and physical activity recommendations",
    subcategories: [
      { id: "workouts", name: "Workouts" },
      { id: "cardio", name: "Cardio" },
      { id: "strength-training", name: "Strength Training" },
      { id: "flexibility", name: "Flexibility & Mobility" },
    ],
  },
  {
    id: "mental-health",
    name: "Mental Health",
    description: "Resources for mental wellbeing and stress management",
    subcategories: [
      { id: "stress-management", name: "Stress Management" },
      { id: "mindfulness", name: "Mindfulness & Meditation" },
      { id: "sleep", name: "Sleep Hygiene" },
      { id: "emotional-wellness", name: "Emotional Wellness" },
    ],
  },
  {
    id: "weight-management",
    name: "Weight Management",
    description: "Strategies for healthy weight loss and maintenance",
    subcategories: [
      { id: "weight-loss", name: "Weight Loss" },
      { id: "metabolism", name: "Metabolism" },
      { id: "body-composition", name: "Body Composition" },
      { id: "sustainable-habits", name: "Sustainable Habits" },
    ],
  },
]

// Sample content items
const contentItems = [
  {
    id: "1",
    title: "Understanding Macronutrients",
    description: "A comprehensive guide to proteins, carbs, and fats in your diet",
    category: "nutrition",
    subcategory: "nutrition-science",
    type: "photo-blog",
    readTime: "10 min",
    featured: true,
  },
  {
    id: "2",
    title: "15-Minute Home Workout",
    description: "Quick effective exercises you can do without equipment",
    category: "fitness",
    subcategory: "workouts",
    type: "video-blog",
    readTime: "5 min",
    featured: true,
  },
  {
    id: "3",
    title: "Mindfulness Meditation Guide",
    description: "Simple techniques to practice mindfulness in your daily life",
    category: "mental-health",
    subcategory: "mindfulness",
    type: "photo-blog",
    readTime: "7 min",
    featured: true,
  },
  {
    id: "4",
    title: "Meal Prep for Beginners",
    description: "How to prepare healthy meals for the entire week",
    category: "nutrition",
    subcategory: "meal-planning",
    type: "photo-blog",
    readTime: "12 min",
  },
  {
    id: "5",
    title: "Cardio vs. Strength Training",
    description: "Understanding the benefits of different exercise types",
    category: "fitness",
    subcategory: "cardio",
    type: "photo-blog",
    readTime: "8 min",
  },
  {
    id: "6",
    title: "Improving Sleep Quality",
    description: "Tips for better sleep and improved health",
    category: "mental-health",
    subcategory: "sleep",
    type: "video-blog",
    readTime: "9 min",
  },
  {
    id: "7",
    title: "Healthy Breakfast Ideas",
    description: "Start your day with these nutritious breakfast options",
    category: "nutrition",
    subcategory: "healthy-recipes",
    type: "photo-blog",
    readTime: "6 min",
  },
  {
    id: "8",
    title: "Strength Training Basics",
    description: "Essential exercises for building muscle and strength",
    category: "fitness",
    subcategory: "strength-training",
    type: "video-blog",
    readTime: "15 min",
  },
  {
    id: "9",
    title: "Managing Stress Through Exercise",
    description: "How physical activity can reduce stress and anxiety",
    category: "mental-health",
    subcategory: "stress-management",
    type: "photo-blog",
    readTime: "8 min",
  },
  {
    id: "10",
    title: "Understanding Metabolism",
    description: "How your metabolism affects weight management",
    category: "weight-management",
    subcategory: "metabolism",
    type: "photo-blog",
    readTime: "11 min",
    featured: true,
  },
]

export function ContentCategories() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the new content page
    router.push("/content")
  }, [router])

  const [activeCategory, setActiveCategory] = useState("all")
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null)

  // Filter content based on active category and subcategory
  const filteredContent = contentItems.filter((item) => {
    if (activeCategory === "all") return true
    if (activeSubcategory) {
      return item.category === activeCategory && item.subcategory === activeSubcategory
    }
    return item.category === activeCategory
  })

  // Get featured content
  // const featuredContent = contentItems.filter((item) => item.featured)

  return (
    <div className="space-y-6">
      {/* Featured Content */}
      {/* {activeCategory === "all" && !activeSubcategory && (
        <Card>
          <CardHeader>
            <CardTitle>Featured Content</CardTitle>
            <CardDescription>Recommended articles and videos for your health journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featuredContent.map((content) => (
                <Link key={content.id} href={`/dashboard/content/${content.category}/${content.id}`}>
                  <div className="overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md card-hover">
                    <div className="aspect-video w-full bg-muted/60"></div>
                    <div className="p-4">
                      <h3 className="line-clamp-1 text-lg font-semibold">{content.title}</h3>
                      <p className="line-clamp-2 text-sm text-muted-foreground mt-1">{content.description}</p>
                      <div className="mt-2 flex items-center text-xs text-muted-foreground">
                        <span className="rounded-full bg-outlive-green-200 px-2 py-0.5 text-outlive-green-600 dark:bg-outlive-green-900/40 dark:text-outlive-green-300">
                          {content.type === "video-blog" ? "Video" : "Article"}
                        </span>
                        <span className="ml-auto">{content.readTime} read</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )} */}

      {/* Categories and Content */}
      <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <Link href="/dashboard/content/blog">
            <Button variant="outline" className="flex items-center gap-1">
              View all
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* All Content Tab */}
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {contentItems.map((content) => (
              <Link key={content.id} href={`/dashboard/content/${content.category}/${content.id}`}>
                <div className="overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md card-hover">
                  <div className="aspect-video w-full bg-muted/60"></div>
                  <div className="p-4">
                    <h3 className="line-clamp-1 text-lg font-semibold">{content.title}</h3>
                    <p className="line-clamp-2 text-sm text-muted-foreground mt-1">{content.description}</p>
                    <div className="mt-2 flex items-center text-xs text-muted-foreground">
                      <span className="rounded-full bg-outlive-green-200 px-2 py-0.5 text-outlive-green-600 dark:bg-outlive-green-900/40 dark:text-outlive-green-300">
                        {content.type === "video-blog" ? "Video" : "Article"}
                      </span>
                      <span className="ml-auto">{content.readTime} read</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </TabsContent>

        {/* Category-specific Tabs */}
        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            {/* Subcategory Selection */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Button
                variant={activeSubcategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveSubcategory(null)}
                className={activeSubcategory === null ? "bg-outlive-green-400 hover:bg-outlive-green-500" : ""}
              >
                All {category.name}
              </Button>
              {category.subcategories.map((subcategory) => (
                <Button
                  key={subcategory.id}
                  variant={activeSubcategory === subcategory.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveSubcategory(subcategory.id)}
                  className={
                    activeSubcategory === subcategory.id ? "bg-outlive-green-400 hover:bg-outlive-green-500" : ""
                  }
                >
                  {subcategory.name}
                </Button>
              ))}
            </div>

            {/* Content Grid */}
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredContent.map((content) => (
                <Link key={content.id} href={`/dashboard/content/${content.category}/${content.id}`}>
                  <div className="overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md card-hover">
                    <div className="aspect-video w-full bg-muted/60"></div>
                    <div className="p-4">
                      <h3 className="line-clamp-1 text-lg font-semibold">{content.title}</h3>
                      <p className="line-clamp-2 text-sm text-muted-foreground mt-1">{content.description}</p>
                      <div className="mt-2 flex items-center text-xs text-muted-foreground">
                        <span className="rounded-full bg-outlive-green-200 px-2 py-0.5 text-outlive-green-600 dark:bg-outlive-green-900/40 dark:text-outlive-green-300">
                          {content.type === "video-blog" ? "Video" : "Article"}
                        </span>
                        <span className="ml-auto">{content.readTime} read</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
