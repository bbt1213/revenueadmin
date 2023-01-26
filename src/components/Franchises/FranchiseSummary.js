import { Fragment, useState, useEffect } from "react";
import franchiseService from "../../service/franchiseService";

const FranchiseSummary = (props) => {
  const { ptFranchiseDetailWebById } = props;
  const [summary, setSummary] = useState({});

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await franchiseService.getPtFranchiseDetailWebById(
          ptFranchiseDetailWebById
        );
        console.log(data);
        setSummary((prevState) => {
          return { ...data.data };
        });
      } catch (ex) {
        setSummary((prevState) => {
          return {};
        });
        // setDatas((prevState) => {
        //   return [...datas];
        // });
      }
    }, 1000);

    return () => clearInterval(interval);
  });
  return <Fragment>Franchise Summary</Fragment>;
};

export default FranchiseSummary;
