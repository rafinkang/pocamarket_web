"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { POKEMON_CARD_TRADE } from "@/constants/path";

export default function Buttons({ handleReset }) {
  return (
    <div className="buttonContainer flex items-right gap-4 justify-end px-4">
      <Button type="submit" className="ml-2">
        검색
      </Button>
      <Button
        type="button"
        className="ml-4 bg-gray-300 text-black"
        onClick={handleReset}
      >
        초기화
      </Button>
      <Link href={`${POKEMON_CARD_TRADE}/write`}>
        <Button type="button" className="ml-2">
          교환 등록
        </Button>
      </Link>
    </div>
  );
}
