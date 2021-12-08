import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
//import * as sessionActions from '../../store/session';
import { deleteSpots } from "../store/spots";


function Card({spot}) {
    const dispatch = useDispatch()
    // const spots = useSelector(state => {
    //     return state.spot.list
    // })

    const handleEditClick = (e) => {
        e.preventDefault()
        console.log('hello from edit ')
    }

    const handleClickDelete = (e) => {
        e.preventDefault()
        console.log('hello from delete')

    }
    
    return (
        <div id="card">
            <h2>{spot.name}</h2>
            <img src={spot.photoUrl}></img>
            <p>{spot.description}</p>
            <button onClick={handleEditClick}>edit</button>
            <button onClick={(e) => {
                e.preventDefault()
                dispatch(deleteSpots(spot.id))
            }}>delete</button>
        </div>
    )
}

export default Card