import { createContext, useContext, useState, useEffect } from "react";
import { localTokenVerify } from "@/utils/token";

type StateSession = {
  id: string;
  email: string;
  nickname: string;
  iat: number;
  exp: number;
};

export type Session = {
  session: StateSession | null;
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
  const [session, setSession] = useState<StateSession | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const user = localTokenVerify(token) as StateSession;
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
