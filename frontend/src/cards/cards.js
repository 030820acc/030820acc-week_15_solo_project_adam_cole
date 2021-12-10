import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
//import * as sessionActions from '../../store/session';
import { deleteSpot, editSpot } from "../store/spots";


function Card({spot}) {
    const dispatch = useDispatch()
    const [hidden, setHidden] = useState(true);
    const [userHidden, setUserHidden] = useState(true);
    const [newName, setNewName] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [newPhotoUrl,setNewPhotoUrl] = useState('')
    
    const user = useSelector(state => {
        return state.session.user
    })


    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
          spot,
          userId: user.id,
          name: newName,
          description: newDescription,
          photoUrl: newPhotoUrl
        };
        
        let updatedSpot = await dispatch(editSpot(payload));
        if (updatedSpot) {
            setHidden(true)
        }
    };
    
 

    return (
        <div id="card">
            <h2>{spot.name}</h2>
            <img src={spot.photoUrl}></img>
            <p>{spot.description}</p>
            {/* <NavLink to={`/api/spots/${spot.id}`}>View</NavLink> */}
            <button hidden={!((user) && (spot.userId === user.id))} onClick={(e) => {
                e.preventDefault()
                if(spot.userId === user.id) {
                    dispatch(deleteSpot(spot.id))
                }
            }}>delete</button>
            <button hidden={!((user) && (spot.userId === user.id))} onClick={() => {setHidden(!hidden)}}>edit</button>
            <form hidden={hidden}>
                <label for="name">Name:</label>
                <input name='name' value={newName} onChange={(e) => {
                    setNewName(e.target.value)
                }}></input>
                <label for="description">Description:</label>
                <input name='Description' value={newDescription} onChange={(e) => {
                    setNewDescription(e.target.value)
                }}></input>
                <label for='photo'>Photo URL</label>
                <input name='photo' value={newPhotoUrl} onChange={(e) => {
                    setNewPhotoUrl(e.target.value)
                }}></input>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Card