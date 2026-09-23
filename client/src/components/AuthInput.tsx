export const AuthInput = ({
  label,
  error,
  ...rest
}: {
  error?: string;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between">
        <label htmlFor={rest.id} className="text-gray-500">
          {label}
        </label>
        {error && (
          <span className="text-captions text-red-500 font-bold">{error}</span>
        )}
      </div>
      <input
        {...rest}
        className={`border border-gray-400 rounded py-2 pl-2  outline-none ${error ? " border-red-500 focus:border-red-500" : ""}`}
      />
    </div>
  );
};
