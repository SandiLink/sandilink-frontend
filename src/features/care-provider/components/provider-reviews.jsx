import { Star, TrendingUp, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const STATS = { avg: 4.9, total: 124, recommend: 98 };

const DISTRIBUTION = [
  { stars: 5, count: 102, pct: 82 },
  { stars: 4, count: 15, pct: 12 },
  { stars: 3, count: 5, pct: 4 },
  { stars: 2, count: 1, pct: 1 },
  { stars: 1, count: 1, pct: 1 },
];

const REVIEWS = [
  { id: "1", name: "Alice M.", initials: "AM", rating: 5, date: "Mar 28, 2026", text: "Dr. Johnson was incredibly thorough and took the time to explain everything. Felt very comfortable during my visit. Highly recommend!", recommend: true },
  { id: "2", name: "Tom R.", initials: "TR", rating: 5, date: "Mar 25, 2026", text: "Best experience I've had with a doctor. She listens carefully and provides clear guidance. The virtual visit was seamless.", recommend: true },
  { id: "3", name: "Maria S.", initials: "MS", rating: 4, date: "Mar 20, 2026", text: "Very professional and knowledgeable. Wait time was a bit long but the appointment itself was great.", recommend: true },
  { id: "4", name: "John D.", initials: "JD", rating: 5, date: "Mar 18, 2026", text: "Excellent care. Dr. Johnson remembered details from my previous visit and followed up on my concerns.", recommend: true },
  { id: "5", name: "Grace K.", initials: "GK", rating: 5, date: "Mar 15, 2026", text: "So glad I found Dr. Johnson on SandiLink. She's patient, kind, and extremely competent.", recommend: true },
  { id: "6", name: "Frank B.", initials: "FB", rating: 4, date: "Mar 10, 2026", text: "Good experience overall. The intake form was easy and the appointment was on time.", recommend: true },
];

export function ProviderReviews() {
  return (
    <div className="grid gap-6">
      {/* Overview */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card size="sm">
          <CardContent className="pt-4 text-center">
            <div className="flex items-center justify-center gap-1">
              <Star className="size-5 fill-amber-400 text-amber-400" />
              <span className="text-3xl font-semibold font-heading">{STATS.avg}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Average Rating</p>
            <p className="text-xs text-muted-foreground">{STATS.total} reviews</p>
          </CardContent>
        </Card>
        <Card size="sm">
          <CardContent className="pt-4 text-center">
            <div className="flex items-center justify-center gap-1">
              <ThumbsUp className="size-5 text-primary" />
              <span className="text-3xl font-semibold font-heading">{STATS.recommend}%</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Would Recommend</p>
          </CardContent>
        </Card>
        <Card size="sm">
          <CardContent className="pt-4">
            <p className="mb-2 text-sm font-medium">Rating Distribution</p>
            <div className="grid gap-1.5">
              {DISTRIBUTION.map((d) => (
                <div key={d.stars} className="flex items-center gap-2 text-xs">
                  <span className="w-3 text-right">{d.stars}</span>
                  <Star className="size-3 fill-amber-400 text-amber-400" />
                  <Progress value={d.pct} className="flex-1 h-1.5" />
                  <span className="w-6 text-right text-muted-foreground">{d.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reviews list */}
      <Card>
        <CardHeader>
          <CardTitle>All Reviews</CardTitle>
          <CardDescription>Sorted by most recent</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {REVIEWS.map((review) => (
              <div key={review.id} className="rounded-xl border p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Avatar size="sm">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">{review.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{review.name}</p>
                      <div className="flex gap-0.5">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="size-3 fill-amber-400 text-amber-400" />
                        ))}
                        {Array.from({ length: 5 - review.rating }).map((_, i) => (
                          <Star key={i} className="size-3 text-muted-foreground/20" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <p className="text-sm text-muted-foreground">{review.text}</p>
                {review.recommend && (
                  <p className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                    <ThumbsUp className="size-3" /> Would recommend
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
