const ADD_SPOT = 'spot/addSpot';
const GET_SPOT = 'spot/getSpot';


const addSpot = (spot) => ({
      type: ADD_SPOT,
      spot
});

const getSpot = (list) => ({
      type: GET_SPOT,
      list
});

export const getAllSpots = (spot) => async (dispatch) => {
  console.log(spot)
    const response = await fetch(`/api/spots/${spot}`)
    
      if(response.ok) {
        const newspots = await response.json();
        dispatch(getSpot(newspots))
      }
}




const spotReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case ADD_SPOT:
      newState = {...state, spot: action.spot }
      return newState;
    case GET_SPOT:
      newState = {...state, list: action.list}
      return newState;
    default:
      return state;
  }
};

export default spotReducer;