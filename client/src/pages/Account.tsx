import { Navigate } from "react-router-dom";
import logout from "../assets/logout1.png";
import { LogoutAssuranceModal } from "../components/modals/LogoutAssuranceModal";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export const Account = () => {
  const { logoutMutation } = useAuth();

  if (window.innerWidth >= 1024) {
    return <Navigate to="/overview"></Navigate>;
  }
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  return (
    <div>
      <button
        className="bg-white border-red border-2 text-red rounded p-1  w-[10rem] flex items-center justify-center gap-4"
        onClick={() => setLogoutModalOpen(true)}
      >
        Logout
        <img src={logout} className="w-[2rem] h-[2rem]" alt="" />
      </button>
      {logoutModalOpen && (
        <LogoutAssuranceModal
          logoutModalOpen={logoutModalOpen}
          closeLogoutModal={() => setLogoutModalOpen(false)}
          logoutFunction={() => logoutMutation.mutate()}
          buttonDisabled={logoutMutation.isPending}
        />
      )}
    </div>
  );
};
