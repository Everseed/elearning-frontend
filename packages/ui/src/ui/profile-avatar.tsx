import { cn } from "@ng-youth/lib/utils";
import { CSSProperties } from "react";

export function ProfileAvatar({
  src,
  prefix,
  className,
  style,
}: {
  src?: string;
  prefix?: string;
  className?: string;
  style?: CSSProperties;
}) {
  if (src) {
    return (
      <img
        src={src}
        alt="Avatar"
        width={0}
        height={0}
        className={cn(
          "rounded-full border object-cover bg-muted size-[40px]",
          className,
        )}
        style={style}
      />
    );
  }
  return (
    <div
      className={cn(
        "size-[40px] bg-primary rounded-full uppercase text-primary-foreground place-content-center text-center border border-primary font-medium text-base",
        className,
      )}
      style={style}
    >
      {prefix}
    </div>
  );
}
