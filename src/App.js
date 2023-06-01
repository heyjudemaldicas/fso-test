import { useState, useEffect } from 'react';
import './App.css';

import countriesService from './services/countriesService';

import Search from './components/Search';
import Countries from './components/Countries';
import Country from './components/Country';

const App = () => {

  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countriesService.getCountries().then(countries => {
      setCountries(countries);
      filterResults('');
    });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    filterResults(event.target.value);
  };

  const filterResults = (term) => {
    let arr = [];
    if (term === '')  {
      setFiltered(arr);
      setSelectedCountry(null);
      setWeather(null);
      return;
    };

    arr = countries.filter(country => country.name.common.toLowerCase().includes(term.toLowerCase()));
    if (arr.length === 1) {
      setSelectedCountry(arr[0]);
      countriesService.getCurrentWeather(arr[0].capitalInfo.latlng[0], arr[0].capitalInfo.latlng[1]).then(weather => {
        setWeather(weather);
      });
    }
    else {
      setSelectedCountry(null);
      setWeather(null);
    }
    setFiltered(arr);
  };

  const handleShow = (name) => {
    let country = countries.filter(country => country.name.common.toLowerCase().includes(name.toLowerCase()))[0];
    if (country) {
      setFiltered([]);
      setSelectedCountry(country);
      countriesService.getCurrentWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1]).then(weather => {
        setWeather(weather);
      });
    }
  }

  return (
    <>
      <Search term={searchTerm} handleSearch={handleSearch} />
      {
        filtered.length > 10 && <p>Too many matches, specify another filter</p>
      }
      {
        filtered.length < 10 && filtered.length > 1 && <Countries countries={filtered} handleShow={handleShow} />
      }
      {
        selectedCountry && <Country country={selectedCountry} weather={weather} />
      }
    </>
  );
}

export default App;