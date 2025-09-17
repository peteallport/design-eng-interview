import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  UIMessage,
} from "ai";
import { z } from "zod";
import type { PredefinedActionId } from "~/lib/constants";
import { PredefinedActionIdSchema } from "~/lib/constants";
import { getResponseTemplate } from "~/utils/streaming";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    console.log("Chat API called with messages:", messages);

    // Get the last message to determine which action was triggered
    const lastUserMessage = messages
      .reverse()
      .find((message) => message.role === "user");

    if (!lastUserMessage) {
      console.error("No user message found");
      return new Response("No user message found", { status: 400 });
    }

    const { actionId, simulationSettings } =
      parseMessageMetadata(lastUserMessage);

    if (!actionId) {
      console.error("Invalid action ID from message:", {
        metadata: lastUserMessage.metadata,
        parts: lastUserMessage.parts,
      });
      return new Response("Invalid action", { status: 400 });
    }

    console.log("Using simulation settings:", simulationSettings);

    console.log("Processing action:", actionId);
    const template = getResponseTemplate(actionId);

    if (!template) {
      console.error("No template found for action:", actionId);
      return new Response("Template not found", { status: 500 });
    }

    // Create a simulated UI message stream
    const stream = createUIMessageStream({
      async execute({ writer }) {
        try {
          // Simulate error if enabled (50% chance)
          if (simulationSettings.simulateError && Math.random() < 0.5) {
            throw new Error("Simulated error occurred during processing");
          }

          // Ensure template exists and has required properties
          if (!template || !template.text) {
            console.error("Template or template.text is undefined:", template);
            return;
          }

          // Stream the text response character by character
          const responseText =
            template.text +
            (template.followUp ? "\n\n" + template.followUp : "");

          // Use consistent ID for all text parts
          const textId = `text_${Date.now()}`;

          // Start the message
          writer.write({
            type: "text-start",
            id: textId,
          });

          // Stream text character by character
          if (responseText && responseText.length > 0) {
            for (let i = 0; i < responseText.length; i++) {
              const char = responseText[i];
              if (char !== undefined) {
                writer.write({
                  type: "text-delta",
                  delta: char,
                  id: textId,
                });

                // Use configurable delay for streaming
                await new Promise((resolve) =>
                  setTimeout(resolve, simulationSettings.streamingInterval)
                );
              }
            }
          }

          // End the text
          writer.write({
            type: "text-end",
            id: textId,
          });

          // Add tool invocation if present
          if (template.toolInvocation) {
            const toolCallId = `call_${Date.now()}`;
            const toolName = template.toolInvocation.toolName;

            // Send tool input start
            writer.write({
              type: "tool-input-start",
              toolCallId,
              toolName,
            });

            // Send tool input available
            writer.write({
              type: "tool-input-available",
              toolCallId,
              toolName,
              input: template.toolInvocation.args,
            });

            // Use configurable delay for tool processing
            await new Promise((resolve) =>
              setTimeout(resolve, simulationSettings.toolLoadingTime)
            );

            // Simulate error during tool execution if enabled (50% chance)
            if (simulationSettings.simulateError && Math.random() < 0.5) {
              writer.write({
                type: "tool-output-available",
                toolCallId,
                output: "Error: Simulated tool execution failure",
              });
            } else {
              // Send tool output available
              writer.write({
                type: "tool-output-available",
                toolCallId,
                output: template.toolInvocation.result,
              });
            }

            console.log("Tool invocation completed:", {
              toolName,
              result: template.toolInvocation.result,
            });
          }
        } catch (error) {
          console.error("Streaming error:", error);
          // The error will be handled by the createUIMessageStream wrapper
          throw error;
        }
      },
    });

    return createUIMessageStreamResponse({ stream });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("Error processing request", { status: 500 });
  }
}

// Zod schema for simulation settings
const SimulationSettingsSchema = z.object({
  streamingInterval: z.number().min(1).max(200).default(20),
  toolLoadingTime: z.number().min(100).max(5000).default(500),
  simulateError: z.boolean().default(false),
});

// Zod schema for validating message metadata
const MessageMetadataSchema = z.object({
  actionId: PredefinedActionIdSchema,
  simulationSettings: SimulationSettingsSchema.optional(),
});

// Helper function to extract action ID and simulation settings from message metadata
function parseMessageMetadata(message: UIMessage): {
  actionId: PredefinedActionId | null;
  simulationSettings: z.infer<typeof SimulationSettingsSchema>;
} {
  try {
    console.log("Parsing metadata:", message.metadata);
    // Parse and validate the metadata using Zod
    const metadata = MessageMetadataSchema.parse(message.metadata);
    console.log("Parsed metadata successfully:", metadata);

    // Use provided simulation settings or defaults
    const simulationSettings = metadata.simulationSettings || {
      streamingInterval: 20,
      toolLoadingTime: 500,
      simulateError: false,
    };

    return {
      actionId: metadata.actionId,
      simulationSettings,
    };
  } catch (error) {
    console.error("Invalid metadata format:", {
      metadata: message.metadata,
      error: error instanceof Error ? error.message : error,
    });
    return {
      actionId: null,
      simulationSettings: {
        streamingInterval: 20,
        toolLoadingTime: 500,
        simulateError: false,
      },
    };
  }
}
