import { z } from "zod";

// Predefined action IDs as const assertions for type safety
export const PREDEFINED_ACTION_IDS = {
  AVG_RATING: "avg-rating",
  RECENT_FEEDBACK: "recent-feedback",
  SENTIMENT_DIST: "sentiment-dist",
  FEEDBACK_CHART: "feedback-chart",
} as const;

export type PredefinedActionId =
  (typeof PREDEFINED_ACTION_IDS)[keyof typeof PREDEFINED_ACTION_IDS];

// Zod schema for validating predefined action IDs
export const PredefinedActionIdSchema = z.enum([
  PREDEFINED_ACTION_IDS.AVG_RATING,
  PREDEFINED_ACTION_IDS.RECENT_FEEDBACK,
  PREDEFINED_ACTION_IDS.SENTIMENT_DIST,
  PREDEFINED_ACTION_IDS.FEEDBACK_CHART,
]);

export type ActionComplexity = "simple" | "medium" | "advanced";

// Zod schema for action complexity
export const ActionComplexitySchema = z.enum(["simple", "medium", "advanced"]);

// Predefined action type
export interface PredefinedAction {
  id: PredefinedActionId;
  label: string;
  query: string;
  complexity: ActionComplexity;
}

// Feedback data types
export type SentimentType = "positive" | "negative" | "neutral";

// Zod schema for sentiment type
export const SentimentTypeSchema = z.enum(["positive", "negative", "neutral"]);

// Zod schema for feedback data
export const FeedbackDataSchema = z.object({
  id: z.string(),
  rating: z.number().min(1).max(5),
  sentiment: SentimentTypeSchema,
  text: z.string(),
  category: z.string(),
  timestamp: z.date(),
});
export type FeedbackData = z.infer<typeof FeedbackDataSchema>;

// Zod schema for response template
export const ResponseTemplateSchema = z.object({
  text: z.string(),
  toolInvocation: z
    .object({
      toolName: z.string(),
      args: z.record(z.string(), z.unknown()),
      result: z.unknown(),
    })
    .optional(),
  followUp: z.string().optional(),
});
export type ResponseTemplate = z.infer<typeof ResponseTemplateSchema>;

// Predefined action buttons with type safety
export const PREDEFINED_ACTIONS: PredefinedAction[] = [
  {
    id: PREDEFINED_ACTION_IDS.AVG_RATING,
    label: "Average Rating",
    query: "What's the average rating?",
    complexity: "simple",
  },
  {
    id: PREDEFINED_ACTION_IDS.RECENT_FEEDBACK,
    label: "Latest Feedback",
    query: "Show me the latest feedback",
    complexity: "simple",
  },
  {
    id: PREDEFINED_ACTION_IDS.SENTIMENT_DIST,
    label: "Sentiment Analysis",
    query: "Show sentiment distribution",
    complexity: "medium",
  },
  {
    id: PREDEFINED_ACTION_IDS.FEEDBACK_CHART,
    label: "Feedback Trends",
    query: "Show feedback trends over time",
    complexity: "advanced", // Save for if we have time
  },
] as const;

// Mock feedback data with proper typing
export const MOCK_FEEDBACK_DATA: FeedbackData[] = [
  {
    id: "1",
    rating: 4,
    sentiment: "positive" as SentimentType,
    text: "Great product! Really love the new features.",
    category: "product",
    timestamp: new Date("2024-01-15"),
  },
  {
    id: "2",
    rating: 2,
    sentiment: "negative" as SentimentType,
    text: "App crashes frequently, very frustrating.",
    category: "technical",
    timestamp: new Date("2024-01-14"),
  },
  {
    id: "3",
    rating: 3,
    sentiment: "neutral" as SentimentType,
    text: "It's okay, could be better.",
    category: "general",
    timestamp: new Date("2024-01-13"),
  },
  {
    id: "4",
    rating: 5,
    sentiment: "positive" as SentimentType,
    text: "Excellent customer service!",
    category: "support",
    timestamp: new Date("2024-01-12"),
  },
];

// Tool names as constants for type safety
export const TOOL_NAMES = {
  GET_AVERAGE_RATING: "get_average_rating",
  GET_RECENT_FEEDBACK: "get_recent_feedback",
  GET_SENTIMENT_DISTRIBUTION: "get_sentiment_distribution",
  GET_FEEDBACK_TRENDS: "get_feedback_trends",
} as const;
export type ToolName = (typeof TOOL_NAMES)[keyof typeof TOOL_NAMES];

// Response templates with proper typing
export const RESPONSE_TEMPLATES: Record<PredefinedActionId, ResponseTemplate> =
  {
    [PREDEFINED_ACTION_IDS.AVG_RATING]: {
      text: "Let me analyze the average rating from our feedback data.",
      toolInvocation: {
        toolName: TOOL_NAMES.GET_AVERAGE_RATING,
        args: { timeframe: "last_30_days" },
        result: {
          average: 4.2,
          total_reviews: 1250,
          breakdown: { 5: 520, 4: 380, 3: 200, 2: 100, 1: 50 },
        },
      },
      followUp:
        "Based on the analysis, the average rating is 4.2 stars from 1,250 reviews in the last 30 days.",
    },
    [PREDEFINED_ACTION_IDS.RECENT_FEEDBACK]: {
      text: "Fetching the most recent customer feedback...",
      toolInvocation: {
        toolName: TOOL_NAMES.GET_RECENT_FEEDBACK,
        args: { limit: 5, sort: "timestamp_desc" },
        result: {
          feedback: MOCK_FEEDBACK_DATA.slice(0, 3),
          total_count: MOCK_FEEDBACK_DATA.length,
        },
      },
      followUp: `Here are the ${MOCK_FEEDBACK_DATA.length} most recent feedback entries from our customers.`,
    },
    [PREDEFINED_ACTION_IDS.SENTIMENT_DIST]: {
      text: "Analyzing sentiment distribution across all feedback...",
      toolInvocation: {
        toolName: TOOL_NAMES.GET_SENTIMENT_DISTRIBUTION,
        args: { timeframe: "last_30_days" },
        result: {
          positive: 65,
          neutral: 20,
          negative: 15,
          total_analyzed: 1250,
        },
      },
      followUp:
        "The sentiment analysis shows 65% positive, 20% neutral, and 15% negative feedback.",
    },
    [PREDEFINED_ACTION_IDS.FEEDBACK_CHART]: {
      text: "Generating feedback trends chart...",
      toolInvocation: {
        toolName: TOOL_NAMES.GET_FEEDBACK_TRENDS,
        args: { timeframe: "last_3_months", granularity: "weekly" },
        result: {
          chart_data: [
            { week: "2024-W40", avg_rating: 3.8, count: 42 },
            { week: "2024-W41", avg_rating: 3.9, count: 48 },
            { week: "2024-W42", avg_rating: 4.1, count: 55 },
            { week: "2024-W43", avg_rating: 4.0, count: 51 },
            { week: "2024-W44", avg_rating: 4.2, count: 63 },
            { week: "2024-W45", avg_rating: 4.3, count: 58 },
            { week: "2024-W46", avg_rating: 4.1, count: 49 },
            { week: "2024-W47", avg_rating: 4.4, count: 67 },
            { week: "2024-W48", avg_rating: 4.2, count: 61 },
            { week: "2024-W49", avg_rating: 4.5, count: 72 },
            { week: "2024-W50", avg_rating: 4.3, count: 59 },
            { week: "2024-W51", avg_rating: 4.4, count: 68 },
          ],
          trend: "improving",
        },
      },
      followUp:
        "The feedback trends show an improving pattern over the last 3 months, with ratings climbing from 3.8 to 4.4 stars.",
    },
  } as const;
