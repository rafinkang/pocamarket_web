"use client";

export default function CardList({ cardList, CardComponent, totalCount }) {
  return (
    <>
      <div className="flex flex-col items-center w-full">
        <h1>Card List</h1>
        <div>
          <span>
            총 {totalCount ? totalCount : 0}개의 카드가 검색되었습니다.
          </span>
        </div>
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
