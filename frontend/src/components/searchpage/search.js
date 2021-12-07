import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function Search({ user }) {
  const dispatch = useDispatch();
  
  return (
    <div className='searchPageHeader'>
        <h2>Where to...?</h2>
        <input className='searchbar'></input>
        <button id="searchButton">Search</button>
    </div>


  );
}

export default Search;