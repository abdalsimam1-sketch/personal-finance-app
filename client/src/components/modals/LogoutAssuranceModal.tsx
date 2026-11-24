import { useRef, useEffect } from "react";

export const LogoutAssuranceModal = ({
  logoutModalOpen,
  closeLogoutModal,
  logoutFunction,
  buttonDisabled,
}: {
  logoutModalOpen: boolean;
  closeLogoutModal: any;
  logoutFunction: any;
  buttonDisabled: boolean;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (logoutModalOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [logoutModalOpen]);

  return (
    <dialog
      onClose={closeLogoutModal}
      className="m-auto flex flex-col items-center  gap-5 rounded outline-0 border border-gray-300 p-5 w-[min(95vw,350px)]"
      ref={dialogRef}
    >
      <p>Are you sure you want to logout?</p>
      <div className="flex  gap-5">
        {" "}
        <button
          disabled={buttonDisabled}
          onClick={logoutFunction}
          className={`bg-red text-white rounded p-1  px-5 cursor-pointer  outline-0
           disabled:cursor-not-allowed disabled:opacity-60
          `}
        >
          {buttonDisabled ? "Logging out..." : "Yes"}
        </button>
        <button
          onClick={closeLogoutModal}
          disabled={buttonDisabled}
          className={`border border-gray-300 text-black p-1 px-5 rounded cursor-pointer  disabled:cursor-not-allowed disabled:opacity-60`}
        >
          No
        </button>
      </div>
    </dialog>
  );
};
