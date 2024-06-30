import { styled } from "styled-components";
import { fractionSchema, spaceSchema } from "../../utils/spaceSchema";
import { Layer } from "./LayersPattern";

interface SplitProps {
  gutter?: keyof typeof spaceSchema;
  fraction?: keyof typeof fractionSchema;
}

export const Split = styled.div<SplitProps>`
  display: grid;
  gap: ${(props) => spaceSchema[props.gutter ?? "md"]};
  grid-template-columns: ${(props) => fractionSchema[props.fraction ?? "1/2"]};
`;

export const SplitScreen = () => (
  <Split fraction="2/3">
    <div>
      <h3>General info</h3>
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat dolorem
        omnis sequi iusto reiciendis, amet asperiores recusandae officiis
        aliquam impedit quidem, rem labore ipsam! Voluptatum aperiam blanditiis
        qui nisi optio!
      </span>
    </div>
    <form>
      <Layer gutter="xl">
        <Layer>
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Name" />
        </Layer>
        <Layer>
          <button>submit form</button>
        </Layer>
      </Layer>
    </form>
  </Split>
);
