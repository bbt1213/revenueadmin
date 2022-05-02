import { useState, useEffect } from "react";
import Select from "../../common/Select";

const Subdivision = () => {
  const DATA = [
    {
      value: 1,
      text: "Final Approval and Development Permit",
      parentId: 0,
      step: 1,
      ifComputation: false,
    },
    {
      value: 4,
      text: "Final Approval",
      parentId: 0,
      step: 1,
      ifComputation: false,
    },
    {
      value: 2,
      text: "Socialized Housing",
      parentId: 1,
      step: 2,
      ifComputation: true,
    },
    {
      value: 3,
      text: "Economic Housing",
      parentId: 1,
      step: 2,
      ifComputation: true,
    },
    {
      value: 5,
      text: "Socialized",
      parentId: 4,
      step: 2,
      ifComputation: true,
    },
    {
      value: 6,
      text: "Economic",
      parentId: 4,
      step: 2,
      ifComputation: true,
    },
  ];

  const [step, setStep] = useState(1);
  const [cboArrays, setCboArrays] = useState([]);

  const loadParents = () => {
    const datas = DATA.filter((a) => a.parentId === 0);
    setCboArrays([...cboArrays, { selected: 0, data: datas }]);
  };

  const handleChange = (e) => {
    const datas = DATA.filter((a) => a.parentId === e.target.value);
  };

  useEffect(() => {
    loadParents();
  }, []);
  return (
    <div>
      <h1>Mpdc</h1>
      {cboArrays.map((a) => (
        <Select datas={a.data} value="id" text="name" onChange={handleChange} />
      ))}
    </div>
  );
};

export default Subdivision;
