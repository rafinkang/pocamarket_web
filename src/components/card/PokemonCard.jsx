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
      className={`flex flex-col items-center py-0 gap-0 w-full bg-white shadow-none border-none ${props.className || ""}`}
    >
      <CardHeader className="p-0 gap-0 w-full">
        <PokemonCardImage
          data={data}
          priority={priority}
          testMode={testMode}
          className="w-full object-contain rounded-t-lg"
        />
      </CardHeader>
      {showInfo && (
        <CardContent className="w-full flex-1 flex flex-col justify-between p-1 text-center">
          <CardTitle className="text-sm font-semibold text-gray-800 line-clamp-1">
            {data?.nameKo ? data.nameKo : "포켓몬 이름"}
          </CardTitle>
          <CardDescription className="flex flex-col">
            {data?.packSet && (
              <div className="">
                <p className="text-xs text-gray-600 font-medium truncate">
                  {getPokemonPackSetName(data.packSet)}
                  {data?.pack && ` - ${getPokemonPackName(data.pack)}`}
                </p>
              </div>
            )}
            <div className="flex items-center justify-center">
              {data?.rarity ? (
                <div className="">
                  <RarityIcon rarity={data?.rarity} size={18} />
                </div>
              ) : (
                <span className="text-gray-400 text-xs">-</span>
              )}
            </div>
          </CardDescription>
        </CardContent>
      )}
    </Card>
  );
}
