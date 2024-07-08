import { useEffect } from "react";
import { isTokenExpired } from "./isTokenExpired ";
const useTokenExpiryChecker = (onTokenExpired, checkInterval = 60000) => {
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      if (isTokenExpired(token)) {
        onTokenExpired();
      }
    }, checkInterval);

    return () => clearInterval(interval);
  }, [onTokenExpired, checkInterval]);
};

export default useTokenExpiryChecker;
