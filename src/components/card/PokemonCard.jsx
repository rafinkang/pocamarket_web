"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PokemonCardImage from "@/components/cardImage/PokemonCardImage";

import RarityIcon from "@/components/icon/RarityIcon";

import { getPokemonPackName, getPokemonPackSetName } from "@/constants/pokemon";

export default function PokemonCard({
  data,
  priority = false,
  testMode = false,
  showInfo = true,
  ...props
}) {
  return (
    <Card
      className={`flex flex-col items-center py-0 gap-0 max-w-[366px] w-[inherit] ${
        !showInfo ? "shadow-none border-none" : ""
      } ${props.className}`}
    >
      <CardHeader className="p-0 gap-0 w-full">
        <PokemonCardImage
          data={data}
          priority={priority}
          testMode={testMode}
          className="w-full object-contain"
        />
      </CardHeader>
      {showInfo && (
        <CardContent className="w-full flex-1 flex flex-col justify-between mt-2 text-center">
          <CardTitle>{data?.nameKo ? data.nameKo : "포켓몬 이름"}</CardTitle>
          <CardDescription className="flex flex-col">
            {data?.packSet && (
              <p className="truncate">
                {getPokemonPackSetName(data.packSet)}
                {data?.pack && ` - ${getPokemonPackName(data.pack)}`}
              </p>
            )}
            <div className="h-[22px]">
              {data?.rarity ? (
                <RarityIcon rarity={data?.rarity} size={20} />
              ) : (
                <span className="text-gray-400">-</span>
              )}
            </div>
          </CardDescription>
        </CardContent>
      )}
    </Card>
  );
}
