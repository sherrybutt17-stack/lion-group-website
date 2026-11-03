import { Compass, Sprout, Users } from "lucide-react";
import { ReviewFlag } from "./ReviewFlag";

// Adapted from the client's current site ("Advocacy. Independence. Support.").
const principles = [
  {
    icon: Compass,
    title: "Advocacy",
    text: "A person-centered approach that puts each individual's needs and goals first.",
  },
  {
    icon: Sprout,
    title: "Independence",
    text: "Encouraging self-sufficiency and the daily living skills that build confidence.",
  },
  {
    icon: Users,
    title: "Support",
    text: "Working closely with each individual, their family, and their support team, with clear communication.",
  },
];

export function Principles({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <div>
      <ul className="grid gap-6 md:grid-cols-3">
        {principles.map(({ icon: Icon, title, text }) => (
          <li key={title} className="rounded-2xl border border-line bg-white p-6">
            <Icon aria-hidden="true" className="size-7 text-gold-700" strokeWidth={1.75} />
            <Heading className="mt-4 text-2xl">{title}</Heading>
            <p className="mt-2">{text}</p>
          </li>
        ))}
      </ul>
      <ReviewFlag kind="draft" className="mt-5" />
    </div>
  );
}
