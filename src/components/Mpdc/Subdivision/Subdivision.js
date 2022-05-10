 
import { useState, useEffect } from "react";
import { Fragment } from "react/cjs/react.production.min";
import Input from "../../common/Input";
import Select from "../../Mpdc/common/Select";
 import mpdcService from "../../../service/mpdcService";
import SearchBar from "../../common/SearchBar/SearchBar";
import LoadingSpinner from "../../common/LoadingSpinner";
import { toast } from "react-toastify";
const Subdivision = () => {
 
  const DATA = [
    {
      value: 1,
      text: "Approval of Subdivision Plan (including town houses)",
      parentId: 0,
      level: 1,
      hasComputation: true,
      sequence:1,
      total: 0,
    },
    {
      value: 14,
      text: "1. Preliminary Approval and Locational clearance (PALC / PSDP)",
      marginLeft: 1,
      parentId: 1,
      ifTitle: true,
      level: 2,
      sequence:2,
      hasComputation:true,
      
      total: 0,
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
      hasComputation:true,
      ifCheck: true,
      total: 0,
      sequence:2,
      miscellaneousTaxCodeId: 1003
    },
    {
      value: 17,
      text: "2. Final Approval and Development Plan",
      marginLeft: 1,
      parentId: 1,
      ifTitle: true,
      level: 2,
      sequence:2,
      hasComputation:true,
      total: 0,
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
      sequence:2,
      hasComputation:true,
      ifCheck: true,  total: 0,
      miscellaneousTaxCodeId: 1003
    },
    {
      value: 20,
      text: "b.  Approval of Condominium Project",
      parentId: 0,
      level: 1,
      hasComputation: true,
      sequence:2,
      total: 0,
    },
    {
      value: 21,
      text: "Final Approval and Development Permit",
      marginLeft: 1,
      parentId: 20,
      ifTitle: true,
      level: 1,
      hasComputation: true,
      sequence:2,
      total: 0,
    },
    {
      value: 22,
      text: "Inspection Fee",
      marginLeft: 2,
      parentId: 20,
      ifTitle: false,
      formula: "1500 * area / 10000",
      computation: "1,500/ha regardless of density",
      level: 3,
      sequence:2,
      hasComputation:true,
      ifCheck: true,
      total: 0 ,
      miscellaneousTaxCodeId: 1003
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
      sequence:2,
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
      sequence:2,
      hasComputation: true,
      ifCheck: true,  total: 0    
    },
     
  ];

  const [step, setStep] = useState(1);
  const [cboArrays, setCboArrays] = useState([]);
  const [ifComputation, setIfComputation] = useState(false);
  const [hasComputation, setHasComputation] = useState(false);
  const [selectedComputations,setSelectedComputations] = useState([]);
  const [selectedWordEntered,setSelectedWordEntered] = useState();
  // const [selectedBusinessNameWordEntered,setSelectedBusinessNameWordEntered] = useState();
  const [currentData,setCurrentData] = useState({  tpiNo: "",name: "",area: ""});
  // const [businessInformations,setBusinessInformations] = useState([]);
  const [taxPayerInformations, setTaxPayerInformations] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [sending, setSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    setCurrentData(prevState => {return {...prevState,"name" : item.name,"tpiNo" : item.tpiNo}});
     
  }

  // const handleSelectedData = (item) => {
  //   console.log(item);
  //   setCurrentData(prevState => {return {...prevState,"taxpayerName" : item.taxPayerName}})
  //   setSelectedWordEntered(item.bploNo);
  //   setSelectedBusinessNameWordEntered(item.businessName);
  // }

  // const getAllBusinessInformation = async () => {
  //   try
  //   {
  //     const datas =  await businessService.getAllBusinessInformation();
  //     setBusinessInformations(datas.data);
  //   }catch{

  //   }
   
  // }

  const getAllTaxPayers = async () => {
    try
    {
      const datas =  await mpdcService.getTaxPayers();
      setTaxPayerInformations(datas.data);
       
    }catch{

    }
   
  }

  // const handleBploNoFilter = (e) => {
    
  //   const searchWord = e.target.value;
  //   const newFilter = businessInformations.filter((value) => {
  //     return value.bploNo.toLowerCase().includes(searchWord.toLowerCase());
  //   });
      
  //   if (searchWord === "") {
  //     setFilteredItems([]);
  //   } else setFilteredItems(newFilter);
  //   setCurrentData((prevState => {return {...prevState, [e.target.id]: e.target.value}}));  
  // };

  // const handleBusinessNameFilter = (e) => {
    
  //   const searchWord = e.target.value;
  //   const newFilter = businessInformations.filter((value) => {
  //     return value.businessName.toLowerCase().includes(searchWord.toLowerCase());
  //   });
      
  //   if (searchWord === "") {
  //     setFilteredBusinessItems([]);
  //   } else setFilteredBusinessItems(newFilter);

  //   setCurrentData((prevState => {return {...prevState, [e.target.id]: e.target.value}}));  
  // };

  const handleTaxPayerNameFilter = (e) => {
    
    const searchWord = e.target.value;
    
    const newFilter = taxPayerInformations.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
       
    if (searchWord === "") {
      setFilteredItems([]);
      setCurrentData(prevState => {return {...prevState,"tpiNo": ""}});
    } else setFilteredItems(newFilter);
 
    setCurrentData((prevState => {return {...prevState, [e.target.id]: e.target.value}})); 
    
  };

  const handleSubmit = async (e) => {
    console.log('submitted');
    e.preventDefault();
    try {
      setSending(true);
      const today = new Date();
      setCurrentData((prevState) => {
        return {
          ...prevState,
          dateOfApplication: today.toLocaleDateString(),
          items: selectedComputations
        };
      });
       const data = await mpdcService.submitApplication(currentData, today, selectedComputations);
      setIsSubmitted(true);
    } catch (ex) {
      setSending(false);
      if (
        ex.response &&
        ex.response.status >= 400 &&
        ex.response.status < 500
      ) {
        console.log("ERROR STATUS: ", ex.response);
        // setErrorSubmission(ex.response.data.title);
      } else {
        toast.error(ex.response);
        console.log("ERROR STATUS: ", ex);
      }
    }
  }

  
  useEffect(() => {
    loadParents();
    getAllTaxPayers();
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


  let content2;
  if (isSubmitted) {
    content2 = (
      <div className="text-center">
        <h2>Thank You For Your using Mpdc Computation</h2>
        <p>Please proceed to Miscellaneous Tax for payment</p>
      </div>
    );
  } else {

    if (sending === true)
    {
      content2 = (
        <div className="text-center">
          <LoadingSpinner />
        </div>
      );
    }
    else
    {
      content2 = (
        <form className="container-fluid"   onSubmit={handleSubmit}>
        <h1>MPDC Zoning</h1>
        <hr/>
        <h2>Information</h2>
        {/* <div className="row">
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
        </div> */}
        <div className="row">
          <div className="col-md-4">
          <label htmlFor="bploNo" className="col-md-4 col-form-label required">
                Tax Payer Name:  
              </label>
          </div>
          <div className="col-md-8 mb-3">
          <SearchBar
                      id="name"
                      placeHolder="Enter the taxpayer name..."
                      items={taxPayerInformations}
                      onSelectData={handleSelectedData}
                      wordEntered={currentData.name}
                      setWordEntered={setSelectedWordEntered}
                      keyName="tpiNo"
                      returnValueFieldName="name"
                      description="tpiNo"
                      handleFilter={handleTaxPayerNameFilter}
                      setFilteredItems={setFilteredItems}
                      filteredItems={filteredItems}
                    />
       </div>
        </div>
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
           <div className="d-flex justify-content-center mb-3">
            <button className="btn btn-primary mx-2">Submit</button>
          </div>
            </form>
      );
    }
   
  }
  return (
    <div>
       {content2}
</div>
  );
};

export default Subdivision;
