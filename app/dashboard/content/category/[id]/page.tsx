import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"

export const metadata: Metadata = {
  title: "Content - Early",
  description: "Health and wellness educational content",
}

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
    date: "May 15, 2025",
    author: "Dr. Sarah Johnson",
    content: `
      <h2>What Are Macronutrients?</h2>
      <p>Macronutrients are the nutrients that your body needs in large amounts to function properly. They include proteins, carbohydrates, and fats. Each macronutrient plays a unique role in your body and provides a different amount of energy (calories).</p>
      
      <h3>Proteins</h3>
      <p>Proteins are essential for building and repairing tissues, making enzymes and hormones, and supporting immune function. They are made up of amino acids, which are the building blocks of protein.</p>
      <p>Good sources of protein include:</p>
      <ul>
        <li>Lean meats (chicken, turkey, beef)</li>
        <li>Fish and seafood</li>
        <li>Eggs</li>
        <li>Dairy products (milk, yogurt, cheese)</li>
        <li>Plant-based sources (beans, lentils, tofu, tempeh)</li>
        <li>Nuts and seeds</li>
      </ul>
      
      <h3>Carbohydrates</h3>
      <p>Carbohydrates are your body's primary source of energy. They are broken down into glucose, which is used by your cells for energy.</p>
      <p>There are two main types of carbohydrates:</p>
      <ul>
        <li><strong>Simple carbohydrates:</strong> These are quickly digested and can cause rapid spikes in blood sugar. Examples include sugar, honey, and fruit juice.</li>
        <li><strong>Complex carbohydrates:</strong> These take longer to digest and provide a more sustained release of energy. Examples include whole grains, vegetables, and legumes.</li>
      </ul>
      
      <h3>Fats</h3>
      <p>Fats are essential for hormone production, brain function, and the absorption of fat-soluble vitamins. They also provide insulation and protection for your organs.</p>
      <p>There are several types of fats:</p>
      <ul>
        <li><strong>Unsaturated fats:</strong> These are generally considered healthy and can be found in foods like olive oil, avocados, and nuts.</li>
        <li><strong>Saturated fats:</strong> These are found in animal products and some plant oils. They should be consumed in moderation.</li>
        <li><strong>Trans fats:</strong> These are artificially created fats that are harmful to health and should be avoided.</li>
      </ul>
    `,
  },
  {
    id: "2",
    title: "15-Minute Home Workout",
    description: "Quick effective exercises you can do without equipment",
    category: "fitness",
    subcategory: "workouts",
    type: "video-blog",
    readTime: "5 min",
    date: "May 12, 2025",
    author: "Coach David Miller",
    content: `
      <h2>Quick and Effective Home Exercises</h2>
      <p>This 15-minute workout requires no equipment and can be done in a small space. It's designed to get your heart rate up and work multiple muscle groups efficiently.</p>
      
      <div class="aspect-video w-full bg-muted rounded-lg mb-6 flex items-center justify-center">
        <p class="text-muted-foreground">Video Player</p>
      </div>
      
      <h2>Warm-Up (2 minutes)</h2>
      <ul>
        <li>30 seconds of marching in place</li>
        <li>30 seconds of arm circles</li>
        <li>30 seconds of hip rotations</li>
        <li>30 seconds of light jumping jacks</li>
      </ul>
      
      <h2>Main Workout (12 minutes)</h2>
      <p>Perform each exercise for 45 seconds, followed by 15 seconds of rest. Complete the circuit twice.</p>
      
      <h3>1. Bodyweight Squats</h3>
      <p>Stand with feet shoulder-width apart, lower your body as if sitting in a chair, then return to standing.</p>
      
      <h3>2. Push-Ups (or Modified Push-Ups)</h3>
      <p>Start in a plank position, lower your chest to the floor, then push back up. For a modified version, keep your knees on the ground.</p>
      
      <h3>3. Lunges</h3>
      <p>Step forward with one leg, lowering your hips until both knees are bent at about 90 degrees. Alternate legs.</p>
    `,
  },
]

export default function ContentDetailPage({ params }: { params: { category: string; id: string } }) {
  const content =
    contentItems.find((item) => item.category === params.category && item.id === params.id) || contentItems[0]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/content">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Content
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">{content.title}</h1>
        <div className="flex flex-wrap items-center gap-3 mt-2">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {content.date}
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            {content.author}
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {content.readTime} read
          </div>
          <span className="rounded-full bg-outlive-green-200 px-2 py-0.5 text-xs text-outlive-green-600 dark:bg-outlive-green-900/40 dark:text-outlive-green-300">
            {content.category.charAt(0).toUpperCase() + content.category.slice(1)}
          </span>
          <span className="rounded-full bg-outlive-green-200 px-2 py-0.5 text-xs text-outlive-green-600 dark:bg-outlive-green-900/40 dark:text-outlive-green-300">
            {content.type === "video-blog" ? "Video" : "Article"}
          </span>
        </div>
      </div>

      {content.type === "photo-blog" ? (
        <div className="aspect-video w-full bg-muted rounded-lg"></div>
      ) : (
        <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">Video Player</p>
        </div>
      )}

      <Card>
        <CardContent className="p-6">
          <div
            className="prose prose-green max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: content.content }}
          ></div>
        </CardContent>
      </Card>

      <div className="border-t pt-6">
        <h2 className="text-xl font-semibold mb-4">Related Content</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {contentItems
            .filter((item) => item.id !== content.id && item.category === content.category)
            .slice(0, 3)
            .map((relatedContent) => (
              <Link key={relatedContent.id} href={`/dashboard/content/${relatedContent.category}/${relatedContent.id}`}>
                <div className="overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md card-hover">
                  <div className="aspect-video w-full bg-muted/60"></div>
                  <div className="p-4">
                    <h3 className="line-clamp-1 text-lg font-semibold">{relatedContent.title}</h3>
                    <p className="line-clamp-2 text-sm text-muted-foreground mt-1">{relatedContent.description}</p>
                    <div className="mt-2 flex items-center text-xs text-muted-foreground">
                      <span className="rounded-full bg-outlive-green-200 px-2 py-0.5 text-outlive-green-600 dark:bg-outlive-green-900/40 dark:text-outlive-green-300">
                        {relatedContent.type === "video-blog" ? "Video" : "Article"}
                      </span>
                      <span className="ml-auto">{relatedContent.readTime} read</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}
