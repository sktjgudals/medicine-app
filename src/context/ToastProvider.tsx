import { ToastContainer } from "react-toastify";
import { useTheme } from "./ThemeProvider";

const ToastProvider = ({ children }: { children: JSX.Element }) => {
  const [theme, setTheme] = useTheme();
  return (
    <>
      <ToastContainer
        autoClose={1000}
        hideProgressBar={false}
        position="bottom-right"
        pauseOnFocusLoss={true}
        theme={theme}
      />
      {children}
    </>
  );
};

export { ToastProvider };
