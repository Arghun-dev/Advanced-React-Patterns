import React, { useState, useEffect } from "react";

interface ResourceLoaderProps {
  resourceUrl: string;
  resourceName: string;
  children: React.ReactNode;
}

export const ResourceLoader: React.FC<ResourceLoaderProps> = ({
  resourceUrl,
  resourceName,
  children,
}) => {
  const [resource, setResource] = useState(null);

  useEffect(() => {
    fetch(resourceUrl)
      .then((response) => response.json())
      .then((data) => setResource(data))
      .catch((error) => {
        console.log(error);
      });
  }, [resourceUrl]);

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            [resourceName]: resource,
          } as React.Attributes);
        }

        return child;
      })}
    </>
  );
};
