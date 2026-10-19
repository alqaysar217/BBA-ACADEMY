
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The actual <html> and <body> tags are defined in src/app/[lang]/layout.tsx
  // This root layout must simply return children to avoid nesting multiple <html>/<body> tags
  // which causes hydration and rendering issues in Next.js 15.
  return children;
}
