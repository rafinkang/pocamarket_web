"use client";

export default function CardList({ items, ItemComponent, testMode, showInfo }) {
  return (
    <section className="flex flex-col items-center w-full">
      <div className="w-full px-4 md:px-6">
        {items && items.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">포켓몬 카드</h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
              </div>
            </div>
            
            {/* 카드 그리드 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
              {items.map((item, index) => (
                <div
                  key={item.code || index}
                  className="group relative bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg hover:border-blue-300 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  {/* 카드 컴포넌트 */}
                  <div className="w-full">
                    {ItemComponent && (
                      <ItemComponent 
                        data={item} 
                        priority={index < 15} 
                        testMode={testMode} 
                        showInfo={showInfo}
                      />
                    )}
                  </div>
                  
                  {/* 호버 효과 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              검색 결과가 없습니다
            </h3>
            <p className="text-gray-500">
              다른 검색 조건을 시도해보세요
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

 