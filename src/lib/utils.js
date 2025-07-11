import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function copyToClipboard(text, successCallback, errorCallback) {
  navigator.clipboard.writeText(text)
    .then(() => {
      successCallback?.();
    })
    .catch(() => {
      errorCallback?.();
    });
}