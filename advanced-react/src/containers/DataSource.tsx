import React, { useState, useEffect } from "react";

interface ResourceLoaderProps {
  getData: () => Promise<any>;
  resourceName: string;
  children: React.ReactNode;
}

export const DataSource: React.FC<ResourceLoaderProps> = ({
  getData = () => {},
  resourceName,
  children,
}) => {
  const [resource, setResource] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getData();
      setResource(data);
    })();
  }, [getData]);

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
