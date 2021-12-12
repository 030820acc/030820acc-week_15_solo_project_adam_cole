import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createReview, getReviews, deleteReview, editReview } from "../../store/spots";



function ReviewCard ({review, spotId}) {
    const dispatch = useDispatch();
    const [hidden, setHidden] = useState(true)
    const [title, setTitle] = useState(review.title)
    const [content, setContent] = useState(review.content)
    const [editErrors, setEditErrors] = useState([])

    const user = useSelector(state => {
        return state.session.user
    })

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            review,
            userId: user.id,
            spotId,
            title,
            content
        };
        
        if(editErrors.length === 0) {
            let updatedReview = await dispatch(editReview(payload));
            if (updatedReview) {
                setHidden(true)
                
            }
        }
    };

    useEffect(() => {
        const errors = [];
        
        if(title.length > 50) errors.push('Title must be less than 50 characters.')
        if(title.length < 1) errors.push('Must have a title.')
        if(content.length < 1) errors.push('Must have content.')

        setEditErrors(errors)
    }, [title, content])

    return (
        <div>
            <h2>{review.title}</h2>
            <p>{review.content}</p>
            <button hidden={!((user) && (review.userId === user.id))} onClick={(e) => {
                e.preventDefault()
                setHidden(!hidden)
            }}>Edit Review</button>
            <form hidden={hidden}>
                {editErrors.map(error => {
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
                <button onClick={handleEditSubmit}>Submit Edit</button>
            </form>
            <button hidden={!((user) && (review.userId === user.id))} onClick={(e) => {
                e.preventDefault()
                if(review.userId === user.id) {
                    dispatch(deleteReview(review.id))
                }
            }}>Delete</button>
        </div>
    )

}

export default ReviewCard




 



