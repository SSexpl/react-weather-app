import React from "react";
import './current-weather.css';
const CurrentWeather = (props) =>
{

 //console.log(props.cw);
 //console.log(props.fw);
 const temperature=Math.round(props.cw.main.temp-273);
 const temperature_max=Math.round(props.cw.main.temp_max-273);
 const feel=Math.round(props.cw.main.feels_like-273);
   return(
        <div className="weather">
            <div className="top">
            <div>
            <p className="city">{props.cw.city}</p>
            <p className="weather-description">{props.cw.weather[0].description}</p>
            </div>
            <img alt="./icons/unknown.png" className="image" src={`icons/${props.cw.weather[0].icon}.png`}/>
            </div>
            <div className="bottom">
                <div className="temperature">
                    <p className="temp">{temperature}</p>
                </div>
                <div className="details">
                    <div className="attribute">
                        <span className="parameter">Humidity :</span>
                        <span className="val">{props.cw.main.humidity}</span>
                    </div>
                    <div className="attribute">
                        <span className="parameter">Pressure :</span>
                        <span className="val">{props.cw.main.pressure}</span>
                    </div>
                    <div className="attribute">
                        <span className="parameter">Feels Like :</span>
                        <span className="val">{feel}</span>
                    </div>
                    <div className="attribute">
                        <span className="parameter">Max temp :</span>
                        <span className="val">{temperature_max}</span>
                    </div>
                
                    
                </div>  
                </div>  
                
                
            </div>

           )

}
export default CurrentWeather;