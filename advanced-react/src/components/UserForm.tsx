import { includeUpdatableUser } from "./HOC/includeUpdatableUser";

export const UserForm = includeUpdatableUser(
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
  "2"
);
