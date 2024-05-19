import "./ElementProp.css";

interface ButtonProps {
  As?: React.ElementType;
  size?: "s" | "m" | "l" | "xl";
  text: string;
  classname?: string;
}

export const Button = ({
  As = "button",
  size = "m",
  text,
  classname,
  ...otherProps
}: ButtonProps) => {
  return (
    <As {...otherProps} className={`button ${size} ${classname}`}>
      {text}
    </As>
  );
};
