"use client";

export default function SearchContainer({
  findCardComponent: FindCardComponent,
  filterComponent: FilterComponent,
  buttonsComponent: ButtonsComponent,
}) {
  return (
    <SearchContainerContent
      findCardComponent={FindCardComponent}
      filterComponent={FilterComponent}
      buttonsComponent={ButtonsComponent}
    />
  );
}

function SearchContainerContent({
  findCardComponent: FindCardComponent,
  filterComponent: FilterComponent,
  buttonsComponent: ButtonsComponent,
}) {
  return (
    <section id="searchTradeCard" className="w-full">
      {FindCardComponent && <FindCardComponent />}
      {FilterComponent && <FilterComponent />}
      {ButtonsComponent && <ButtonsComponent />}
    </section>
  );
}
