import React, { useEffect, useState } from "react";
import './details.css';
 export const Details=(props)=>
{
    var city=props.props.features[0].properties;
     const display =()=>
     {
        
         console.log(city);
         console.log(city.state);
         console.log(city.timezone.name);
         console.log(city.country);
     }
     return(
        <div className="details">
        <p>State : {city.state}</p>
        <p>Country : {city.country}</p>
        <p>Timezone : {city.timezone.name}</p>
        <p>UTC {city.timezone.offset_DST}</p>
        {/* <button onClick={display}>click me</button> */}
        </div>
     );
};