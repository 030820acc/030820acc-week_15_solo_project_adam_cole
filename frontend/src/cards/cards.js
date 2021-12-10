import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
//import * as sessionActions from '../../store/session';
import { deleteSpot, editSpot, getSpots } from "../store/spots";
import { useHistory } from "react-router";


function Card({spot}) {
    const dispatch = useDispatch()
    // const history = useHistory()
    const [hidden, setHidden] = useState(true);
    const [userHidden, setUserHidden] = useState(true);
    const [newName, setNewName] = useState(spot.name)
    const [newDescription, setNewDescription] = useState(spot.description)
    const [newPhotoUrl,setNewPhotoUrl] = useState(spot.photoUrl)
    const [formErrors, setFormErrors] = useState([])
    
    const user = useSelector(state => {
        return state.session.user
    })

      
    const spots = useSelector(state => {
        return state.spot.list
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
        
        if(formErrors.length === 0) {
            let updatedSpot = await dispatch(editSpot(payload));
            if (updatedSpot) {
                setHidden(true)
                
            }
        }

        
    };

    useEffect(() => {
        const errors = [];
        
        if(newName.length > 50) errors.push('Name must be less than 50 characters.')
        if(newName.length < 1) errors.push('Must have a name.')
        if(newDescription.length < 1) errors.push('Must have a description.')
        if(newPhotoUrl.length < 1) errors.push('Must have a photo URL.')

        setFormErrors(errors)
    }, [newName, newDescription, newPhotoUrl])
    

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
                {formErrors.map(error => {
                    return (<p>{error}</p>)
                })}
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