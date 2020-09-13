import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Country = ({ country, handleShowButton }) => (
  <div>
    <strong>{country.name}</strong>
    <button type="button" value={country.name} onClick={() => handleShowButton(country.name)}><strong>Show</strong></button>
  </div>
);

const Weather = ({ weather }) => {
  if (weather !== '') {
    return (
      <div>
        <div>{`Temperature: ${weather.current.temperature}`}</div>
        <img alt="weather icon" src={weather.current.weather_icons[0]} />
        <div>{`wind: ${weather.current.wind_speed} mph ${weather.current.wind_dir}`}</div>
      </div>
    );
  }

  return <div>Weather data not available, check API key and availability</div>;
};

const CountryDetail = ({ country }) => {
  const api_key = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState('');


  const hook = () => {
  console.log('effect')
  axios
    .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
    .then(response => {
      console.log('promise fulfilled weather')
      setWeather(response.data)
    })
    }

    useEffect(hook, [])


  return (
    <div>
      <h2>{country.name}</h2>
      <div>
        <strong>Capital:</strong>{` ${country.capital}`}
      </div>
      <div>
        <strong>Population: </strong>{` ${country.population}`}
      </div>
      <h2>Languages</h2>
      <ul>
        {country.languages.map((language) => <li key={language.iso639_1}>{language.name}</li>)}
      </ul>
      <img alt={`flag of ${country.name}`} src={country.flag} height="150px" />
      <Weather weather={weather} />
    </div>
  );
};



const Results = ({ filteredCountries, handleShowButton }) => {
  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (filteredCountries.length > 1) {
    return (
      filteredCountries.map((country) => (
        <Country
          key={country.name}
          country={country}
          handleShowButton={handleShowButton}
        />
      ))
    );
  }

  if (filteredCountries.length === 1) {
    return <CountryDetail country={filteredCountries[0]} />;
  }

  return <div>No matching results, specify another filter</div>;
};


export default Results;
