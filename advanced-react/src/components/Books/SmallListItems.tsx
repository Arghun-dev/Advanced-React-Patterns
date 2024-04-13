export const SmallBookListItem = ({ book }: { book: Book }) => {
  const { name, price } = book;

  return (
    <h2>
      {name} / {price}
    </h2>
  );
};
