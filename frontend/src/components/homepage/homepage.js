import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { getSpots } from "../../store/spots";
import LocationCard from "../locationcard/locationCard";
import { getReviews } from "../../store/spots";

function Homepage() {
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(getSpots());
  }, []);

  useEffect(() => {
    dispatch(getReviews());
  }, []);
  
  return (
    <div className='searchPageHeader'>
        <h2>Where to...?</h2>
        <LocationCard />
    </div>
  );
}

export default Homepage;