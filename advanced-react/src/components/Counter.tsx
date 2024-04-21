import { useState, useEffect } from "react";
import { emitter } from "./ObserverPattern";

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const onIncrement = () => setCount((prevCount) => prevCount + 1);
    const onDecrement = () => setCount((prevCount) => prevCount - 1);

    emitter.on("inc", onIncrement);
    emitter.on("dec", onDecrement);

    return () => {
      emitter.off("inc", onIncrement);
      emitter.off("dec", onDecrement);
    };
  }, []);

  return (
    <div>
      <h1>{count}</h1>
    </div>
  );
};

export default Counter;
