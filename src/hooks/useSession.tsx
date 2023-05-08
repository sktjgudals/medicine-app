import { createContext, useContext, useState, useEffect } from "react";
import { localTokenVerify } from "@/utils/token";
import { SESSIONTYPE } from "@/types/session";

export type Session = {
  session: SESSIONTYPE | null;
  loading: boolean;
};

const INITIAL = {
  session: null,
  loading: true,
};

export const SessionContext = createContext(INITIAL as Session);

export function useSession() {
  return useContext(SessionContext);
}

export const SessionProvider = ({ children }: { children: JSX.Element }) => {
  const [session, setSession] = useState<SESSIONTYPE | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");
    if (access_token !== "undefined" && access_token) {
      const user = localTokenVerify(access_token) as SESSIONTYPE;
      setSession(user);
      setLoading(false);
    } else {
      setSession(null);
      setLoading(false);
    }
  }, []);

  return (
    <SessionContext.Provider value={{ session, loading }}>
      {children}
    </SessionContext.Provider>
  );
};
