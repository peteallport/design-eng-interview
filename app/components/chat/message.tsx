"use client";

import type { UIMessage } from "ai";
import { ToolCallDisplay } from "~/components/chat/tool-call-display";
import { Card } from "~/components/ui/card";
import { cn } from "~/lib/tw";
import { isToolCallPart } from "~/utils/types";
import { RecentFeedback } from "./RecentFeedback";

export function Message({ message }: { message: UIMessage }) {
  return (
    <div className="flex mb-4">
      <div className="flex flex-col gap-2 flex-1">
        <Card className={cn("p-3")}>
          <div className="text-sm whitespace-pre-wrap transition-all duration-150 ease-in-out">
            {message.parts?.map((part, index) => {
              if (part.type === "text") {
                return <span key={index}>{part.text}</span>;
              }
              return null;
            })}
          </div>
        </Card>

        {/* switch statement for checking if message is a predefined tool call */}
        {message.parts?.map((part, index) => {
          if (isToolCallPart(part)) {
            switch (part.type) {
              case "tool-get_recent_feedback":
                return <RecentFeedback />;
              default:
                return <ToolCallDisplay key={index} part={part} />;
            }
          }
          return null;
        })}
      </div>
    </div>
  );
}
