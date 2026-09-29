import Link from "next/link";

/**
 * A static host cannot issue a 301, so a retired URL gets a real page that
 * sends the browser on instead: a meta refresh (works with JavaScript off) plus
 * a canonical pointing at the destination, so search engines credit the new URL.
 * Visible text is there for anyone who lands with both disabled.
 *
 * `noindex` comes from each route's generateMetadata, not from here.
 */
export default function LegacyRedirect({ to, label }: { to: string; label: string }) {
  const url = `https://scalevisory.in${to}`;
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      <link rel="canonical" href={url} />
      <main className="wrap section">
        <h1 className="text-2xl">This page has moved</h1>
        <p className="mt-3 text-muted">
          It is now part of <strong>{label}</strong>. You should be redirected automatically.
        </p>
        <Link href={to} className="btn-primary mt-6">Go to {label}</Link>
      </main>
    </>
  );
}
