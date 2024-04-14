import { useEffect, useState } from "react";
import axios from "axios";

const toCapital = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const includeUpdatableResource = (
  Component,
  resourceUrl,
  resourceName
) => {
  return (props) => {
    const [initialResource, setInitialResource] = useState(null);
    const [resource, setResource] = useState(null);

    useEffect(() => {
      fetch(resourceUrl)
        .then((response) => response.json())
        .then((data) => {
          setInitialResource(data);
          setResource(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

    const onChange = (updates) => {
      setResource({ ...resource, ...updates });
    };

    const onPost = async () => {
      const response = await axios.post(resourceUrl, {
        [resourceName]: resource,
      });
      setInitialResource(response.data);
      setResource(response.data);
    };

    const onReset = () => {
      setResource(initialResource);
    };

    const resourceProps = {
      [resourceName]: resource,
      [`onChange${toCapital(resourceName)}`]: onChange,
      [`onPost${toCapital(resourceName)}`]: onPost,
      [`onReset${toCapital(resourceName)}`]: onReset,
    };

    return <Component {...props} {...resourceProps} />;
  };
};
