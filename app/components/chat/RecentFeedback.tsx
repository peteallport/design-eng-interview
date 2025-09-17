// RecentFeedback.tsx
import { Bug, Headset, MessageCircle, ShoppingBag, Star } from "lucide-react";
import { MOCK_FEEDBACK_DATA, SentimentType } from "~/lib/constants";

function RecentFeedback() {
  return (
    <div className="grid grid-cols-2 gap-2 border border-gray-200 rounded-3xl p-2">
      {MOCK_FEEDBACK_DATA.map((feedback) => (
        <div
          className="text-sm bg-gray-50 p-2 rounded-2xl overflow-clip"
          key={feedback.id}
        >
          <RatingBadge rating={feedback.rating} />
          <div className="text-base font-medium">{feedback.text}</div>
          <div className="flex row gap-2 pt-2">
            <SentimentBadge sentiment={feedback.sentiment} />
            <FeedbackCategoryBadge category={feedback.category} />
            <TimestampBadge timestamp={feedback.timestamp} />
          </div>
        </div>
      ))}
    </div>
  );
}

function SentimentBadge({ sentiment }: { sentiment: SentimentType }) {
  const sentimentColor = {
    positive: "bg-green-50 text-green-700 border border-green-200",
    negative: "bg-red-50 text-red-700 border border-red-200",
    neutral: "bg-gray-50 text-gray-700 border border-gray-200",
  } as const;

  return (
    <div
      className={`text-xs font-mono font-medium ${sentimentColor[sentiment]} uppercase px-3 py-1 rounded-full w-fit`}
    >
      {sentiment}
    </div>
  );
}

function FeedbackCategoryBadge({ category }: { category: string }) {
  const icon = {
    product: <ShoppingBag className="w-4 h-4" />,
    technical: <Bug className="w-4 h-4" />,
    general: <MessageCircle className="w-4 h-4" />,
    support: <Headset className="w-4 h-4" />,
  } as const;

  return (
    <div
      className={`text-xs font-mono font-medium uppercase px-3 py-1 rounded-full w-fit flex items-center gap-1 bg-gray-50 text-gray-700 border border-gray-200`}
    >
      {icon[category as keyof typeof icon]} {category}
    </div>
  );
}

function RatingBadge({ rating }: { rating: number }) {
  return (
    <div className="text-xs font-mono font-medium bg-gray-50 text-gray-700 border border-gray-200 uppercase px-3 py-1 rounded-full w-fit">
      <div className="text-xs flex items-center gap-1">
        {Array.from({ length: rating }).map((_, index) => (
          <Star key={index} className="text-yellow-500 w-4 h-4" />
        ))}
        {Array.from({ length: 5 - rating }).map((_, index) => (
          <Star key={index} className="text-gray-500 w-4 h-4" />
        ))}
      </div>
    </div>
  );
}
function TimestampBadge({ timestamp }: { timestamp: Date }) {
  return (
    <div className="text-xs font-mono font-medium bg-gray-50 text-gray-700 border border-gray-200 uppercase px-3 py-1 rounded-full w-fit">
      {timestamp.toLocaleDateString()}
    </div>
  );
}

export { RecentFeedback, SentimentBadge };
