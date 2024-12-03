import { useState, useEffect } from "react";

const useBackendStatus = (url: string) => {
  const [backendReady, setBackendReady] = useState(false);

  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          setBackendReady(true);
        } else {
          throw new Error("The backend is not ready");
        }
      } catch (error) {
        console.error(error);
        setTimeout(checkBackendStatus, 3000);
      }
    };

    checkBackendStatus();
  }, [url]);

  return { backendReady };
};

export default useBackendStatus;
