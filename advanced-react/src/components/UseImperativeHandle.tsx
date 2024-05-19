import React, { useImperativeHandle } from "react";

// useImperativeHandle allows you to define the methods that should be accessible through a ref from the parent component. It lets you customize what the parent component can do with the child component's instance.

/**
 * Syntax
 * useImperativeHandle(ref, createHandle, [dependencies])
 *
 * ref: The ref object passed from the parent component.
 * createHandle: A function that returns an object containing the methods and properties you want to expose.
 * [dependencies]: An optional array of dependencies that, when changed, will recreate the handle.
 */

// Example1: A simple input component that exposes a focus method and a value property.

// const CustomInput = React.forwardRef((props, ref) => {
//   const inputRef = React.useRef<HTMLInputElement>(null);

//   useImperativeHandle(ref, () => {
//     return {
//       focus: () => {
//         inputRef?.current?.focus();
//       },

//       value: () => inputRef?.current?.value,
//     };
//   });

//   return <input ref={inputRef} />;
// });

// export const UseImperativeHandle = () => {
//   const inputRef = React.useRef();

//   const handleFocus = () => {
//     inputRef.current?.focus();
//   };

//   const getValue = () => {
//     alert(inputRef.current?.value());
//   };

//   return (
//     <>
//       <CustomInput ref={inputRef} />
//       <button onClick={handleFocus}>Focus on custom input</button>
//       <button onClick={getValue}>Get the Value of the custom input</button>
//     </>
//   );
// };

// Example2: Custom button component that I want to expose two methods of focus and click to the parent component.
const CustomButton = React.forwardRef((props, ref) => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        buttonRef?.current?.focus();
      },

      click: () => {
        buttonRef?.current?.click();
      },
    };
  });

  return <button ref={buttonRef}>Custom Button</button>;
});

export const UseImperativeHandle = () => {
  const buttonRef = React.useRef();

  const handleFocus = () => {
    buttonRef.current?.focus();
  };

  const handleClick = () => {
    buttonRef.current?.click();
  };

  return (
    <>
      <CustomButton ref={buttonRef} />
      <button onClick={handleFocus}>Focus on custom button</button>
      <button onClick={handleClick}>Click on custom button</button>
    </>
  );
};

// This demonstrates how useImperativeHandle can be used to expose custom methods from a child component to a parent, enabling more controlled and specific imperative interactions.
// In this example, the CustomButton component exposes two methods, focus and click, that can be called from the parent component.
