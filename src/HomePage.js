import React, { useEffect } from "react";
import { useState } from "react";
function HomePage() {
  const [area, set_Area] = useState("lucknow");
  const [weather, setWeather] = useState([]);
  var condition = ["sunny", "cloudy", "rainy", "mist", "clear"];
  var weather_condition = "";
  var j;
  useEffect(() => {
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=0bab7dd1bacc418689b143833220304&q=$location=${area}`
    )
      .then((res) => res.json())
      .then((json) => setWeather(json));
  }, []);

  const fetch_data = () => {
    // console.log(area);
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=0bab7dd1bacc418689b143833220304&q=$location=${area}`
    )
      .then((res) => res.json())
      .then((json) => setWeather(json)); 
  };
  // console.log(weather);
  Object.keys(weather).length > 0 ? (
    (weather_condition = weather["current"]["condition"].text)
  ) : (
    <></>
  );
  // console.log(weather_condition);

  return (
    <> 
      {condition.map((i) => {
        weather_condition=weather_condition.toLowerCase();
        if(weather_condition.includes(i)){
          j=i;
          console.log(j)
        }
      })}
      
      <div id={j}>
          <div style={{display:"grid",placeItems:"center",height:"100vh"}}>
            <input type="text" onChange={(e) => set_Area(e.target.value)} style={{height:"4vh"}}/>
            <button onClick={fetch_data} style={{padding:"2vh",marginTop:"0px"}}>Search</button>
            {Object.keys(weather).length > 0 && (
              <div className="">
                <p>
                  {weather["location"].name},{weather["location"].country}
                </p>
                <p>{weather["location"].localtime}</p>
                <h2>{weather["current"].temp_c}C</h2>
                <h2>{weather["current"]["condition"].text}</h2>
              </div>
            )}
          </div>
        </div>
    </>
  );
}

export default HomePage;
