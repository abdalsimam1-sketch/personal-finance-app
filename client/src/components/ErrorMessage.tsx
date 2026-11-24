export const ErrorMessage = ({ error }: { error: string }) => {
  return (
    <div className="flex  items-center justify-center h-[20rem]">
      <div className="w-[min(70vw,300px)] bg-red-200 border border-red text-red text-center p-5 rounded">
        <p>{error}</p>
      </div>
    </div>
  );
};
