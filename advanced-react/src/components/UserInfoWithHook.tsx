import { useResource } from "../hooks/useResource";

const fetchUser = async (id: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  const data = await response.json();
  return data;
};

export const UserInfoWithHook = ({ userId }: { userId: number }) => {
  const user = useResource(() => fetchUser(userId));

  if (!user) return null;

  return (
    <div>
      <h1>
        {user.name} ({user.username})
      </h1>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>
        Website:{" "}
        <a
          href={`http://${user.website}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {user.website}
        </a>
      </p>
      <div>
        <h3>Address:</h3>
        <p>
          {user.address.street}, {user.address.suite}
        </p>
        <p>
          {user.address.city}, {user.address.zipcode}
        </p>
      </div>
      <div>
        <h3>Company:</h3>
        <p>{user.company.name}</p>
        <p>{user.company.catchPhrase}</p>
        <p>{user.company.bs}</p>
      </div>
    </div>
  );
};
