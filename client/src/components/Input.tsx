type InputProps = React.ComponentProps<"input"> & {
  label: string;
  error?: string;
};

export const Input = ({
  label,
  id,
  placeholder,
  error,
  ...rest
}: InputProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="cursor-pointer">
          {label}
        </label>
        <p className="text-captions text-red font-bold">{error}</p>
      </div>
      <input
        {...rest}
        className={`border w-full py-1 pl-2 rounded ${error ? "border-red  outline-none" : " border-gray-300"}`}
        id={id}
        placeholder={placeholder}
      />
    </div>
  );
};
