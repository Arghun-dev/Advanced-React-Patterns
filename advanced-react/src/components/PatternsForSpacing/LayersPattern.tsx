import { styled } from "styled-components";

const spaceSchema = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "2rem",
  xl: "4rem",
};

interface LayerProps {
  gutter?: keyof typeof spaceSchema;
}

const Layer = styled.div<LayerProps>`
  display: grid;
  gap: ${(props) => spaceSchema[props.gutter ?? "md"]};
`;

export const LayersPattern = () => {
  return (
    <Layer>
      <h1>Title</h1>
      <Layer gutter="xs">
        <h3>Subtitle</h3>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit
          blanditiis, enim quam quis, quisquam quos nulla est ea, sapiente
          laudantium dolor omnis possimus sint provident. Voluptatum blanditiis
          magnam tempora perspiciatis!
        </p>
      </Layer>

      <Layer gutter="lg">
        <Layer gutter="sm">
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Name" />
        </Layer>

        <button>submit form</button>
      </Layer>
    </Layer>
  );
};
