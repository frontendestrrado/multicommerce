import { useRouter } from "next/router";
const withAuth = (WrappedComponent) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();

      //   const accessToken = localStorage.getItem("accessToken");
      let userdata = localStorage.getItem("user");

      // If there is no access token we redirect to "/" page.
      if (userdata === undefined || userdata === null) {
        Router.replace("/");
        return null;
      } else {
        let parsedata = JSON.parse(userdata);
        let accessToken = parsedata.access_token;
        if (!accessToken) {
          Router.replace("/");
          return null;
        }
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default withAuth;
