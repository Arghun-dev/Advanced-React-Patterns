// Bubble Event
export const EventListeners = () => {
  // If you click the button, the event will bubble up to the outer div and the event listener on the outer div will be triggered.
  // This is called event bubbling. The event bubbles up from the target element to the parent elements. So, the event will be triggered on the target element first and then on the parent elements.
  // So, first inner button event listener will be triggered and then the outer div event listener will be triggered.
  return (
    <div onClick={() => console.log("outer div")}>
      <button onClick={() => console.log("inner button")}>Click</button>
    </div>
  );
};

// Capture Event
export const EventListenersTopToBottom = () => {
  // Here, we are using onClickCapture instead of onClick. The onClickCapture event listener is triggered from the top of the DOM tree to the target element.
  return (
    <div onClickCapture={() => console.log("outer div")}>
      <button onClick={() => console.log("inner button")}>Click</button>
    </div>
  );
};
