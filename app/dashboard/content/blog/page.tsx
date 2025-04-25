import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog - Outlive",
  description: "Health and wellness blog articles",
}

// Blog posts data
const blogPosts = [
  {
    id: "1",
    title: "Understanding Macronutrients",
    description: "A comprehensive guide to proteins, carbs, and fats in your diet",
    category: "Nutrition",
    type: "article",
    readTime: "10 min",
    date: "May 15, 2025",
    author: "Dr. Sarah Johnson",
    image: "/vibrant-healthy-spread.png",
  },
  {
    id: "2",
    title: "15-Minute Home Workout",
    description: "Quick effective exercises you can do without equipment",
    category: "Fitness",
    type: "video",
    readTime: "5 min",
    date: "May 12, 2025",
    author: "Coach David Miller",
    image: "/diverse-fitness-group.png",
  },
  {
    id: "3",
    title: "Mindfulness Meditation Guide",
    description: "Simple techniques to practice mindfulness in your daily life",
    category: "Mental Health",
    type: "article",
    readTime: "7 min",
    date: "June 1, 2025",
    author: "Dr. Emily Chen",
    image: "/serene-meditation.png",
  },
  {
    id: "4",
    title: "The Science of Sleep",
    description: "Understanding sleep cycles and how to improve your rest",
    category: "Wellness",
    type: "article",
    readTime: "9 min",
    date: "June 15, 2025",
    author: "Dr. James Wilson",
    image: "/brain-waves-dreaming.png",
  },
  {
    id: "5",
    title: "Nutrition Myths Debunked",
    description: "Separating fact from fiction in modern nutrition advice",
    category: "Nutrition",
    type: "article",
    readTime: "11 min",
    date: "June 22, 2025",
    author: "Dr. Michael Chen",
    image: "/nutrition-label-comparison.png",
  },
  {
    id: "6",
    title: "Building Healthy Habits",
    description: "How to create and maintain positive health routines",
    category: "Lifestyle",
    type: "article",
    readTime: "7 min",
    date: "July 5, 2025",
    author: "Dr. Lisa Thompson",
    image: "/vibrant-wellness-journey.png",
  },
]

export default function BlogPage() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <Button variant="outline" size="sm" asChild className="mb-4">
          <Link href="/dashboard/content">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Content
          </Link>
        </Button>
        <h1 className="text-3xl font-bold mb-2">Blog Articles</h1>
        <p className="text-muted-foreground">Latest health and wellness insights from our experts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Link key={post.id} href={`/dashboard/content/${post.id}`} className="block h-full">
            <Card className="overflow-hidden h-full hover:shadow-md transition-all bg-white dark:bg-gray-800">
              <div className="aspect-video w-full bg-muted">
                <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded-full bg-outlive-green-200 px-2 py-0.5 text-xs text-outlive-green-600 dark:bg-outlive-green-900/40 dark:text-outlive-green-300">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
                <h3 className="font-semibold mb-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{post.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-outlive-green-600 dark:text-outlive-green-300 font-medium">
                    Read article
                  </span>
                  <span className="text-xs text-muted-foreground">{post.readTime} read</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
