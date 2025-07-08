"use client";

import React from "react";

export default function CardList({ items, ItemComponent, testMode, showInfo }) {
  return (
    <>
      {items && items.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {items.map((item, index) => (
            <div
              key={item.code || index}
              className="group relative hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{
                animationDelay: `${index * 50}ms`
              }}
            >
              {ItemComponent && React.createElement(ItemComponent, {
                data: item,
                priority: index < 15,
                testMode: testMode,
                showInfo: true
              })}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-3">
            <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            검색 결과가 없습니다
          </h3>
          <p className="text-gray-500 text-sm">
            다른 검색 조건을 시도해보세요
          </p>
        </div>
      )}
    </>
  );
}

