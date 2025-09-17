# Reforge Design Engineer Interview

Create an AI chat interface that demonstrates advanced UI/UX patterns with rich visualizations of customer feedback data, ratings, sentiment analysis, and trends.

## Getting Started

1. Install Node v24. You can use `nvm` if you'd like: `nvm install 24` and `nvm use 24`.
2. Install dependencies: `npm install`

### Running Locally

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## What's Included

This boilerplate provides:

- **Chat UI**: Scaffolded chat interface with message history and streaming responses
- **Action Buttons**: Four predefined buttons that trigger different data queries with simulated streaming responses
- **Tool Call Simulation**: Server-side simulation of LLM responses with tool call integration
- **Modern Stack**: Built with Next.js 15, React 19, TypeScript, and Tailwind CSS
- **UI Components**: Pre-built components using Radix UI and custom styling

### Available Tools

The chat interface includes simulated tool calls for:

- **Average Rating Tool**: Query rating breakdowns and statistics
- **Latest Feedback Tool**: Retrieve recent customer feedback entries
- **Sentiment Analysis Tool**: Analyze feedback sentiment distribution
- **Feedback Trends Tool**: View rating trends over time

## Project Structure

- `app/` - Next.js app directory with pages and API routes
- `app/components/chat/` - Chat-specific components (messages, tool displays, etc.)
- `app/components/ui/` - Reusable UI components
- `app/api/chat/` - Chat API route with simulated responses
- `app/utils/` - Utility functions and type definitions

## Development Notes

- Console logging is enabled to help inspect streamed objects and debug responses
- The chat uses simulated responses to ensure predictable behavior during development
- Tool calls return JSON payloads that can be visualized in the UI
