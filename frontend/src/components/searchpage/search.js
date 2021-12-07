import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { getAllSpots } from "../../store/spots";


function Search({ user }) {
  const dispatch = useDispatch();
  const [searchval, setsearchval] = useState('');
  
  
  return (
    <div className='searchPageHeader'>
        <h2>Where to...?</h2>
        <input className='searchbar' onChange ={
          (e) => {
            setsearchval(e.target.value)
          }
        }></input>
        <button id="searchButton" onClick = {
          (e) => {
            e.preventDefault();
            dispatch(getAllSpots(searchval))
          }
        }>Search</button>
        
    </div>
  );
}

export default Search;