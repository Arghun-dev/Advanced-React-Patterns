import { includeUpdatableResource } from "./HOC/includeUpdatableResource";

export const UserForm = includeUpdatableResource(
  ({ user, onChangeUser, onPostUser, onResetUser }) => {
    const { name, age } = user || {};

    return user ? (
      <>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(event) => onChangeUser({ name: event.target.value })}
        />
        <input
          type="text"
          name="age"
          placeholder="Age"
          value={age}
          onChange={(event) => onChangeUser({ age: event.target.value })}
        />
        <button type="button" onClick={onPostUser}>
          Post user
        </button>
        <button type="button" onClick={onResetUser}>
          Reset user
        </button>
      </>
    ) : (
      <h3>Loading</h3>
    );
  },
  "https://jsonplaceholder.typicode.com/users/3",
  "user"
);
