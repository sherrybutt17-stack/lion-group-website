import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { RevealObserver } from "@/components/motion/RevealObserver";

/** The original wireframe-level site, kept at the root for comparison. */
export default function BaselineLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        {children}
      </main>
      <SiteFooter />
      <RevealObserver />
    </>
  );
}
