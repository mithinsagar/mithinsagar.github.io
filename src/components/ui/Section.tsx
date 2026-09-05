import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[88rem] px-6 md:px-10 ${className}`}>{children}</div>
  );
}

export default function Section({
  children,
  className = "",
  id,
  bleed = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  bleed?: boolean;
}) {
  return (
    <section id={id} className={`relative py-20 md:py-28 lg:py-32 ${className}`}>
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}
