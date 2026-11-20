import TypewriterText, {
  type TypewriterSegment,
} from "./TypewriterText";

type HeadingTag = "h2" | "h3" | "h4" | "h5" | "h6";

interface SectionHeadingProps {
  first: string;
  second: string;
  as: HeadingTag;
  separator?: string;
  delay?: number;
  className?: string;
  id?: string;
}

export default function SectionHeading({
  first,
  second,
  as,
  separator = " ",
  delay = 0,
  className,
  id,
}: SectionHeadingProps) {
  const segments: TypewriterSegment[] = [
    { text: first, className: "hero-word" },
    { text: second, className: "hero-word accent" },
  ];

  return (
    <TypewriterText
      as={as}
      className={className}
      delay={delay}
      id={id}
      segments={segments}
      separator={separator}
    />
  );
}
