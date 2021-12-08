import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import Card from "../../cards/cards";


function LocationCard() {
    const spots = useSelector(state => {
        return state.spot.list
    })



    return (
        <div className="cardArea">
            {spots.map((spot) => {
                return (
                    <Card spot={spot}/>
                )
            })}
        </div>
    )
}

export default LocationCard