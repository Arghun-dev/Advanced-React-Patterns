import mitt from "mitt";
import Buttons from "./Buttons";
import Counter from "./Counter";

export const emitter = mitt();

const ParentComponent = () => {
  return (
    <>
      <Buttons />
      <Counter />
    </>
  );
};

export default ParentComponent;
