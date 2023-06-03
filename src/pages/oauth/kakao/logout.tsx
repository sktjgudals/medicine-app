import { useRouter } from "next/router";
import { FC, useEffect } from "react";

const logout: FC = () => {
  const router = useRouter();
  console.log("hi");
  useEffect(() => {
    const redirect_uri = localStorage.getItem("redirect_uri");
    if (redirect_uri) {
      router.push(redirect_uri);
      localStorage.removeItem("redirect_uri");
    }
  }, []);
  return <div></div>;
};

export default logout;
