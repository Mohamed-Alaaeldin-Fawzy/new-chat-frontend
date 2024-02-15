const Tooltip = ({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) => {
  return (
    <div className="group relative flex items-center">
      {children}
      <div className="absolute z-10 hidden w-auto translate-x-10 translate-y-full whitespace-nowrap rounded-md bg-black px-2 py-1 text-sm text-white opacity-75 group-hover:block">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
