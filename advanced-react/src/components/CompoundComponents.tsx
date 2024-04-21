import { createContext, useContext } from "react";

const CardContext = createContext({ name: "" });

const CardProvider = CardContext.Provider;

const Header = ({ children }) => {
  const { name } = useContext(CardContext);
  return (
    <div style={{ backgroundColor: "lightblue" }}>
      {children}
      {name}
    </div>
  );
};

const Body = ({ children }) => {
  return <div style={{ backgroundColor: "lightgreen" }}>{children}</div>;
};

const Footer = ({ children }) => {
  return <div style={{ backgroundColor: "lightcoral" }}>{children}</div>;
};

const Card = ({ children }) => {
  return (
    <CardProvider value={{ name: "arghun" }}>
      <div style={{ border: "1px solid black" }}>{children}</div>
    </CardProvider>
  );
};

export default Card;

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;
