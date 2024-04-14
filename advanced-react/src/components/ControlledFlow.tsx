import { isValidElement, Children, cloneElement } from "react";

export const ControlledFlow = ({ children, onDone, currentIndex, onNext }) => {
  const currentChild = Children.toArray(children)[currentIndex];

  const goNext = (dataFromStep) => {
    onNext(dataFromStep);
  };

  if (isValidElement(currentChild)) {
    return cloneElement(currentChild, { goNext });
  }

  return currentChild;
};
