export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`${className} animate-pulse rounded-xl bg-secondary/30`}
      aria-hidden="true"
    />
  );
}

export function SkeletonText({ lines = 3, className = "" }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={`h-4 ${i === lines - 1 ? "w-3/4" : "w-full"}`} />
      ))}
    </div>
  );
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-2xl border border-secondary bg-card p-6 ${className}`}>
      <Skeleton className="h-6 w-1/4 mb-4" />
      <Skeleton className="h-10 w-1/2" />
      <Skeleton className="h-3 w-full mt-4" />
      <Skeleton className="h-3 w-3/4 mt-2" />
    </div>
  );
}

export function SkeletonTable({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[800px]">
        <thead>
          <tr className="border-b border-secondary bg-secondary/30">
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="px-5 py-3 text-left">
                <Skeleton className="h-4 w-3/4" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} className="border-b border-secondary/40">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="px-5 py-4">
                  <Skeleton className="h-4 w-3/4" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}