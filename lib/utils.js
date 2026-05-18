import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility: merge Tailwind classes safely (handles conflicts correctly).
 * Usage: cn("px-4 py-2", conditional && "bg-blue-500", "text-white")
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
