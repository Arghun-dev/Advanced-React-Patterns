import styled from "styled-components";
import { spaceSchema } from "../../utils/spaceSchema";

// Define the breakpoints for responsiveness
const breakpoints = {
  desktop: "1024px",
  tablet: "768px",
  mobile: "480px",
};

interface ColumnsProps {
  gutter?: keyof typeof spaceSchema;
  columns?: number;
}

interface ColumnProps {
  $span?: number;
  desktop?: number;
  tablet?: number;
  mobile?: number;
}

const Columns = styled.div<ColumnsProps>`
  --columns: ${({ columns = 1 }) => columns};
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  gap: ${(props) => spaceSchema[props.gutter ?? "md"]};

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
  }

  @media (min-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(var(--columns), 1fr);
    grid-template-rows: none;
  }
`;

const Column = styled.div<ColumnProps>`
  grid-column: span ${({ $span = 1 }) => $span};

  @media (min-width: ${breakpoints.mobile}) {
    grid-column: span ${({ mobile, $span = 1 }) => mobile ?? $span};
  }

  @media (min-width: ${breakpoints.tablet}) {
    grid-column: span ${({ tablet, $span = 1 }) => tablet ?? $span};
  }

  @media (min-width: ${breakpoints.desktop}) {
    grid-column: span ${({ desktop, $span = 1 }) => desktop ?? $span};
  }
`;

export const ColumnsPattern = () => {
  return (
    <Columns columns={5}>
      <Column desktop={3} tablet={2} mobile={5}>
        <div style={{ backgroundColor: "red" }}>1</div>
      </Column>
      <Column desktop={1} tablet={1} mobile={5}>
        <div style={{ backgroundColor: "yellow" }}>2</div>
      </Column>
      <Column desktop={1} tablet={1} mobile={5}>
        <div style={{ backgroundColor: "green" }}>3</div>
      </Column>
    </Columns>
  );
};
