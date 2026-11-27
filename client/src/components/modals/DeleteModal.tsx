import { useRef, useEffect } from "react";

export const DeleteModal = ({
  deleteModalOpen,
  closeDeleteModal,
  feature,
  deleteFunction,
  buttonDisabled,
}: {
  deleteModalOpen: boolean;
  closeDeleteModal?: any;
  feature?: string;
  deleteFunction?: any;
  buttonDisabled?: boolean;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (deleteModalOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [deleteModalOpen]);

  return (
    <dialog
      onClose={closeDeleteModal}
      className="m-auto flex flex-col gap-5 rounded outline-0 border border-gray-300 p-5 w-[min(95vw,350px)]"
      ref={dialogRef}
    >
      <p className="text-center">
        Are you sure you want to delete this {feature}? This action cannot be
        undone.
      </p>
      <div className="flex gap-5 justify-center">
        <button
          disabled={buttonDisabled}
          className={`bg-red text-white rounded p-1  px-4 cursor-pointer 
           disabled:cursor-not-allowed disabled:opacity-60
          `}
          onClick={deleteFunction}
        >
          {buttonDisabled ? "Deleting..." : "Yes"}
        </button>
        <button
          disabled={buttonDisabled}
          className={`border border-gray-300 text-black p-1 px-4 rounded cursor-pointer  disabled:cursor-not-allowed disabled:opacity-60`}
          onClick={closeDeleteModal}
        >
          No
        </button>
      </div>
    </dialog>
  );
};
