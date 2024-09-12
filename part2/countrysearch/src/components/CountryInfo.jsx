const CountryInfo = ({ name, capital, area, lang, img }) => {
  const langArr = Object.values(lang);
  return (
    <div>
      <h1>{name}</h1>

      <p>capital {capital}</p>
      <p>area {area}</p>

      <p>Languages</p>
      <ul>
        {langArr.map((lang) => (
          <li>{lang}</li>
        ))}
      </ul>

      <img src={img} style={{ width: 200 }} />
    </div>
  );
};

export default CountryInfo;
