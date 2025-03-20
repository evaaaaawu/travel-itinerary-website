import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
  isFavorite: boolean;
  title: string;
  authorLabel: string;
  createdAtLabel: string;
  onClick: () => void;
  disabled: boolean;
}

export const Footer = ({
  isFavorite,
  title,
  authorLabel,
  createdAtLabel,
  onClick,
  disabled,
}: FooterProps) => {
  return (
    <div className="relative bg-white p-3">
      <p className="text-[13px] truncate max-w-[calc(100%-20px)]">
        {title}
      </p>
      <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate">
        {authorLabel}, {createdAtLabel}
      </p>
      <button
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-red-500",
          disabled && "cursor-not-allowed opacity-75"
        )}
      >
        <Heart
          className={cn(
            "w-4 h-4",
            isFavorite && "fill-red-500 text-red-500"
          )}
        />
      </button>
    </div>
  );
};
