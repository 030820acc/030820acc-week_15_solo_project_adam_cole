import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import Card from "../../cards/cards";
import { createSpot } from "../../store/spots";


function LocationCard() {
    const dispatch = useDispatch();
    const [hidden, setHidden] = useState(true)
    const [newName, setNewName] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [newPhotoUrl,setNewPhotoUrl] = useState('')
    
    const spots = useSelector(state => {
        return state.spot.list
    })

    const user = useSelector(state => {
        return state.session.user
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            name: newName,
            userId: user.id,
            photoUrl: newPhotoUrl,
            description: newDescription,
        };
        
        dispatch(createSpot(payload))
    };


    return (
        <div className="cardArea">
            <button onClick={()=> {setHidden(!hidden)}}>New Spot</button>
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
            {spots.map((spot) => {
                return (
                    <Card key={spot.id} spot={spot}/>
                )
            })}
        </div>
    )
}

export default LocationCard