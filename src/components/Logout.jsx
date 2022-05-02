import React, { useEffect } from "react";

import auth from "../service/authService";

const Logout = () => {
  useEffect(() => {
    auth.logout();
    window.location = "/";
  }, []);

  return null;
};

export default Logout;
