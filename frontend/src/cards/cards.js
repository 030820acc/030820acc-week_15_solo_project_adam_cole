import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
//import * as sessionActions from '../../store/session';
import { deleteSpot } from "../store/spots";


function Card({spot}) {
    const dispatch = useDispatch()
    
    const user = useSelector(state => {
        return state.session.user
    })
    

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
            <NavLink to={`/api/spots/${spot.id}`}>View</NavLink>
            <button hidden={!(user.id === spot.userId)} onClick={(e) => {
                e.preventDefault()
                if(spot.userId === user.id) {
                    dispatch(deleteSpot(spot.id))
                }
            }}>delete</button>
        </div>
    )
}

export default Card