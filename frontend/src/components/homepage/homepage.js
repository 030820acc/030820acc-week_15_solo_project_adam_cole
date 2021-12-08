import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { getSpots } from "../../store/spots";
import LocationCard from "../locationcard/locationCard";


function Homepage() {
  const dispatch = useDispatch();
  const [searchval, setsearchval] = useState('');

  const spots = useSelector(state => {
    return state.spot.list
  })
  

  useEffect(() => {
    dispatch(getSpots());
  });
  
  return (
    <div className='searchPageHeader'>
        <h2>Where to...?</h2>
        <LocationCard />
    </div>
  );
}

export default Homepage;