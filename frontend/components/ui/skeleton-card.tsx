import { Skeleton } from "@/components/ui/skeleton"
export function SkeletonCard() {
  return (
    <div className="glass rounded-xl p-5 space-y-3">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-2 w-full" />
    </div>
  )
}
