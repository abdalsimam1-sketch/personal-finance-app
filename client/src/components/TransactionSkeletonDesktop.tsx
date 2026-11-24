export const TransactionSkeletonDesktop = () => {
  return (
    <div className="grid grid-cols-[3fr_1.5fr_1.5fr_auto]  border-t border-grey-500 p-5 ">
      <span className="w-[10rem] h-[0.5rem] bg-grey-300 rounded animate-pulse"></span>
      <span className="w-[8rem] h-[0.5rem] bg-grey-300 rounded animate-pulse"></span>
      <span className="w-[8rem] h-[0.5rem] bg-grey-300 rounded animate-pulse"></span>
      <span className="w-[8rem] h-[0.5rem] bg-grey-300 rounded animate-pulse"></span>
    </div>
  );
};
