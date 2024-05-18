import { forwardRef, useRef } from "react";

const Input = forwardRef<HTMLInputElement, any>((props, ref) => {
  return <input ref={ref} {...props} />;
});

export const ForwardRef = () => {
  const inputRef = useRef<HTMLInputElement>(null); // Provide type for inputRef
  const handleClick = () => {
    inputRef.current?.focus(); // Access focus method directly
  };

  return (
    <div>
      <Input ref={inputRef} type="text" />
      <button onClick={handleClick}>Focus</button>
    </div>
  );
};
