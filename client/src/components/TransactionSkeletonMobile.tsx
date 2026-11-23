export const TransactionSkeletonMobile = () => {
  return (
    <div className="w-[300px] flex justify-between">
      <div className="flex flex-col gap-1">
        <span className="bg-grey-300 anime-bounce rounded h-[0.5rem] w-[9rem]"></span>
        <span className="bg-grey-300 anime-bounce rounded h-[0.5rem] w-[7rem]"></span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="bg-grey-300 anime-bounce rounded h-[0.5rem] w-[9rem]"></span>
        <span className="bg-grey-300 anime-bounce rounded h-[0.5rem] w-[7rem] self-end"></span>
      </div>
    </div>
  );
};
