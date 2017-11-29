import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import RecipesReducer from './reducer_recipes';
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
  recipes: RecipesReducer,
  auth: authReducer,
  form: formReducer
});

export default rootReducer; 