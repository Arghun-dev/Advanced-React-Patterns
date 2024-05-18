import { useState } from "react";

// This component is used to demonstrate the usage of keys in React
// Whenever the key changes, the component is re-rendered
// This is why we use keys when we loop over or map over arrays in React.

export const Keys = () => {
  const [changeShirts, setChangeShirts] = useState(false);

  return (
    <div>
      {changeShirts ? (
        <span>
          Shirts count: <Count key="shirts" />
        </span>
      ) : (
        <span>
          Shoes count: <Count key="shoes" />
        </span>
      )}
      <button onClick={() => setChangeShirts(!changeShirts)}>switch</button>
    </div>
  );
};

const Count = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>increment</button>
    </div>
  );
};
