export const UnControlledForm = () => {
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };

  return (
    <form onSubmit={submitHandler}>
      <input type="text" name="name" placeholder="Name" />
      <input type="text" name="age" placeholder="Age" />
      <input type="submit" value="Submit" />
    </form>
  );
};
