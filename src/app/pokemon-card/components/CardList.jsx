"use client";

export default function CardList({ cardList, CardComponent }) {
  return (
    <>
      <div className="flex flex-col items-center w-full">
        <div className="contentList w-full px-[20px]">
          {cardList && cardList.length > 0 ? (
            <ul className="grid items-center justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {cardList.map((card, index) => (
                <li
                  className="flex items-center justify-center w-full max-w-[300px]"
                  key={card.code}
                >
                  {CardComponent && (
                    <CardComponent data={card} priority={index < 15} />
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-10 text-gray-400 text-lg text-center">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
