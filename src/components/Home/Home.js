import { Fragment, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

import authService from "../../service/authService";
const Home = () => {
  useEffect(() => {
    switch (authService.getCurrentTaxType()) {
      case "BT":
        window.location = "/businesses";
        Redirect();
        break;
      case "FT":
        window.location = "/franchises";
        break;
      case "CT":
        window.location = "/individualcommunitytax";
        break;
      default:
        window.location = "/images";
        break;
    }
  }, []);
  return null;
};

export default Home;
