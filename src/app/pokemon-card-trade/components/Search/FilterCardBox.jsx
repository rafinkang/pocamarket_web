"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function FilterCardBox({ children }) {
  return (
    <Card>
      <CardContent className="w-full flex justify-center items-center gap-4">
        <div className="flex justify-center items-center gap-4">{children}</div>
      </CardContent>
    </Card>
  );
}
