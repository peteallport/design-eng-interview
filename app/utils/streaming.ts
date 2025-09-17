import {
  PredefinedActionId,
  RESPONSE_TEMPLATES,
  ResponseTemplate,
} from "~/lib/constants";

// Streaming simulation function with proper typing
export async function* simulateStreamingResponse(
  template: ResponseTemplate
): AsyncGenerator<string, void, unknown> {
  // Simulate character-by-character streaming
  const fullText =
    template.text + (template.followUp ? "\n\n" + template.followUp : "");

  for (let i = 0; i < fullText.length; i++) {
    yield fullText.slice(0, i + 1);
    // Small delay to simulate streaming
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
}

// Helper function to get response template by action ID
export function getResponseTemplate(
  actionId: PredefinedActionId
): ResponseTemplate {
  return RESPONSE_TEMPLATES[actionId];
}
