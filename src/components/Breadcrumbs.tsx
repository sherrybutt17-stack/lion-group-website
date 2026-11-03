import Link from "next/link";

export function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-2 text-body">
        <li>
          <Link prefetch={false} href="/" className="inline-flex min-h-6 items-center underline underline-offset-4 hover:text-gold-700">
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <span aria-current="page" className="font-semibold text-ink">
            {current}
          </span>
        </li>
      </ol>
    </nav>
  );
}
