export const SmallAuthorListItems = ({ author }: { author: Author }) => {
  const { name, age } = author;

  return (
    <p>
      Name: {name} - Age: {age}
    </p>
  );
};
