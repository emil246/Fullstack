import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Search from './components/Search';
import Results from './components/Results';



function App() {

  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);

  const handleSearchInputChange = (event) => {
    setSearch(event.target.value);
    setFilteredCountries(
      countries.filter((country) => country.name.toLowerCase()
        .includes(event.target.value.toLocaleLowerCase())),
    );
  };

  const handleShowButton = (name) => {
      setSearch(name);
      setFilteredCountries(countries.filter((country) => country.name === name));
  };

  const hook = () => {
  console.log('effect')
  axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
    })
    }

    useEffect(hook, [])

  return (
    <>
      <h1>find countries</h1>
      <Search
        handleSearchInput={search}
        handleSearchInputChange={handleSearchInputChange}
      />
      <br />
      <Results
      filteredCountries={filteredCountries}
      handleShowButton={handleShowButton}
      />
    </>
  );
};

export default App;
