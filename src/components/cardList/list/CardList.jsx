"use client";

export default function CardList({ items, ItemComponent, testMode, showInfo }) {

  return (
    <section className="flex flex-col items-center w-full">
      <div className="contentList w-full px-[20px]">
        {items && items.length > 0 ? (
          <ul className="grid items-top justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {items.map((item, index) => (
              <li
                className="flex items-center justify-center w-full max-w-[300px]"
                key={item.code || index}
              >
                {ItemComponent && (
                  <ItemComponent 
                    data={item} 
                    priority={index < 15} 
                    testMode={testMode} 
                    showInfo={showInfo}
                    />
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