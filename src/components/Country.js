const Country = ({ country, weather }) => {

    return (
        <>
            <h2>{country.name.common}</h2>
            <div>
                <p>capital {country.capital[0]}</p>
                <p>area {country.area}</p>
            </div>
            <h4>languages</h4>
            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} width={200}/>
            {
                weather &&
                <>
                    <h3>Weather in {country.capital[0]}</h3>
                    <p>temperature {Math.round((weather.main.temp - 273.15) * 100) / 100} Celsius</p>
                    <img src={`${process.env.REACT_APP_OPENWEATHER_IMAGEURL}/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} width={100}/>
                    <p>wind {weather.wind.speed} m/s</p>
                </>
            }
        </>
    )
};

export default Country;