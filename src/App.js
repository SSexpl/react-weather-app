import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import Search from './component/search/search';
import CurrentWeather from './component/current-weather/current-weather';
import ForecastWeather from './component/forecast-weather/forecast-weather';
import {API_key, Weather_URL } from './component/api';
import { det_api,det_url } from './component/api';
import { Details } from './component/details/details';
var classNames=require('classnames');

function App() {
  const hot = {
  
    backgroundColor:  "rgb(153, 253, 220)"
  };
  const cold = {
  
    backgroundColor:  "rgb(249, 223, 176)"
  };
  
   
  
  const[current,setCurrent]=useState(null);
  const[fore,setFore]=useState(null);
  const[ishot,setHot]=useState(false);
  const[temp,setTemp]=useState(0);
  const[details,setDetails]=useState(null);
  function handleOnSearchChange(searchData)
  {
    const[lat,lon]=searchData.value.split(" ");
    const city=searchData.label;
    console.log(lat+" "+lon);
    const currentWeatherfetch=fetch(`${Weather_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_key}`);
    const foreCastWeatherfetch=fetch(`${Weather_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_key}`);
    const place_details=fetch(`${det_url}?lat=${lat}&lon=${lon}&apiKey=${det_api}`);
    Promise.all([currentWeatherfetch,foreCastWeatherfetch,place_details]).then(//creating a promise to work on.
      async(response)=>{//function works after the promise is complete.
          const CurrentWeather= await response[0].json();
          const foreCast=await response[1].json();
          const place_details=await response[2].json();
          console.log(place_details);
          setCurrent({city:searchData.label,...CurrentWeather});
          setFore({city:searchData.label,...foreCast});
          setDetails(place_details);
          const temperature=Math.round(current.main.temp-273);
         // var ishot=false;
         console.log(temperature);
         setTemp(temperature);
         if(temperature > 20)
          setHot(true);
        else
          setHot(false);
         // console.log(ishot);
      }
    )
    .catch(console.log);

  // console.log(current);
    //console.log(fore);
  }
  //const temperature=Math.round(current.main.temp-273);
 // var ishot=false;
  //if(temperature>30)
  // ishot=true;
  //else
   //ishot=false;
   //'url(bg/${current.weather[0].icon}.jpg)'
   console.log(ishot);
   console.log(temp);
   const backgroundImage = (current!=null) ? `url(bg/${current.weather[0].icon}.jpg)`: '';
  return (
    
    <div className="container" style = { { backgroundImage  ,backgroundSize:'cover' }  }  >
      <Search onSearchChange={handleOnSearchChange}/>
      <div className="upper">
      {current && <CurrentWeather cw={current} />}
      {details &&<Details props={details}/>} 
      </div>
      <div className="lower">
      {fore && <ForecastWeather fw={fore}/>}
      </div>
    </div>
  );
}

export default App;
