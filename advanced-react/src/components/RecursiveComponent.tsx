export const RecursiveComponent = ({ data }) => {
  return (
    <ul>
      {Object.entries(data).map(([key, value]) => {
        if (typeof value === "object") {
          return <RecursiveComponent key={key} data={value} />;
        }
        return <li key={key}>{`${key}: ${value}`}</li>;
      })}
    </ul>
  );
};
