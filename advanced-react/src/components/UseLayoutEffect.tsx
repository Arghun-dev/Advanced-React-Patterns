import { useEffect, useLayoutEffect, useRef, useState } from "react";

// This component is used to demonstrate the usage of useLayoutEffect in React
// useEffect runs after the render is committed to the screen
// useLayoutEffect runs before the render is committed to the screen

// useLayoutEffect is synchronous and runs immediately after the DOM has been updated
// useEffect is asynchronous and runs after the DOM has been updated
// useLayoutEffect is blocking and can pause the painting of the screen
// useEffect is non-blocking and does not pause the painting of the screen
// So, whenever you need to do something immediately after the DOM has been updated, you should use useLayoutEffect
// If you don't need to do something immediately after the DOM has been updated, you should use useEffect
// useLayoutEffect is useful when you need to measure the size or position of an element after it has been updated
// useEffect is useful when you need to fetch data or update the state after the DOM has been updated

export const UseLayoutEffect = () => {
  const [show, setShow] = useState(false);
  const [top, setTop] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    if (buttonRef.current === null || !show) {
      setTop(0);
    } else {
      const { bottom } = buttonRef.current.getBoundingClientRect();
      setTop(bottom + 30);
    }
  }, [show]);

  const now = performance.now();
  while (performance.now() - now < 100) {
    // Artificial delay -- do nothing
  }

  return (
    <div>
      <button ref={buttonRef} onClick={() => setShow(!show)}>
        Toggle
      </button>
      <div style={{ position: "absolute", top }}>{show ? "Hello!" : null}</div>
    </div>
  );
};
