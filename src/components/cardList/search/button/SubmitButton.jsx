"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SubmitButton({ className }) {
  return (
    <Button type="submit" className={cn("ml-2", className)}>
      검색
    </Button>
  );
}
