import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"

export const metadata: Metadata = {
  title: "Content - Early",
  description: "Health and wellness content",
}

// Sample content items
const contentItems = [
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
      
      <h2>Balancing Your Macronutrients</h2>
      <p>The right balance of macronutrients depends on your individual needs, goals, and preferences. However, a general guideline is:</p>
      <ul>
        <li><strong>Proteins:</strong> 10-35% of daily calories</li>
        <li><strong>Carbohydrates:</strong> 45-65% of daily calories</li>
        <li><strong>Fats:</strong> 20-35% of daily calories</li>
      </ul>
      
      <p>Remember, the quality of your macronutrients is just as important as the quantity. Focus on whole, nutrient-dense foods to get the most benefit from your diet.</p>
    `,
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
      
      <h3>4. Mountain Climbers</h3>
      <p>Start in a plank position and alternate bringing each knee toward your chest in a running motion.</p>
      
      <h3>5. Plank</h3>
      <p>Hold a forearm plank position, keeping your body in a straight line from head to heels.</p>
      
      <h3>6. Jumping Jacks</h3>
      <p>Jump while spreading your legs and bringing your arms above your head, then return to standing with arms at sides.</p>
      
      <h2>Cool Down (1 minute)</h2>
      <p>Finish with some gentle stretching for your major muscle groups, holding each stretch for 15-20 seconds.</p>
    `,
  },
]

// Get related content (different from current content)
const getRelatedContent = (currentId: string) => {
  return contentItems.filter((item) => item.id !== currentId).slice(0, 3)
}

export default function ContentPage({ params }: { params: { id: string } }) {
  const content = contentItems.find((item) => item.id === params.id) || contentItems[0]
  const relatedContent = getRelatedContent(content.id)

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 max-w-4xl">
      {/* Heading */}
      <div>
        <Button variant="outline" size="sm" asChild className="mb-6">
          <Link href="/dashboard/content">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Content
          </Link>
        </Button>

        <h1 className="text-3xl font-bold tracking-tight mb-3">{content.title}</h1>

        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {content.date}
          </div>
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            {content.author}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {content.readTime} read
          </div>
          <span className="rounded-full bg-outlive-green-200 px-2 py-0.5 text-xs text-outlive-green-600 dark:bg-outlive-green-900/40 dark:text-outlive-green-300">
            {content.category}
          </span>
        </div>
      </div>

      {/* Image/Video */}
      {content.type === "video" ? (
        <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden">
          <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <p className="text-muted-foreground">Video Player</p>
          </div>
        </div>
      ) : (
        <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden">
          <img src={content.image || "/placeholder.svg"} alt={content.title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Content */}
      <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm">
        <CardContent className="p-6 md:p-8">
          <div
            className="prose prose-green max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: content.content }}
          ></div>
        </CardContent>
      </Card>

      {/* Related Content */}
      {relatedContent.length > 0 && (
        <div className="border-t pt-8">
          <h2 className="text-xl font-semibold mb-6">Related Content</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {relatedContent.map((item) => (
              <Link key={item.id} href={`/dashboard/content/${item.id}`} className="block h-full">
                <Card className="overflow-hidden h-full hover:shadow-md transition-all bg-white dark:bg-gray-800">
                  <div className="aspect-video w-full bg-muted">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="rounded-full bg-outlive-green-200 px-2 py-0.5 text-outlive-green-600 dark:bg-outlive-green-900/40 dark:text-outlive-green-300">
                        {item.type === "video" ? "Video" : "Article"}
                      </span>
                      <span className="text-muted-foreground">{item.readTime} read</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
