import React, { useState, useEffect } from "react";

interface UserLoaderProps {
  userId: number;
  children: React.ReactNode;
}

export const UserLoader: React.FC<UserLoaderProps> = ({ userId, children }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { user } as React.Attributes);
        }

        return child;
      })}
    </>
  );
};
