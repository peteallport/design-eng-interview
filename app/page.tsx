"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { ActionButtons } from "~/components/chat/action-buttons";
import { Message } from "~/components/chat/message";
import {
  SimulationSettings,
  SimulationToolbar,
} from "~/components/simulation-toolbar";
import { Card } from "~/components/ui/card";
import { PREDEFINED_ACTIONS, PredefinedActionId } from "~/lib/constants";
import { Skeleton } from "./components/ui/skeleton";

export default function Home() {
  const [simulationSettings, setSimulationSettings] =
    useState<SimulationSettings>({
      streamingInterval: 20,
      toolLoadingTime: 500,
      simulateError: false,
    });

  const { messages, sendMessage, status, error, regenerate } = useChat({
    onFinish: () => {
      console.log("Chat response completed");
    },
    onError: (error) => {
      console.error("Chat error:", error);
    },
  });

  const handleActionClick = (actionId: PredefinedActionId) => {
    const action = PREDEFINED_ACTIONS.find((a) => a.id === actionId);
    if (!action) return;

    // Send the action query to the chat API with simulation settings
    sendMessage({
      role: "user",
      parts: [{ type: "text", text: action.query }],
      metadata: {
        actionId,
        simulationSettings,
      },
    });
  };

  return (
    <main className="h-screen bg-zinc-50 flex flex-col">
      <div className="max-w-4xl mx-auto w-full h-full flex flex-col p-4">
        <Card className="flex-1 flex flex-col min-h-0 h-full relative p-4">
          <div className="h-full overflow-y-auto">
            {/* Switch statement checking for error, submitted, and streaming */}
            {status === "error" ? (
              <div className="text-center text-red-500 py-8">
                <p className="text-lg font-medium">Error</p>
                <p className="text-sm mt-2">{error?.message}</p>
              </div>
            ) : status === "submitted" ? (
              <Skeleton lines={messages.length} />
            ) : messages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <p className="text-lg font-medium">
                  Reforge Design Engineer Interview
                </p>
                <p className="text-sm mt-2">
                  Click one of the action buttons below to get started.
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <Message key={message.id} message={message} />
              ))
            )}
          </div>

          <div className="flex-shrink-0 mt-auto">
            <ActionButtons
              onActionClick={handleActionClick}
              isLoading={status === "submitted" || status === "streaming"}
            />
          </div>
        </Card>
      </div>

      <SimulationToolbar
        settings={simulationSettings}
        onSettingsChange={setSimulationSettings}
      />
    </main>
  );
}
