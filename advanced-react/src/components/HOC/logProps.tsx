export const logProps = (Component) => {
  return (props: Record<string, unknown>) => {
    console.log(props);
    return <Component {...props} />;
  };
};
