import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
//import * as sessionActions from '../../store/session';
import { deleteSpot, editSpot, getSpots } from "../store/spots";
import { useHistory } from "react-router";
import ReviewCard from "../components/reviewcard/reviewCard";
import { createReview } from "../store/spots";


function Card({spot}) {
    const dispatch = useDispatch()
    // const history = useHistory()
    const [hidden, setHidden] = useState(true);
    const [reviewHidden, setReviewHidden] = useState(true);
    const [newName, setNewName] = useState(spot.name)
    const [newDescription, setNewDescription] = useState(spot.description)
    const [newPhotoUrl,setNewPhotoUrl] = useState(spot.photoUrl)
    const [editErrors, setEditErrors] = useState([])
    const [reviewErrors, setReviewErrors] = useState([])
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [newReview, setNewReview] = useState(true)
   

    const user = useSelector(state => {
        return state.session.user
    })
    
    const reviews = useSelector(state => {
        return state.spot.reviewlist
    })
   
    const buildReviews = () => {
        if(reviews.length > 0){
            return reviews.map((review) => {
            if(spot.id === review.spotId){
                return (
                    <ReviewCard key={review.id} review={review} spotId={spot.id}/>
                )
            }
        })}
        return null
    }

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            spotId: spot.id,
            userId: user.id,
            title, 
            content,
        };
        
        if(reviewErrors.length === 0) {
            let newReview = await dispatch(createReview(payload));
            if (newReview) {
                setNewReview(true)
                
            }
        }
    
        
    };
    
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            spot,
            userId: user.id,
            name: newName,
            description: newDescription,
            photoUrl: newPhotoUrl
        };
        
        if(editErrors.length === 0) {
            let updatedSpot = await dispatch(editSpot(payload));
            if (updatedSpot) {
                setHidden(true)
                
            }
        }

        
    };

  
    useEffect(() => {
        const errors = [];
        
        if(title.length > 50) errors.push('Title must be less than 50 characters.')
        if(title.length < 1) errors.push('Must have a title.')
        if(content.length < 1) errors.push('Must have a body.')

        setReviewErrors(errors)
    }, [title, content])


    useEffect(() => {
        const errors = [];
        
        if(newName.length > 50) errors.push('Name must be less than 50 characters.')
        if(newName.length < 1) errors.push('Must have a name.')
        if(newDescription.length < 1) errors.push('Must have a description.')
        if(newPhotoUrl.length < 1) errors.push('Must have a photo URL.')

        setEditErrors(errors)
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
            }}>Delete</button>
            <button hidden={!((user) && (spot.userId === user.id))} onClick={() => {setHidden(!hidden)}}>Edit</button>
            <form hidden={hidden}>
                {editErrors.map(error => {
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
                <button onClick={handleEditSubmit}>Submit Edit</button>
            </form>
            <button onClick={()=> {
                setReviewHidden(!reviewHidden)
            }}>Reviews</button>
            <div hidden={reviewHidden} className="reviewBox">
                <button hidden={!user} onClick={(e) => {
                    e.preventDefault();
                    setNewReview(!newReview)
                }}>Leave a review</button>
                <form hidden={newReview}>
                {reviewErrors.map(error => {
                    return (<p>{error}</p>)
                })}
                <label for="title">Title:</label>
                <input name='title' value={title} onChange={(e) => {
                    setTitle(e.target.value)
                }}></input>
                <label for="content">Content:</label>
                <input name='content' value={content} onChange={(e) => {
                    setContent(e.target.value)
                }}></input>
                <button onClick={handleReviewSubmit}>Submit Review</button>
            </form>
                {buildReviews()}
            </div>
        </div>
    )
}

export default Card