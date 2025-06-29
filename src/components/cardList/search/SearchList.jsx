"use client";

import { Form } from "@/components/ui/form";

export default function SearchList({
  form,
  filterComponents: FilterComponents,
  sortComponents: SortComponents,
  onSubmit,
}) {
  return (
    <>
      <div className="w-full flex flex-col gap-6">
        <Form {...form}>
          <div className="w-full flex flex-col gap-4">
            <form
              method="GET"
              autoComplete="off"
              noValidate
              onSubmit={form.handleSubmit(onSubmit)}
              className={`flex flex-col gap-6`}
            >
              <div className="flex flex-col gap-6 bg-[#f7f7f7] p-4 rounded">
                {FilterComponents.map(({ Component, props }, index) => (
                  <Component key={index} {...props} />
                ))}
              </div>
              
              <div className="flex flex-col gap-6">
                {SortComponents.map(({ Component, props }, index) => (
                  <Component key={index} {...props} />
                ))}
              </div>
            </form>
          </div>
        </Form>
    </div>
  </>
  );
}