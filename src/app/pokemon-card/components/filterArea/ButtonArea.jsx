"use client";

import ResetButton from "@/components/cardList/search/button/ResetButton";
import SubmitButton from "@/components/cardList/search/button/SubmitButton";

export default function ButtonArea({ onReset }) {
  return (
    <div className="buttonContainer flex items-right gap-4 justify-end">
      <ResetButton onReset={onReset} />
      <SubmitButton />
    </div>
  );
}
