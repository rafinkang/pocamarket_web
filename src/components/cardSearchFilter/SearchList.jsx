"use client";

import { Form } from "@/components/ui/form";

export default function SearchList({
  form,
  filterComponents,
  sortComponents,
  onSubmit,
}) {
  return (
    <div className="w-full">
      <Form {...form}>
        <form
          method="GET"
          autoComplete="off"
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-1"
        >
          {/* 첫 번째 줄: 검색 + 상세필터 버튼 */}
          {filterComponents && filterComponents.length > 0 && (
            <div className="w-full">
              {filterComponents.map(({ Component, props }, index) => {
                // 첫 번째 컴포넌트는 항상 표시 (SearchArea)
                if (index === 0) {
                  return (
                    <div key={index} className="w-full">
                      <Component {...props} />
                    </div>
                  );
                }
                return null;
              })}
            </div>
          )}

          {/* 상세필터 영역 - 펼쳐질 때만 표시 */}
          {filterComponents && filterComponents.length > 1 && (
            <div className="w-full">
              {filterComponents.map(({ Component, props }, index) => {
                // 나머지 컴포넌트들은 open 상태일 때만 표시 (FilterArea)
                if (index > 0 && props.open) {
                  return (
                    <div key={index} className="w-full bg-gray-50 rounded-lg border border-gray-200 p-4 shadow-sm">
                      <Component {...props} />
                    </div>
                  );
                }
                return null;
              })}
            </div>
          )}

          {/* 두 번째 줄: 검색갯수 + 정렬 */}
          {sortComponents && sortComponents.length > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-2">
              {sortComponents.map(({ Component, props }, index) => (
                <div key={index} className="w-full">
                  <Component {...props} />
                </div>
              ))}
            </div>
          )}

        </form>
      </Form>
    </div>
  );
}