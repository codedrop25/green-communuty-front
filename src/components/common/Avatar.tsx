import Image from "next/image";
import { cn } from "@/lib/utils";

type AvatarProps = {
  nickname: string;
  imageUrl?: string;
  size?: 24 | 28 | 32;
  isCurrentUser?: boolean;
  className?: string;
};

const sizes = {
  24: "size-6",
  28: "size-7",
  32: "size-8",
};

export function Avatar({
  nickname,
  imageUrl,
  size = 28,
  isCurrentUser = false,
  className,
}: AvatarProps) {
  return (
    <span
      aria-label={`${nickname} 프로필`}
      className={cn(
        "relative grid shrink-0 place-items-center overflow-hidden rounded-full text-[11px] font-semibold",
        isCurrentUser ? "bg-green-100 text-green-800" : "bg-surface-muted text-fg-secondary",
        sizes[size],
        className,
      )}
    >
      {imageUrl ? (
        <Image src={imageUrl} alt="" width={size} height={size} className="size-full object-cover" />
      ) : (
        nickname.trim().slice(0, 1)
      )}
    </span>
  );
}
