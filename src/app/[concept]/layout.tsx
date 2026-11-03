import { notFound } from "next/navigation";
import { ConceptFooter } from "@/components/concepts/ConceptFooter";
import { ConceptHeader } from "@/components/concepts/ConceptHeader";
import { ConceptMotion } from "@/components/concepts/motion/ConceptMotion";
import { MotionPause } from "@/components/effects/MotionPause";
import { concepts, isConceptId } from "@/concepts/config";

export const dynamicParams = false;

export function generateStaticParams() {
  return concepts.map((c) => ({ concept: c.id }));
}

export default async function ConceptLayout({ children, params }: { children: React.ReactNode; params: Promise<{ concept: string }> }) {
  const { concept } = await params;
  if (!isConceptId(concept)) notFound();

  return (
    <div data-concept={concept} className="min-h-svh">
      <ConceptHeader concept={concept} />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        {children}
      </main>
      <ConceptFooter concept={concept} />
      <ConceptMotion />
      <MotionPause />
    </div>
  );
}
