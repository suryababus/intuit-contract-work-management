export const FullPageLoader = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader />
    </div>
  );
};

export const Loader = () => {
  return (
    <div
      className="h-10 w-10 animate-spin rounded-full border-b-2 border-foreground"
      data-testid="loader"
    ></div>
  );
};
