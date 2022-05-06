import { useState } from "react";
import "./SearchBar.css";
import react from "react";

const SearchBar = ({
  placeHolder,
  items,
  onSelectData,
  wordEntered,
  setWordEntered,
  hasIcon,
  returnValueFieldName,
  keyName,
  id,
  description,
  filteredItems,
  setFilteredItems,
  handleFilter
}) => {

 
   
  // const handleFilter = (e) => {
    
  //   const searchWord = e.target.value;
  //   const newFilter = items.filter((value) => {
  //     return value[returnValueFieldName].toLowerCase().includes(searchWord.toLowerCase());
  //   });
      
  //   if (searchWord === "") {
  //     setFilteredItems([]);
  //   } else setFilteredItems(newFilter);
  // };

  const clearInput = () => {
    setFilteredItems([]);
    setWordEntered("");
  };

  const selectInput = (e, arg) => {
    setFilteredItems([]);
    
      setWordEntered(arg[returnValueFieldName]);
    onSelectData(arg);
  };

  const handleKeyDown = (e) => {};

  return (
    <div className="search mt-0">
      <div className="input-group">
        {hasIcon && (
          <div>
            <div>
              <span className="input-group-text">
                <i
                  className="fa fa-search input-group-text"
                  aria-hidden="true"
                  style={{ border: "0px" }}
                ></i>
              </span>
            </div>
          </div>
        )}
        <input
          type="text"
          placeholder={placeHolder}
          value={wordEntered}
          onChange={handleFilter}
          className="form-control"
          onKeyDown={handleKeyDown}
          id={id}
        ></input>
      </div>
      {filteredItems.length > 0 && (
        <div className="dataResult">
          {filteredItems.slice(0, 15).map((value) => (
            <div
              className="dataItem"
              key={value[id]}
              onClick={(e) => selectInput(e, value)}
            >
              <div className="row">
              <div className="col-md-4">{value[id]}</div>
              <div className="col-md-8">{value[description]}</div>
              {/* <p key={value[keyName]}>{value[returnValueFieldName]} | {value.businessName}</p> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
