"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { POKEMON_CARD_TRADE } from "@/constants/path";

export default function Buttons({ onSumbmit, onReset }) {
  return (
    <div className="flex items-center gap-4 justify-end">
      <Button type="submit" onClick={onSumbmit}>
        검색
      </Button>
      <Button
        type="button"
        className="bg-gray-300 text-black"
        onClick={onReset}
      >
        초기화
      </Button>
      <Link href={`${POKEMON_CARD_TRADE}/write`}>
        <Button type="button">교환 등록</Button>
      </Link>
    </div>
  );
}
