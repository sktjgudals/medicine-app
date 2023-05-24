import {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { localTokenVerify } from "@/utils/token";
import { SESSIONTYPE } from "@/types/session";
import { tokenCall } from "@/utils/varible";

export type Session = {
  session: SESSIONTYPE | null;
  loading: boolean;
  setReset: Dispatch<SetStateAction<boolean>>;
};

const INITIAL = {
  session: null,
  loading: true,
};

export const SessionContext = createContext(INITIAL as Session);

export const useSession = () => {
  return useContext(SessionContext);
};

export const SessionProvider = ({ children }: { children: JSX.Element }) => {
  const [session, setSession] = useState<SESSIONTYPE | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [reset, setReset] = useState<boolean>(false);
  useEffect(() => {
    const { access, refresh } = tokenCall();
    if (access && refresh) {
      const user = localTokenVerify(access) as SESSIONTYPE;
      setSession(user);
      setLoading(false);
    } else {
      setSession(null);
      setLoading(false);
    }
    return () => {
      setReset(false);
    };
  }, [reset]);

  return (
    <SessionContext.Provider value={{ session, loading, setReset }}>
      {children}
    </SessionContext.Provider>
  );
};
