import {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import { localTokenVerify, serverTokenVerify } from "@/utils/token";
import { SESSIONTYPE } from "@/types/session";
import { tokenCall, tokenDelete } from "@/utils/varible";

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
  const tokenCallback = useCallback(() => {
    const { access, refresh } = tokenCall();
    if (access && refresh) {
      serverTokenVerify(access, refresh).then((result) => {
        if (result) {
          setSession(result);
          setLoading(false);
          setReset(false);
        } else {
          setSession(null);
          setLoading(false);
          setReset(false);
        }
      });
    } else {
      setReset(false);
      setSession(null);
      setLoading(false);
    }
  }, [reset]);

  useEffect(() => {
    tokenCallback();
  }, [tokenCallback]);

  return (
    <SessionContext.Provider value={{ session, loading, setReset }}>
      {children}
    </SessionContext.Provider>
  );
};
