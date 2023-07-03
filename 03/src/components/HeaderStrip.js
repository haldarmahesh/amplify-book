import React from "react";

import { Auth } from "aws-amplify";
import { useAuthenticator, Button } from "@aws-amplify/ui-react";

const HeaderStrip = () => {
  const { authStatus, route, user } = useAuthenticator((context) => [
    context.authStatus,
    context.route,
    context.user,
  ]);
  // we will get the current authStatus and user details if present

  return authStatus === "authenticated" && route === "authenticated" && user ? (
    <div className="App">
      Hi {user.username}
      <div style={{ width: "20%" }}>
        <Button
          onClick={async () => {
            await Auth.signOut();
          }}
        >
          Sign out
        </Button>
      </div>
    </div>
  ): null;
};

export default HeaderStrip;
