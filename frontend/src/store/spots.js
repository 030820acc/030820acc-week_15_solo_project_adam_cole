import { csrfFetch } from "./csrf";

const ADD_SPOT = 'spot/addSpot';
const LOAD_SPOT = 'spot/loadSpots';



const addSpot = (spot) => ({
      type: ADD_SPOT,
      spot
});

const loadSpots = (list) => ({
      type: LOAD_SPOT,
      list
});

export const createSpot = (data) => async(dispatch) => {
  const created = await csrfFetch(`/api/spots/new`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if(created.ok) {
    dispatch(getSpots());
  }
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
  switch (action.type) {
    case ADD_SPOT:
      if (!state[action.spot.id]) {
        const newState = {
          ...state,
          [action.spot.id]: action.spot
        }
        const list = newState.list.map(id => newState[id])
        list.push(action.spot)
        return newState
      }
      return {
        ...state,
        [action.spot.id]: {
          ...state[action.spot.id],
          ...action.spot
        }
      }
    case LOAD_SPOT:
      const newState = {};
      action.list.forEach(spot => {
        newState[spot.id] = spot
      })
      return { ...newState, ...state, list: action.list}
    default:
      return state;
  }
};

export default spotReducer;