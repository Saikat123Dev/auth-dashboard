import { Suspense } from "react"
import { PostsTable } from "@/components/dashboard/posts-table"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">View and manage your posts from the JSONPlaceholder API.</p>
      </div>

      <Suspense fallback={<TableSkeleton />}>
        <PostsTable />
      </Suspense>
    </div>
  )
}

function TableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-10 w-[200px]" />
      </div>
      <div className="rounded-md border">
        <Skeleton className="h-[400px] w-full" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[100px]" />
        <Skeleton className="h-10 w-[200px]" />
      </div>
    </div>
  )
}

