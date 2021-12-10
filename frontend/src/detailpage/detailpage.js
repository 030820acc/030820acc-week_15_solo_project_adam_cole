import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from "react-router-dom";
//import * as sessionActions from '../../store/session';
import { editSpot } from "../store/spots";



function DetailPage() {
    const {id} = useParams();
    const dispatch = useDispatch()
    const [hidden, setHidden] = useState(true);
    const [detail, setDetail] = useState({})
    const [newName, setNewName] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [newPhotoUrl,setNewPhotoUrl] = useState('')
    
    const spot = useSelector(state => {
        return state.spot.list
    })

    const user = useSelector(state => {
        return state.session.user
    })

    useEffect(()=> {
        setDetail(spot[id])
    },[])

    

    const data = {
        'name': newName,
        'description': newDescription,
        'photoUrl': newPhotoUrl
    }
      

    return (
        <div id="details">
            <h2>{detail.name}</h2>
            <img src={detail.photoUrl}></img>
            <p>{detail.description}</p>
            <button hidden={!(user.id === detail.userId)} onClick={() => {setHidden(false)}}>edit</button>
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
                <button onClick={(e)=> {
                    e.preventDefault();
                    dispatch(editSpot(id, data))
                }}>Submit</button>
            </form>
        </div>
    )
}

export default DetailPage