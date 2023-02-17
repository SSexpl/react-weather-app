import React,{useState} from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geo_Options,GEO_URL } from "../api";
const Search = (props)=>
{
    const [search,setSearch]=useState(null);

    const handleOnChange = (searchData) => { //onchange only this function is called by select box.
        setSearch(searchData);
        props.onSearchChange(searchData);
      };
    
      const loadOptions = (inputValue) => {//AsyncPaginate property to fetch the options available.
        return fetch(
          `${GEO_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,//fetch form api's 
          geo_Options
        )
          .then((response) => response.json())
          .then((response) => {
            return {
              options: response.data.map((city) => {   //{ options: Array , hasMore: boolean, additional?: any,}
                return {
                  value: `${city.latitude} ${city.longitude}`,
                  label: `${city.name}, ${city.countryCode}`,//array created with label and values.
                };
              }),
            };
          });   
      };
    return (
         <AsyncPaginate
         placeholder="Search for city"
         debounceTimeout={600}
         value={search}
         onChange={handleOnChange}//triggered when an option is selected.
         loadOptions={loadOptions}
         />

    )
}
export default Search;