import { useState, useDeferredValue, Suspense, memo } from "react";

/**
 * The useDeferredValue hook in React is used to defer updating a value until less urgent updates have been processed. This hook is useful for improving the performance of your application by avoiding expensive computations or re-renders in response to changes in the state that don't need to be updated immediately.
 * Definition: useDeferredValue accepts a value and returns a new copy of the value that will defer updating until the more urgent updates (like input events) have been processed.
 * UseCase: This hook is particularly useful in scenarios where you have an expensive computation or a list rendering that depends on a value that changes frequently, such as a search input.
 */

export const UseDeferredValue = () => {
  const [value, setValue] = useState("");

  const deferredValue = useDeferredValue(value);

  return (
    <>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ width: "100%" }}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <MemoizedHeavyComponent text={deferredValue} />
      </Suspense>
    </>
  );
};

const HeavyComponent = ({ text }: { text: string }) => {
  const initialTime = performance.now();
  while (initialTime > performance.now() - 100) {
    // Heavy computation
  }

  return (
    <>
      <h1>HeavyComponent</h1>
      <p>{text}</p>
    </>
  );
};

const MemoizedHeavyComponent = memo(HeavyComponent);
