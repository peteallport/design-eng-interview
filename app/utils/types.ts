import {
  DynamicToolUIPart,
  ToolUIPart,
  UIDataTypes,
  UIMessagePart,
  UITools,
} from "ai";

export const isToolCallPart = (
  part: UIMessagePart<UIDataTypes, UITools>
): part is ToolUIPart | DynamicToolUIPart => {
  return part.type.startsWith("tool-") || part.type === "dynamic-tool";
};
