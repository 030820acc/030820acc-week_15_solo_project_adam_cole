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



export const getSpots = () => async(dispatch)=> {
  const spots = await fetch('/api/spots');
  if(spots.ok) {
    const list = await spots.json();
    dispatch(loadSpots(list))
  }
}

export const deleteSpots = (id) => async (dispatch) => {
  const removed = await fetch(`/api/spots/${id}/delete`)
  if(removed.ok) {
    getSpots();
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