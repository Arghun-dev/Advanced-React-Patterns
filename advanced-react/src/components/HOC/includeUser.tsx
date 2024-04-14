import { useState, useEffect } from "react";

export const includeUser = (Component, userId) => {
  return (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then((response) => response.json())
        .then((data) => setUser(data))
        .catch((error) => {
          console.log(error);
        });
    }, []);

    return <Component {...props} user={user} />;
  };
};
