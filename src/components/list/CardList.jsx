"use client";

const testMode = process.env.NODE_ENV === "development";

/**
 * 공통 리스트 컴포넌트
 * - items: 렌더링할 데이터 배열
 * - ItemComponent: 각 아이템을 렌더링할 컴포넌트
 * - onItemClick: 아이템 클릭 핸들러
 */
export default function CardList({ items, ItemComponent, onItemClick }) {
  const handleClick = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    if (onItemClick) {
      onItemClick(item);
    }
  };

  return (
    <section className="flex flex-col items-center w-full">
      <div className="contentList w-full px-[20px]">
        {items && items.length > 0 ? (
          <ul className="grid items-center justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {items.map((item, index) => (
              <li
                className="flex items-center justify-center w-full max-w-[300px]"
                key={item.code || index}
                onClick={(e) => handleClick(e, item)}
              >
                {ItemComponent && (
                  <ItemComponent data={item} priority={index < 15} testMode={testMode} />
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
    </section>
  );
}
