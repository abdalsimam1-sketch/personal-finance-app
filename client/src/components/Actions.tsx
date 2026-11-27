export const Actions = ({
  onEdit,
  onDelete,
  feature,
}: {
  onEdit: any;
  onDelete: any;
  feature: string;
}) => {
  return (
    <div className="bg-beige-100 rounded flex flex-col gap-3 absolute right-1 top-5 w-[10rem] p-4  text-nowrap border border-gray-300">
      <button
        className=" border border-gray-300 rounded bg-white cursor-pointer"
        onClick={onEdit}
      >
        Edit {feature}
      </button>{" "}
      <button
        className=" border border-red rounded text-red bg-white cursor-pointer"
        onClick={onDelete}
      >
        Delete {feature}
      </button>
    </div>
  );
};
