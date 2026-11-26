export const PotSkeleton = () => {
  return (
    <div className="border border-gray-300 rounded p-5 flex flex-col gap-3 bg-white w-full">
      <section className="flex justify-between">
        <div className="flex gap-3 items-center">
          <div className={`rounded-3xl w-5 h-5 bg-grey-300`}></div>
          <div className="bg-grey-300 w-[5rem] h-[0.5rem]  rounded-2xl"></div>
        </div>
        <div className="bg-grey-300 rounded-2xl h-[0.5rem] w-[2rem]"></div>
      </section>

      <section className="flex items-center justify-between">
        <div className="bg-grey-300 rounded-2xl h-[0.5rem] w-[4rem]"></div>
        <div className="bg-grey-300 rounded-2xl h-[0.5rem] w-[5rem]"></div>
      </section>

      <section>
        <div className="bg-grey-300 rounded-2xl w-full h-[0.5rem]"></div>
      </section>

      <section className="flex items-center justify-between">
        <div className="bg-grey-300 rounded-2xl h-[0.5rem] w-[4rem]"></div>
        <div className="bg-grey-300 rounded-2xl h-[0.5rem] w-[5rem]"></div>
      </section>

      <div className="grid grid-cols-2 gap-5">
        <div className="bg-grey-300 rounded h-8"></div>
        <div className="bg-grey-300 rounded 8-8"></div>
      </div>
    </div>
  );
};
