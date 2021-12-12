import { csrfFetch } from "./csrf";


const LOAD_SPOT = 'spot/loadSpots';
const LOAD_REVIEW = 'review/loadReviews';


const loadReviews = (list) => ({
      type: LOAD_REVIEW,
      list
});

const loadSpots = (list) => ({
      type: LOAD_SPOT,
      list
});

export const createReview = (data) => async(dispatch) => {
  const created = await csrfFetch(`/api/reviews/new`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  dispatch(getReviews());

}

export const getReviews = () => async(dispatch)=> {
  const reviews = await fetch('/api/reviews');
  if(reviews.ok) {
    const list = await reviews.json();
    dispatch(loadReviews(list))
  }
}

export const deleteReview = (id) => async (dispatch) => {
  const removed = await csrfFetch(`/api/reviews/${id}/delete`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if(removed.ok) {
    dispatch(getReviews());
  }
}

export const editReview = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${data.review.id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if(response.ok) {
    const edited = await response.json();
    dispatch(getReviews())
    return edited
  }
}

export const createSpot = (data) => async(dispatch) => {
  const created = await csrfFetch(`/api/spots/new`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  dispatch(getSpots());

}

export const getSpots = () => async(dispatch)=> {
  const spots = await fetch('/api/spots');
  if(spots.ok) {
    const list = await spots.json();
    dispatch(loadSpots(list))
  }
}

export const deleteSpot = (id) => async (dispatch) => {
  const removed = await csrfFetch(`/api/spots/${id}/delete`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if(removed.ok) {
    dispatch(getSpots());
  }
}

// export const editSpot = (id, payload) => async (dispatch) => {
//   const edited = await csrfFetch(`/api/spots/${id}/edit`, {
//     method: "PUT",
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: payload
//   })

//   if(edited.ok) {
//     dispatch(getSpots());
//   }
// }

export const editSpot = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${data.spot.id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if(response.ok) {
    const edited = await response.json();
    dispatch(getSpots())
    return edited
  }
}

const initialState = { list: [] }

const spotReducer = (state = initialState, action) => {
  const newState = {};
  switch (action.type) {
    case LOAD_SPOT:
      action.list.forEach(spot => {
        newState[spot.id] = spot
      })
      return { ...newState, ...state, list: action.list}
    case LOAD_REVIEW:
      action.list.forEach(review => {
        newState[review.id] = review
      })
      return { ...newState, ...state, reviewlist: action.list}
    default:
      return state;
  }
};

export default spotReducer;