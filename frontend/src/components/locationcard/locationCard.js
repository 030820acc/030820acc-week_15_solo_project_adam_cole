import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import Card from "../../cards/cards";
import { createSpot } from "../../store/spots";
// import { handleValidationErrors } from "../../../../backend/utils/validation";


function LocationCard() {
    const dispatch = useDispatch();
    const [hidden, setHidden] = useState(true)
    const [newName, setNewName] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [newPhotoUrl,setNewPhotoUrl] = useState('')
    const [formErrors, setFormErrors] = useState([])
    
    const spots = useSelector(state => {
        return state.spot.list
    })
    console.log(spots)
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
        if(formErrors.length === 0) {
            dispatch(createSpot(payload))
            setHidden(true)
        }
    };

    useEffect(() => {
        const errors = [];
        spots.forEach(spot => {
            if(spot.name === newName){
                errors.push('Name must be original.')
            }
        })
        if(newName.length > 50) errors.push('Name must be less than 50 characters.')
        if(newName.length < 1) errors.push('Must have a name.')
        if(newDescription.length < 1) errors.push('Must have a description.')
        if(newPhotoUrl.length < 1) errors.push('Must have a photo URL.')

        setFormErrors(errors)
    }, [newName, newDescription, newPhotoUrl])


    return (
        <div className="cardArea">
            <button onClick={()=> {setHidden(!hidden)}}>New Spot</button>
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
            {spots.map((spot) => {
                return (
                    <Card key={spot.id} spot={spot}/>
                )
            })}
        </div>
    )
}

export default LocationCard