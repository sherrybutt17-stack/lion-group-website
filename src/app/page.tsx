import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Picture } from "@/components/Picture";
import { ManeRays } from "@/components/concepts/ManeRays";
import { concepts } from "@/concepts/config";

export const metadata: Metadata = {
  title: { absolute: "The Lion Group | Website designs" },
};

const previews: Record<string, { art: string; tagline: string }> = {
  a: { art: "bg-noir-hero", tagline: "Black and gold editorial, with gold light rays around the lion." },
  d: { art: "bg-mesh-molten", tagline: "Cinematic molten gold, with a liquid-metal lion." },
};

/** Entry page: choose one of the two website designs. */
export default function DesignChooser() {
  return (
    <div data-concept="a" className="min-h-svh">
      <main id="main" tabIndex={-1} className="grain bg-noir-center relative overflow-hidden focus:outline-none">
        <div className="container-page flex min-h-svh flex-col justify-center py-16">
          <div className="text-center">
            <div className="mx-auto w-16">
              <Picture name="logo-lion-L" alt="" sizes="64px" priority className="h-auto w-full" />
            </div>
            <p className="label-concept mt-6">The Lion Group</p>
            <h1 className="mt-4 font-serif text-[clamp(2.5rem,1.5rem+4vw,5rem)] leading-[1] tracking-[-0.025em] text-c-ink">
              Choose a <span className="text-gradient-gold">design</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg">Two directions for the new website. Each one is a complete site you can click through.</p>
          </div>

          <ul className="mx-auto mt-14 grid w-full max-w-5xl gap-6 md:grid-cols-2">
            {concepts.map((c) => (
              <li key={c.id}>
                <Link
                  prefetch={false}
                  href={`/${c.id}/`}
                  className="glare border-gradient-gold group relative block overflow-hidden rounded-[2rem] [--card-bg:#0a0a0a]"
                >
                  <div aria-hidden="true" className={`relative grid aspect-[16/10] place-items-center overflow-hidden rounded-t-[2rem] ${previews[c.id]?.art ?? ""}`}>
                    {c.id === "a" && <ManeRays className="absolute inset-[-10%] size-[120%] opacity-80" count={60} />}
                    <div className="relative w-28 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
                      <Picture name="logo-lion-L" alt="" sizes="112px" className="h-auto w-full" />
                    </div>
                  </div>
                  <div className="flex items-end justify-between gap-6 p-7">
                    <div>
                      <p className="font-serif text-3xl text-c-ink">{c.name}</p>
                      <p className="mt-2">{previews[c.id]?.tagline ?? c.summary}</p>
                    </div>
                    <span className="grid size-12 shrink-0 place-items-center rounded-full border border-c-line text-c-ink transition-transform duration-500 group-hover:-rotate-45">
                      <ArrowUpRight aria-hidden="true" className="size-5" />
                      <span className="sr-only">View the {c.name} design</span>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
