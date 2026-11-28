export const PercentageBar = ({
  percentage,
  color,
}: {
  percentage: number;
  color: string;
}) => {
  return (
    <section>
      <div className="bg-beige-100 h-[0.5rem] rounded-full border border-gray-300 flex items-center">
        <div
          className={`rounded-full  h-[0.4rem]`}
          style={{
            backgroundColor: `var(--color-${color})`,
            width: `${percentage}%`,
          }}
        ></div>
      </div>
    </section>
  );
};
