"use client";

import PokemonCard from "@/components/list/PokemonCard";
import {
  getPokemonElementName,
  getPokemonSubTypeName,
  getPokemonPackSetName,
  getPokemonPackName,
  COLORLESS,
  POKEMON_ELEMENT_CONFIG,
} from "@/constants/pokemon";
import RarityIcon from "@/components/icon/RarityIcon";
import ElementIcon from "@/components/icon/ElementIcon";

export default function CardDetailContainer({ data }) {
  const renderElementIcons = (cost) => {
    if (!cost) return null; // cost가 undefined인 경우 null 반환

    return cost.split(",").map((item, innerIdx) => (
      <ElementIcon
        key={`attack-icon-${innerIdx}`}
        element={item}
        className="mr-1 inline-block"
      />
    ));
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 카드 이미지 */}
        <div className="flex justify-center">
          <PokemonCard
            data={data}
            showInfo={false}
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>

        {/* 카드 상세 정보 */}
        <div className="p-4 bg-white rounded-lg shadow-inner">
          {/* 카드 이름 및 기본 정보 */}
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {data.nameKo} ({data.code})
            </h1>
            <div className="flex items-center justify-between">
              <span className="text-lg text-gray-600">
                <ElementIcon
                  element={data.element}
                  className="inline-block mr-1"
                />{" "}
                {getPokemonElementName(data.element)} /{" "}
                {getPokemonSubTypeName(data.subtype)}
              </span>
              <RarityIcon rarity={data.rarity} className="h-6 w-6" />
            </div>
          </div>

          {/* 특성 */}
          {data.abilityList && data.abilityList.length > 0 && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">특성</h2>
              {data.abilityList.map((ability, idx) => (
                <div
                  key={`ability-${idx}`}
                  className="bg-gray-50 p-3 rounded-md mb-2"
                >
                  <p className="font-medium text-gray-800">{ability.nameKo}</p>
                  <p className="text-gray-600">{ability.effectKo}</p>
                </div>
              ))}
            </div>
          )}

          {/* 스킬 */}
          {data.attackList && data.attackList.length > 0 && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">스킬</h2>
              {data.attackList.map((attack, idx) => (
                <div
                  key={`attack-${idx}`}
                  className="bg-gray-50 p-3 rounded-md mb-2"
                >
                  <div className="flex items-center mb-1">
                    {renderElementIcons(attack.cost)}
                    <span className="font-medium text-gray-800">
                      {attack.nameKo}
                    </span>
                  </div>
                  <p className="text-gray-600">{attack.effectKo}</p>
                </div>
              ))}
            </div>
          )}

          {/* 기타 정보 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">기타 정보</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
              <li>HP: {data.health}</li>
              <li>
                약점:{" "}
                <ElementIcon
                  element={data.weakness}
                  className="inline-block mr-1"
                />{" "}
                {getPokemonElementName(data.weakness)}
              </li>
              <li>
                후퇴비용:{" "}
                <ElementIcon element={COLORLESS} loop={data.retreatCost} className="inline-block mr-1" />
                {data.retreatCost}
              </li>
              <li>확장팩: {getPokemonPackSetName(data.packSet)}</li>
              {data.pack && <li>팩: {getPokemonPackName(data.pack)}</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
