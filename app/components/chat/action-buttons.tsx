"use client";

import { Button } from "~/components/ui/button";
import { PREDEFINED_ACTIONS, PredefinedActionId } from "~/lib/constants";
import { cn } from "~/lib/tw";

export function ActionButtons({
  onActionClick,
  isLoading,
}: {
  onActionClick: (actionId: PredefinedActionId) => void;
  isLoading: boolean;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 p-4 border-t border-gray-200 mt-auto">
      {PREDEFINED_ACTIONS.map((action) => {
        return (
          <Button
            key={action.id}
            variant={action.complexity === "advanced" ? "outline" : "default"}
            onClick={() => onActionClick(action.id)}
            disabled={isLoading}
            className="h-auto py-3 flex flex-col items-center gap-1 border border-primary/50 bg-primary/7 hover:bg-primary/15 shadow-sm"
          >
            <span className={cn("font-medium text-foreground")}>
              {action.label}
            </span>
            <span className={cn("text-xs text-muted-foreground")}>
              ({action.complexity})
            </span>
          </Button>
        );
      })}
    </div>
  );
}
