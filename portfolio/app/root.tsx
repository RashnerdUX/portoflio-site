import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { Footer } from "./components/home/footer";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&family=Spline+Sans:wght@400;700&display=swap",
  },
];

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Kelvin Akhigbe - Full Stack Developer Portfolio" },
    {
      name: "description",
      content:
        "Full Stack Developer specializing in Python, Javascript, and modern web technologies. View my projects, skills, and experience.",
    },
    {
      name: "keywords",
      content:
        "full stack developer, react, django, fastapi, ai, ml, javascript, portfolio, web development",
    },
    { name: "author", content: "Kelvin Akhigbe" },

    // Open Graph (Social Media)
    { property: "og:title", content: "Kelvin Akhigbe - Full Stack Developer" },
    {
      property: "og:description",
      content: "Full Stack Developer portfolio showcasing modern web applications",
    },
    { property: "og:image", content: "/og-image.jpg" },
    { property: "og:url", content: "https://www.kelvinakhigbe.com" },
    { property: "og:type", content: "website" },

    // Twitter Cards
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Kelvin Akhigbe - Full Stack Developer" },
    { name: "twitter:description", content: "Full Stack Developer portfolio" },
    { name: "twitter:image", content: "/twitter-image.jpg" },

    // Technical
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "robots", content: "index, follow" },
    { name: "theme-color", content: "#your-brand-color" },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <Footer />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
