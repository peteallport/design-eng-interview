import { HTMLAttributes, forwardRef } from "react";
import { cn } from "~/lib/tw";

// Skeleton component props
export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  lines?: number; // For multiple skeleton lines
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, lines = 1, ...props }, ref) => {
    if (lines === 1) {
      return (
        <div
          ref={ref}
          className={cn("animate-pulse rounded-md bg-muted h-4", className)}
          {...props}
        />
      );
    }

    // Multiple skeleton lines
    return (
      <div ref={ref} className={cn("spacing-y-2", className)} {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "animate-pulse my-2 rounded-md bg-muted h-4",
              // Make last line shorter for more natural look
              index === lines - 1 && lines > 1 ? "w-3/4" : "w-full"
            )}
          />
        ))}
      </div>
    );
  }
);

Skeleton.displayName = "Skeleton";

export { Skeleton };
