import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Reveal } from "./motion";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  className?: string;
  dark?: boolean;
};

export function SectionHeading({ eyebrow, title, description, id, className, dark }: Props) {
  return (
    <Reveal className={cn("flex max-w-[720px] flex-col gap-3.5", className)}>
      {eyebrow ? <p className={cn("eyebrow", dark && "!text-accent-soft")}>{eyebrow}</p> : null}
      <h2 id={id} className={cn("m-0 text-head", dark && "!text-bg")}>
        {title}
      </h2>
      {description ? <p className={cn("m-0 text-lead", dark ? "text-on-dark" : "text-body")}>{description}</p> : null}
    </Reveal>
  );
}
