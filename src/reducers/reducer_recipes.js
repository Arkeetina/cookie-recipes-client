import { FETCH_RECIPES_SUCCESS, FETCH_ONE_RECIPE } from '../actions/types';

export default function(state={}, action) {
  switch (action.type) {
    case FETCH_RECIPES_SUCCESS:
      return _.mapKeys(action.payload.data.recipes, '_id');
    case FETCH_ONE_RECIPE:
      return { ...state,[action.payload.data.recipe._id]: action.payload.data.recipe};
    default:
      return state;
  }
}

