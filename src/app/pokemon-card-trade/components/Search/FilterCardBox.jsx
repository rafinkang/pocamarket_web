"use client";

import { Card, CardContent } from "@/components/ui/card";

//grid-rows-[1fr_auto_3fr] grid-cols-1 gap-4

export default function FilterCardBox({ children }) {
  return (
    <Card className="bg-card text-card-foreground flex gap-6 rounded-xl border py-6 shadow-sm filterCardBox">
      <CardContent className="flex justify-center items-center w-full px-2">
        <div className="grid items-center justify-items-center w-full
            grid-cols-[1fr_auto_1fr] gap-2 
            md:grid-rows-1 md:grid-cols-[1fr_auto_3fr] md:gap-4 md:max-w-4xl md:mx-auto"
          >
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
