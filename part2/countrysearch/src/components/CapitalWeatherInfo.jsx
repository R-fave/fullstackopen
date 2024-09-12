const CapitalWeatherInfo = ({ capital, temp, wind, img }) => {
  return (
    <div>
      <h1>Weather In {capital}</h1>

      <p>Temperature {Math.floor(temp)} Celcius</p>
      <img src={`https://openweathermap.org/img/wn/${img}@2x.png`} />
      <p>Wind {wind} m/s</p>
    </div>
  );
};

export default CapitalWeatherInfo;
