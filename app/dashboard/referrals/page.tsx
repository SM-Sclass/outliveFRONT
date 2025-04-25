import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, Facebook, Mail, Twitter } from "lucide-react"

export const metadata: Metadata = {
  title: "Refer Friends - Outlive",
  description: "Invite friends to join Outlive and earn rewards",
}

export default function ReferralsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Refer Friends</h1>
        <p className="text-muted-foreground">Invite friends to join Outlive and earn rewards</p>
      </div>

      <Card className="bg-white dark:bg-premium-tealDark" >
        <CardHeader className="text-premium-dark/70 dark:text-white/90">
          <CardTitle>Your Referral Link</CardTitle>
          <CardDescription>Share this link with friends to invite them to Outlive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-premium-dark/70 dark:text-white/90">
            <Input value="https://outlive.health/refer/sam123" readOnly className="flex-1" />
            <Button variant="outline" className="shrink-0">
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 text-premium-dark/70 dark:text-white/90">
            <Button variant="outline" className="flex-1">
              <Mail className="mr-2 h-4 w-4" />
              Email
            </Button>
            <Button variant="outline" className="flex-1">
              <Facebook className="mr-2 h-4 w-4" />
              Facebook
            </Button>
            <Button variant="outline" className="flex-1">
              <Twitter className="mr-2 h-4 w-4" />
              Twitter
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-premium-tealDark" >
        <CardHeader className="text-premium-dark dark:text-white/90">
          <CardTitle>Referral Rewards</CardTitle>
          <CardDescription>Earn rewards for each friend who joins</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border p-4 mb-4 text-premium-dark/70 dark:text-white/90">
            <h3 className="text-lg font-medium">How it works</h3>
            <ol className="mt-2 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-outlive-teal-100 text-outlive-teal-700 text-sm font-medium">
                  1
                </div>
                <p>Share your unique referral link with friends and family</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-outlive-teal-100 text-outlive-teal-700 text-sm font-medium">
                  2
                </div>
                <p>When they sign up using your link and subscribe to any plan, you both get rewarded</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-outlive-teal-100 text-outlive-teal-700 text-sm font-medium">
                  3
                </div>
                <p>You receive a $20 credit for each successful referral, up to $200 per year</p>
              </li>
            </ol>
          </div>

          <div className="rounded-lg border text-premium-dark/70 dark:text-white/90">
            <div className="p-4 border-b">
              <h3 className="font-medium">Your Referrals</h3>
            </div>
            <div className="p-6 text-center">
              <p className="text-muted-foreground">You haven't referred anyone yet.</p>
              <p className="text-muted-foreground mt-1">Share your link to start earning rewards!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
