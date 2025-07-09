"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiArrowLeftRightFill } from "react-icons/ri";

export default function FilterCardBox({ children }) {
  return (
    <Card className="mb-6 border-2 border-gray-200 shadow-lg py-0 overflow-hidden gap-0">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200 !py-3 gap-0">
        <CardTitle className="text-center text-base md:text-lg font-semibold text-gray-800 flex items-center justify-center gap-2">
          <RiArrowLeftRightFill className="text-blue-600" />
          카드 필터
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
