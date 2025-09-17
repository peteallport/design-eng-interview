"use client";

import { DynamicToolUIPart, ToolUIPart } from "ai";
import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardTitle } from "~/components/ui/card";

export function ToolCallDisplay(props: {
  part: ToolUIPart | DynamicToolUIPart;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Simple state display
  const getStateInfo = () => {
    if ("state" in props.part) {
      return `State: ${props.part.state}`;
    }
    return "Tool Call";
  };

  return (
    <Card className="w-3/4 max-w-full p-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Badge variant="outline">🔧 Tool Call</Badge>
          <Badge variant="outline">{getStateInfo()}</Badge>
        </div>
        <CardTitle className="font-mono">{props.part.type}</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Hide" : "Show"}
        </Button>
      </div>

      {isExpanded && (
        <CardContent className="w-fit">
          <div>
            <h4 className="text-sm font-medium mb-2">Tool Call Data:</h4>
            <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto">
              {JSON.stringify(props.part, null, 2)}
            </pre>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
