import axios from 'axios';

const helsinkiUrl = `${process.env.REACT_APP_RESTCOUNTRIES_URL}/api`;
const openWeatherUrl = `${process.env.REACT_APP_OPENWEATHER_URL}`;
const apiKey = `${process.env.REACT_APP_OPENWEATHER_APIKEY}`;

const getCountries = () => {
    const request = axios.get(`${helsinkiUrl}/all`);
    return request.then(response => response.data);
}

const getCurrentWeather = (lat, long) => {
    const request = axios.get(`${openWeatherUrl}/weather?lat=${lat}&lon=${long}&appid=${apiKey}`);
    return request.then(response => response.data);
}

export default { getCountries, getCurrentWeather };