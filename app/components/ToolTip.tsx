interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip = ({ children, text }: TooltipProps) => {
  return (
    <div className="group relative flex items-center">
      {children}
      <div className="absolute z-10 mt-4 hidden w-auto -translate-x-4 translate-y-full whitespace-nowrap rounded-md bg-black px-2 py-1 text-sm text-white opacity-75 group-hover:block">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
