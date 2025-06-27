"use client";

export default function SearchContainer({
  filterCardComponent: FilterCardComponent,
  sortComponent: SortComponent,
  filterComponent: FilterComponent,
  myCheckComponent: MyCheckComponent,
  buttonsComponent: ButtonsComponent,
}) {
  return (
    <SearchContainerContent
      filterCardComponent={FilterCardComponent}
      sortComponent={SortComponent}
      filterComponent={FilterComponent}
      myCheckComponent={MyCheckComponent}
      buttonsComponent={ButtonsComponent}
    />
  );
}

function SearchContainerContent({
  filterCardComponent: FilterCardComponent,
  sortComponent: SortComponent,
  filterComponent: FilterComponent,
  myCheckComponent: MyCheckComponent,
  buttonsComponent: ButtonsComponent,
}) {
  return (
    <section id="searchTradeCard" className="w-full min-w-[360px] flex flex-col gap-4">
      {FilterCardComponent && <FilterCardComponent />}
      <div className="w-full flex flex-col justify-end gap-4 md:flex-row md:gap-2">
        <div className="flex justify-end gap-2">
          {SortComponent && <SortComponent />}
          {FilterComponent && <FilterComponent />}
          {MyCheckComponent && <MyCheckComponent />}
        </div>
        {ButtonsComponent && <ButtonsComponent />}
      </div>
    </section>
  );
}
