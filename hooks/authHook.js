import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function useAuth() {
  const [authStatus, setAuthStatus] = useState(null);
  useEffect(() => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();
      let userdata = localStorage.getItem("user");

      // If there is no access token we redirect to "/" page.
      if (userdata === undefined || userdata === null) {
        setAuthStatus(false);
      } else {
        let parsedata = JSON.parse(userdata);
        let accessToken = parsedata.access_token;
        if (!accessToken) {
          setAuthStatus(false);
        } else {
          setAuthStatus(true);
        }
      }
    }
  }, []);
  return authStatus;
}
