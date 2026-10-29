import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { useDeskReady } from "@/lib/use-ready";
import appCss from "../styles.css?url";

const APP_NAME = "Scopewright";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content: "A production desk that turns game and book ideas into scoped, marketable plans.",
      },
      { name: "theme-color", content: "#f3eee6" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  const ready = useDeskReady();
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          {ready ? (
            <Outlet />
          ) : (
            <div className="min-h-screen border-t-4 border-ink bg-paper px-4 py-16 text-ink">
              <p className="text-xs font-semibold tracking-widest">SCOPEWRIGHT</p>
              <h1 className="mt-4 font-display text-4xl">Opening the desk.</h1>
            </div>
          )}
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
