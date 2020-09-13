import React from 'react';

const Search = ({ handleSearchInput, handleSearchInputChange }) => (
  <div>
    <input value={handleSearchInput} onChange={handleSearchInputChange} />
  </div>
);

export default Search;
