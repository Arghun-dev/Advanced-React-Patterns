import { useState, useId } from "react";

// Problem: We have two forms in the component and both of them have an input field with the same id
// Solution: We can use the id attribute to uniquely identify the input fields
// we need to use useId hook to generate unique ids for each input field
// now when you click on each label it will focus on the respective input field
// But, if you have multiple input fields that you want to give random ids, you can use another useId hook - but there's a clearner way to do this

export const UseId = () => {
  return (
    <div>
      <Form />
      <p>This is for test!</p>
      <Form />
    </div>
  );
};

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const id = useId();

  return (
    <div>
      <label htmlFor={`${id}-name`}>Name</label>
      <input
        type="text"
        id={`${id}-name`}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor={`${id}-email`}>Email</label>
      <input
        type="email"
        id={`${id}-email`}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  );
};
