import { styled } from "styled-components";

interface LayerProps {
  gutter?: string;
}

const Layer = styled.div<LayerProps>`
  display: grid;
  gap: ${(props) => props.gutter ?? "1rem"};
`;

export const LayersPattern = () => {
  return (
    <Layer>
      <h1>Title</h1>
      <Layer gutter="0">
        <h3>Subtitle</h3>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit
          blanditiis, enim quam quis, quisquam quos nulla est ea, sapiente
          laudantium dolor omnis possimus sint provident. Voluptatum blanditiis
          magnam tempora perspiciatis!
        </p>
      </Layer>

      <Layer gutter="2rem">
        <Layer gutter="0.5rem">
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Name" />
        </Layer>

        <button>submit form</button>
      </Layer>
    </Layer>
  );
};
