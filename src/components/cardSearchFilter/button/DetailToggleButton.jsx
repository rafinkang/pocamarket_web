"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function DetailToggleButton({
  setOpen,
  closeText = "상세 필터 ▼",
  openText = "상세 필터 ▲",
}) {
  const [myText, setMyText] = useState(closeText);

  return (
    <div className="flex gap-2">
      <Button
        type="button"
        className="px-3 py-1 bg-gray-300 text-black"
        onClick={() => {
          setMyText(myText === closeText ? openText : closeText);
          setOpen((is) => !is);
        }}
      >
        {myText}
      </Button>
    </div>
  );
}
