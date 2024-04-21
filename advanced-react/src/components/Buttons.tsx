import { emitter } from "./ObserverPattern";

const Buttons = () => {
  const onIncrement = () => {
    emitter.emit("inc");
  };

  const onDecrement = () => {
    emitter.emit("dec");
  };

  return (
    <div>
      <button onClick={onIncrement}>Increment</button>
      <button onClick={onDecrement}>Decrement</button>
    </div>
  );
};

export default Buttons;
