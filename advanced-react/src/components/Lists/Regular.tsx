interface RegularListProps {
  items: unknown[];
  sourceName: "book" | "author";
  ItemComponent: React.ElementType;
}

export const RegularList = ({
  items,
  sourceName,
  ItemComponent,
}: RegularListProps) => {
  return (
    <>
      {items.map((item, i) => (
        <ItemComponent key={i} {...{ [sourceName]: item }} />
      ))}
    </>
  );
};
