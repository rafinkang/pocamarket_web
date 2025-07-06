"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function FilterCardBox({ children }) {
  return (
    <Card className="bg-card text-card-foreground flex gap-6 rounded-xl border py-6 shadow-sm">
      <CardContent className="flex justify-center items-center w-full px-2">
        <div className="flex gap-2 w-full justify-center items-center">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
