import styled from "styled-components";

interface NumberedListProps {
  items: unknown[];
  sourceName: "author" | "book";
  ItemComponent: React.ElementType;
}

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Number = styled.h3`
  margin-right: 1rem;
`;

export const NumberedList = ({
  items,
  sourceName,
  ItemComponent,
}: NumberedListProps) => {
  return (
    <>
      {items.map((item, i) => (
        <Container key={i}>
          <Number>{i + 1}</Number>
          <ItemComponent key={i} {...{ [sourceName]: item }} />
        </Container>
      ))}
    </>
  );
};
