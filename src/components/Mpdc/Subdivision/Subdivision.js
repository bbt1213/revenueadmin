import { toBeRequired } from "@testing-library/jest-dom/dist/matchers";
import { computeHeadingLevel } from "@testing-library/react";
import { useState, useEffect } from "react";
import { Fragment } from "react/cjs/react.production.min";
import Input from "../../common/Input";
import Select from "../../Mpdc/common/Select";
import businessService from "../../../service/businessService";
import SearchBar from "../../common/SearchBar/SearchBar";

const Subdivision = () => {
 
  const DATA = [
    {
      value: 1,
      text: "Approval of Subdivision Plan (including town houses)",
      parentId: 0,
      level: 1,
      ifComputation: true,
      hasComputation: true
    },
    {
      value: 14,
      text: "1. Preliminary Approval and Locational clearance (PALC / PSDP)",
      marginLeft: 1,
      parentId: 1,
      ifTitle: true,
      level: 2,
      ifComputation: false,
      hasComputation:true
    },
    {
      value: 16,
      text: "Inspection Fee",
      marginLeft: 2,
      parentId: 1,
      ifTitle: false,
      formula: "1500 * area / 10000",
      computation: "1,500/ha regardless of density",
      level: 3,
      ifComputation: true,
      hasComputation:true,
      ifCheck: true,
      total: 0    
    },
    {
      value: 17,
      text: "2. Final Approval and Development Plan",
      marginLeft: 1,
      parentId: 1,
      ifTitle: true,
      level: 2,
      ifComputation: false,
      hasComputation:true
    },
    {
      value: 19,
      text: "Fee",
      marginLeft: 2,
      parentId: 1,
      ifTitle: false,
      formula: "2880 * area / 10000",
      computation: "2,880.00/ha regardless of density",
      level: 3,
      ifComputation: true,
      hasComputation:true,
      ifCheck: true,  total: 0    
    },
    {
      value: 18,
      text: "a. Additional Fee on Floor Area of houses and building sold with lot",
      marginLeft: 2,
      parentId: 1,
      ifTitle: false,
      formula: "3 * area",
      computation: "3.00 /sq m",
      level: 3,
      ifComputation: true,
      hasComputation:true,
      ifCheck: true,  total: 0    
    },
    {
      value: 15,
      text: "",
      formula: "360.00 * ha",
      computation: "360.00/ha or a fraction thereof",
      parentId: 14,
      level: 3,
      ifComputation: true,
      hasComputation: true,
      ifCheck: true,  total: 0    
    },
    {
      value: 7,
      text: "Approval of Condominium Project",
      parentId: 0,
      level: 1,
      ifComputation: false,
    },
    {
      value: 8,
      text: "Projects under BP 220",
      parentId: 0,
      level: 1,
      ifComputation: false,
    },
    {
      value: 9,
      text: "Subdivision",
      parentId: 8,
      level: 2,
      ifComputation: false,
    },
    {
      value: 10,
      text: "Preliminary Approval and Locational Clearance",
      parentId: 9,
      level: 3,
      ifComputation: false,
    },
    {
      value: 12,
      text: "Socialized Housing",
      formula: "100.00 * area / 10000",
      computation: "100.00 / ha",
      parentId: 10,
      level: 4,
      amount: "",
      ifComputation: true,
      ifCheck: true,
    },
    {
      value: 13,
      text: "Economic Housing",
      formula: "200.00 * area / 10000",
      computation: "200.00 / ha",
      parentId: 10,
      level: 4,
      ifComputation: true,
      ifCheck: true,
    },
    {
      value: 11,
      text: "Condominium",
      parentId: 8,
      level: 2,
      ifComputation: false,
    },
     
    {
      value: 4,
      text: "Final Approval",
      parentId: 0,
      level: 1,
      ifComputation: false,
    },
     
    {
      value: 5,
      text: "Socialized",
      parentId: 4,
      level: 2,
      ifComputation: true,
    },
    {
      value: 6,
      text: "Economic",
      parentId: 4,
      level: 2,
      ifComputation: true,
    },
  ];

  const [step, setStep] = useState(1);
  const [cboArrays, setCboArrays] = useState([]);
  const [ifComputation, setIfComputation] = useState(false);
  const [hasComputation, setHasComputation] = useState(false);
  const [selectedComputations,setSelectedComputations] = useState([]);
  const [selectedWordEntered,setSelectedWordEntered] = useState();
  const [selectedBusinessNameWordEntered,setSelectedBusinessNameWordEntered] = useState();
  const [currentData,setCurrentData] = useState({ bploNo: "", businessName:"",businessAddress: "",area: ""});
  const [businessInformations,setBusinessInformations] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filteredBusinessNameItems, setFilteredBusinessItems] = useState([]);
  const loadParents = () => {
    const datas = DATA.filter((a) => a.parentId === 0);
    datas.unshift({value:0,text:"Category..."});
    setCboArrays([...cboArrays, { selected: 0, data: datas }]);
   
  };

  const handleCategoryChange = (e) => {
    
    const datas = DATA.filter((a) => a.parentId === +e.target.value);

    if (datas.length === 0)
    {
      setIfComputation(true);
      setSelectedComputations([]);
    }
    else
    {
      if (datas[0].hasComputation === false)
        {
          datas.unshift({value:0,text:"Category..."});
          setCboArrays([...cboArrays, { selected: 0, data: datas }]);
          setHasComputation(false);
          setSelectedComputations([]);
        }
      else
      {
      
        setHasComputation(true);
       const nArea = currentData.area.replaceAll(",","");
        const newDatas = datas.map(a => ({...a,"total": a.formula ?  eval(a.formula.replace("area",+nArea)) : ""}));
        setSelectedComputations(newDatas);
        // if (datas[0].ifComputation === false)
        // {
         
        // }
        // else
        //   {
            
        //     console.log("Found computation");
        //     setIfComputation(true);
        //     setSelectedComputations(datas);
            
            
        //   }
        }        
    }

  }

const computeFormula = () => {
  const nArea = currentData.area.replaceAll(",","");
  setSelectedComputations(prevState => prevState.map(a => ({...a,"total": a.formula ?  eval(a.formula.replace("area",+nArea)) : ""})));
}

  const handleCheckChange = (e,item) => {
      setSelectedComputations(prevState =>   prevState.map(a=> a.value === item.value ? {...a,[e.target.id]: e.target.checked} : a) )
  }

  const handleInputChange = (e,item) => {
       setSelectedComputations(prevState =>   prevState.map(a=> a.value === item.value ? {...a,[e.target.id]: e.target.value} : a) )
  }

  const handleCurrentDataChange = (e) => {
      setCurrentData((prevState => {return {...prevState, [e.target.id]: e.target.value}}));  
  }

  const handleSelectedData = (item) => {
    console.log(item);
    setCurrentData(prevState => {return {...prevState,"bploNo": item.bploNo,"businessName": item.businessName,"businessAddress": item.businessAddress}})
    setSelectedWordEntered(item.bploNo);
    setSelectedBusinessNameWordEntered(item.businessName);
  }

  const getAllBusinessInformation = async () => {
    try
    {
      const datas =  await businessService.getAllBusinessInformation();
      setBusinessInformations(datas.data);
    }catch{

    }
   
  }

  const handleBploNoFilter = (e) => {
    
    const searchWord = e.target.value;
    const newFilter = businessInformations.filter((value) => {
      return value.bploNo.toLowerCase().includes(searchWord.toLowerCase());
    });
      
    if (searchWord === "") {
      setFilteredItems([]);
    } else setFilteredItems(newFilter);
    setCurrentData((prevState => {return {...prevState, [e.target.id]: e.target.value}}));  
  };

  const handleBusinessNameFilter = (e) => {
    
    const searchWord = e.target.value;
    const newFilter = businessInformations.filter((value) => {
      return value.businessName.toLowerCase().includes(searchWord.toLowerCase());
    });
      
    if (searchWord === "") {
      setFilteredBusinessItems([]);
    } else setFilteredBusinessItems(newFilter);

    setCurrentData((prevState => {return {...prevState, [e.target.id]: e.target.value}}));  
  };

  useEffect(() => {
    loadParents();
    getAllBusinessInformation();
  }, [ ]);
 

let content;
if (hasComputation === true)
{
      if (selectedComputations.length !== 0)
      content =  
          selectedComputations.map(a=> 
            (<Fragment key={a.value}>
              <div className="col-md-1 text-center"><input id ="ifCheck" type="checkbox" className="form-input" disabled={a.ifTitle} checked={a.ifCheck} onChange={e => handleCheckChange(e,a)}/></div>
              <div className="col-md-5"> <label style={{marginLeft: `${a.marginLeft}rem`}}>{a.text}</label> </div>
              <div className="col-md-3">{a.computation}</div>
              <div className="col-md-3"> <input type="text" className={`form-control ${a.ifTitle === true ? "d-none" : ""}`} value={a.total.toLocaleString()} id="total" onChange={e => handleInputChange(e,a)}></input> </div>
              </Fragment>)
              )
      else
      content = <h4>No Computation found.</h4>
    
  }
  return (
    <div>
        
  <main className="container-fluid">
  <h1>MPDC</h1>
  <hr/>
  <h2>Information</h2>
  <div className="row">
    <div className="col-md-4">
    <label htmlFor="bploNo" className="col-md-4 col-form-label required">
          Bplo Number:  
        </label>
    </div>
    <div className="col-md-8 mb-3">
    <SearchBar
                id="bploNo"
                placeHolder="Enter a description.."
                items={businessInformations}
                onSelectData={handleSelectedData}
                wordEntered={selectedWordEntered}
                setWordEntered={setSelectedWordEntered}
                keyName="bploNo"
                returnValueFieldName="bploNo"
                description="businessName"
                handleFilter={handleBploNoFilter}
                setFilteredItems={setFilteredItems}
                filteredItems={filteredItems}
              />
 </div>
  </div>
  <div className="row">
    <div className="col-md-4">
    <label htmlFor="businessName" className="col-md-4 col-form-label required">
          Business Name:
        </label>
    </div>
    <div className="col-md-8 mb-3">
    <SearchBar
                id="businessName"
                placeHolder="Enter a Business Name.."
                items={businessInformations}
                onSelectData={handleSelectedData}
                wordEntered={selectedBusinessNameWordEntered}
                setWordEntered={setSelectedBusinessNameWordEntered}
                keyName="businessName"
                returnValueFieldName="businessName"
                description="bploNo"
                handleFilter={handleBusinessNameFilter}
                setFilteredItems={setFilteredBusinessItems}
                filteredItems={filteredBusinessNameItems}
              />
 </div>
  </div>
  <Input id="businessAddress" label="Business Address" type="text" onChange={handleCurrentDataChange} value={currentData.businessAddress}/>
   <Input id="area" label="Area (sqm)" type="text" onChange={handleCurrentDataChange} value={currentData.area}/>
  <hr/>
  <h2>Categories</h2>
  <hr/>
      {cboArrays.map((a) => (
        <Select datas={a.data} value="id" text="name" onChange={handleCategoryChange} />
      ))}
    
    <hr/>
        <h2>Computation</h2>
        <hr/>
        <div className="row" style={{
            height: "200px",
            overflow: "inherit",
            overflowX: "hidden",
          }}>{content}</div>
          <hr/>
        <div className="row"> <div className="col-md-1"> </div>
              <div className="col-md-5"></div>
              <div className="col-md-3 text-end"><label className="form-label"><b>Total Amount for Payment:</b></label></div>
              <div className="col-md-3"><input type="text" className={`form-control`} value={selectedComputations
        .map((item) => item.ifCheck === true?  item.total : 0)
        .reduce((prev, next) => prev + Number(next), 0).toLocaleString()}></input></div>
     </div>
      </main>
      </div>
  );
};

export default Subdivision;
