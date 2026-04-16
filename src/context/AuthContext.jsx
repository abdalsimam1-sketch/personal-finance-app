import { useState, useEffect, useContext, createContext } from "react";
import { supabase } from "../HelperFunctions/supabaseClient";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInitialSession = async () => {
      const result = await supabase.auth.getSession();
      const session = result.data.session;
      setSession(session);
      setLoading(false);
    };
    getInitialSession();
    const authListener = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
      },
    );
    return () => {
      authListener.data.subscription.unsubscribe();
    };
  }, []);
  const user = session ? session.user : null;
  const valuesToBeShared = { session, user, loading };
  return (
    <AuthContext.Provider value={valuesToBeShared}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
