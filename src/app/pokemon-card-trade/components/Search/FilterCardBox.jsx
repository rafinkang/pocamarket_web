"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function FilterCardBox({ children }) {
  return (
    <Card className="border-2 border-gray-200 shadow-lg py-0 overflow-hidden gap-0">
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
