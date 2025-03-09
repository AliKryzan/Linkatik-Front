import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const validateNumbersOnly = (e: React.ChangeEvent<HTMLInputElement>) => {
  // Remove any non-numeric characters
  e.target.value = e.target.value.replace(/[^0-9]/g, "");
};