// in this component I want to have a button (show) and whenever user clicks on it, the input to be shown and focues automatically.
// interestingly, useCallback to achieve this.
// As soon as the input is shown, the input field will be focused automatically. It's going to do this input.focus() whenever the input is shown.
// So the idea of using useCallback in this way is that whenever you want to perform an action on an element right after it's rendered, you can pass a useCallback to that element like below:
// But keep in mind that inputRef is not actual a ref, means you can not run inputRef.current.focus() on it.

import { useCallback, useState } from "react";

export const UseCallbackRef = () => {
  const [show, setShow] = useState(false);
  const inputRef = useCallback((input: HTMLInputElement) => {
    if (input) {
      input.focus();
    }
  }, []);

  return (
    <div>
      <button onClick={() => setShow(!show)}>Show</button>
      {show && <input ref={inputRef} />}
    </div>
  );
};
