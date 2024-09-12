import { useEffect, useState } from "react";
import axios from "axios";
import CountryInfo from "./components/CountryInfo";
import CapitalWeatherInfo from "./components/CapitalWeatherInfo";

function App() {
  const [cntName, setCntName] = useState();
  const [filterData, setFilterData] = useState();
  const [currWeather, setCurrWeather] = useState();
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => {
        setCntName(res.data);
        console.log("fetched");
      });
  }, []);

  useEffect(() => {
    if (lng) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${
            import.meta.env.VITE_SOME_KEY
          }`
        )
        .then((res) => setCurrWeather(res.data))
        .catch((err) => console.log("lat not defined"));
    }
  }, [lng]);

  function handleCntName(e) {
    const data = [];
    e.preventDefault();

    for (let i = 0; i < cntName.length; i++) {
      if (
        cntName[i].name.common
          .toUpperCase()
          .indexOf(e.target.value.toUpperCase()) > -1
      ) {
        data.push(cntName[i]);
      }
    }
    if (data.length > 10) {
      setFilterData(data);
    } else if (data.length < 10 && data.length >= 2) {
      setFilterData(data);
      setLat(null);
      setLng(null);
      setCurrWeather(null);
    } else if (data.length == 1) {
      setFilterData(data);
      setLat(filterData[0].capitalInfo.latlng[0]);
      setLng(filterData[0].capitalInfo.latlng[1]);
    }
  }

  return (
    <div>
      {cntName && (
        <div>
          <label>Find Countries</label>
          <input
            type="text"
            placeholder="enter country name"
            onChange={handleCntName}
          />

          {filterData?.length < 10 && filterData?.length >= 2
            ? filterData.map((fi) => <p>{fi.name.common}</p>)
            : filterData?.length === 1
            ? filterData.map((fi) => {
                return (
                  <div>
                    <CountryInfo
                      name={fi.name.common}
                      capital={fi.capital[0]}
                      area={fi.area}
                      lang={fi.languages}
                      img={fi.flags.svg}
                    />
                    <CapitalWeatherInfo
                      name={fi.capital[0]}
                      temp={currWeather?.main.temp - 273.15}
                      wind={currWeather?.wind.speed}
                      img={currWeather?.weather[0].icon}
                    />
                  </div>
                );
              })
            : filterData?.length > 10 && (
                <p>Too many matches, specify another filter</p>
              )}
        </div>
      )}
      {!cntName && <p>Loading....</p>}
    </div>
  );
}

export default App;
