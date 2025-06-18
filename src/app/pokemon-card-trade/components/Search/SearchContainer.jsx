"use client";

export default function SearchContainer({
  findCardComponent: FindCardComponent,
  sortComponent: SortComponent,
  filterComponent: FilterComponent,
  buttonsComponent: ButtonsComponent,
}) {
  return (
    <SearchContainerContent
      findCardComponent={FindCardComponent}
      sortComponent={SortComponent}
      filterComponent={FilterComponent}
      buttonsComponent={ButtonsComponent}
    />
  );
}

function SearchContainerContent({
  findCardComponent: FindCardComponent,
  sortComponent: SortComponent,
  filterComponent: FilterComponent,
  buttonsComponent: ButtonsComponent,
}) {
  return (
    <section id="searchTradeCard" className="w-full flex flex-col gap-4">
      {FindCardComponent && <FindCardComponent />}
      <div className="flex justify-end gap-2">
        {SortComponent && <SortComponent />}
        {FilterComponent && <FilterComponent />}
        {ButtonsComponent && <ButtonsComponent />}
      </div>
    </section>
  );
}
