import axios from 'axios';

import {
  FETCH_RECIPES_SUCCESS,
  FETCH_RECIPES_FAILURE,
  FETCH_ONE_RECIPE,
  NOT_FOUND, 
  CREATE_RECIPE_SUCCESS,
  CREATE_RECIPE_FAILURE,
  POST_IMG,
  IMG_UPLOAD_FAIL,
  UPLOAD_SUCCESS,
  DELETE_RECIPE,
  EDIT_RECIPE,
  AUTH_ADMIN,
  AUTH_ERROR,
  UNAUTH_ADMIN
} from './types'

const ROOT_URL = process.env.API_URL;
const COUDINARY_ROOT_URL = process.env.CLOUD_API;

// Makes request to fetch list of all posted recipes 
export function fetchRecipes() {
  return function(dispatch) {
    return axios.get(`${ROOT_URL}/recipes`)
      .then(response => {
        dispatch({type: FETCH_RECIPES_SUCCESS, payload: response})
      })
      .catch(err => {dispatch({type: FETCH_RECIPES_FAILURE, payload: err})})
  }
}

// Makes request to add a recipe to database 
export function createRecipe(values, history) {
  return function(dispatch) {
    let config = {
      headers: {'x-auth': localStorage.getItem('x-auth')}
    }

    axios.post(`${ROOT_URL}/recipes/add`, values, config)
      .then(response => {
        dispatch({type: CREATE_RECIPE_SUCCESS});
        history.push('/');
      })
      .catch(err => {dispatch({type: CREATE_RECIPE_FAILURE, payload: err})})
  }
}

// Makes request to fetch one specific recipes from database
export function fetchOneRecipe(id) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/recipes/${id}`)
      .then(res => {
        dispatch({
          type: FETCH_ONE_RECIPE,
          payload: res
        })
      })
      .catch((error) => {
        dispatch({
          type: NOT_FOUND
        })
      })
  }  
}

// Makes request to upload image to Cloudinary  
export function postImage(formData) {
  
    let request = axios({
        url: `${COUDINARY_ROOT_URL}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
    })
      .then(res => {
        return {
          type: UPLOAD_SUCCESS,
          payload: res
        }
      })
      .catch(err => {
        return {
          type: IMG_UPLOAD_FAIL,
          payload: res
        }
      });
  
      return {
        type: POST_IMG,
        payload: request
      }
}  

// Makes request to edit specific recipe
export function editRecipe(values, history) {
  return function(dispatch) {
    let config = {
      headers: {'x-auth': localStorage.getItem('x-auth')}
    } 

    axios.patch(`${ROOT_URL}/recipes/${values._id}/edit`, values, config)
      .then(response => {
        dispatch({type: EDIT_RECIPE})
        history.push('/')
      })
  }
}

// Makes request to delete a specific recipe from database
export function deleteRecipe(_id, history) {
  return function(dispatch) {
    let config = {
      headers: {'x-auth': localStorage.getItem('x-auth')}
    }

    axios.delete(`${ROOT_URL}/recipes/${_id}`, config)
      .then(repsonse => {
          dispatch({type: DELETE_RECIPE});
          history.push('/')
        }
      )
  }
}

// Handles admin's login
export function loginAdmin(values, history) {
  return function(dispatch) { 
    axios.post(`${ROOT_URL}/admin/login`, values)
      .then(response => {
        dispatch({type: AUTH_ADMIN});
        localStorage.setItem('x-auth', response.headers['x-auth']);
        history.push('/')
      })
      .catch((error) => {
        dispatch(authError('Bad login info'));
      })
  }
}

// Makes request to log out an admin
export function logoutAdmin() {
  localStorage.removeItem('x-auth');
  return {type: UNAUTH_ADMIN}
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}