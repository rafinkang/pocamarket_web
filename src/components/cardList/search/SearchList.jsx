"use client";

import { Form } from "@/components/ui/form";

export default function SearchList({
  form,
  filterComponents,
  sortComponents,
  onSubmit,
}) {
  return (
    <>
      <div className="w-full flex flex-col">
        <Form {...form}>
          <div className="w-full flex flex-col">
            <form
              method="GET"
              autoComplete="off"
              noValidate
              onSubmit={form.handleSubmit(onSubmit)}
              className={`flex flex-col gap-2`}
            >
              {filterComponents && filterComponents.length > 0 && (
              <div className="flex flex-col gap-6 bg-[#f7f7f7] p-4 rounded">
                {filterComponents.map(({ Component, props }, index) => (
                  <Component key={index} {...props} />
                ))}
              </div>
              )}
              {sortComponents && sortComponents.length > 0 && (
              <div className="flex flex-col">
                {sortComponents.map(({ Component, props }, index) => (
                  <Component key={index} {...props} />
                ))}
              </div>
              )}
            </form>
          </div>
        </Form>
    </div>
  </>
  );
}