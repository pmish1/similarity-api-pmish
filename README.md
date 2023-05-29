# Similarity API

_Avaliable here_: https://similarity-api-pmish.vercel.app/

Full-stack API service with rate-limited and protected routes which allows users submit two pieces of text which are compared using OpenAI’s Embeddings API and a Cosine Similarity algorithm to return a value describing the similarity between the texts. Further, functionality for users to login to the platform using Google provided OAuth 2.0, generate and revoke API keys and view details for each key in a dashboard.

**Front-end:**

-   React.js with Next.js 13 framework for front-end functionality and client-side authorization checks. TypeScript to ensure code quality and reliability.
-   CSS with Tailwind framework to toggle between dark/light themes in addition to modern and responsive styling.
-   Hosted on Vercel.

**Back-end:**

-   Next.js server components to communicate between OpenAI’s Embeddings API for similarity logic check and Prisma database for API key vitals and information for dashboard.
-   Upstash Redis for rate-limiting API calls. Middleware authorization to ensure protected routes in addition to client-side authentication.

## Getting Started

Sign up to [Similarity API](https://similarity-api-pmish.vercel.app/) with your google account and request a new API key.

Follow the documentation.

Ensure you have your development server running.
