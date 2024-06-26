// Let's see how partialComopnent can actually help to improve composition pattern.
export const partialComopnent = (Component, partialProps) => {
  return (props) => <Component {...partialProps} {...props} />;
};

export const Button = ({ size, color, text, ...props }) => {
  return (
    <button
      style={{
        fontSize: size === "small" ? "12px" : "16px",
        padding: size === "small" ? "4px 8px" : "8px 16px",
        backgroundColor: color === "red" ? "red" : "blue",
        color: "white",
        border: "none",
        borderRadius: "4px",
      }}
      {...props}
    >
      {text}
    </button>
  );
};

// export const RedButton = (props) => {
//   return <Button color="red" {...props} />;
// };

// export const SmallGreenButton = (props) => {
//   return <Button size="small" color="green" {...props} />;
// };

// How to use it

// import { Button, RedButton, SmallGreenButton } from "./components/Composition";

// const App = () => {
//   return (
//     <div>
//       <Button text="Click me" />
//       <RedButton text="Click me" />
//       <SmallGreenButton text="Click me" />

/** partialComopnent pattern actually improves composionComponent pattern and we can use them together */

export const RedButton = partialComopnent(Button, { color: "red" });
export const SmallRedButton = partialComopnent(RedButton, { size: "small" });
