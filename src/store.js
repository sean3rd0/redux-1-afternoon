import {createStore} from "redux";

const initialState = {
    name: "", 
    category: "",
    authorFirst: "",
    authorLast: "",
    ingredients: [],
    instructions: [],
    recipeList: []
};

export const UPDATE_NAME = "UPDATE_NAME";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const UPDATE_AUTHOR_FIRST = "UPDATE_AUTHOR_FIRST";
export const UPDATE_AUTHOR_LAST = "UPDATE_AUTHOR_LAST";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const ADD_INSTRUCTION = "ADD_INSTRUCTION";
export const ADD_RECIPE = "ADD_RECIPE";

function reducer(state = initialState, action) {
    const {type, payload} = action;
    switch(type){
        case UPDATE_NAME:
            return {...state, name: payload};

        case UPDATE_CATEGORY:
            return {...state, category: payload};

        case UPDATE_AUTHOR_FIRST: 
            return {...state, authorFirst: payload};

        case UPDATE_AUTHOR_LAST: 
            return {...state, authorLast: payload};

        case ADD_INGREDIENT: 
            return {...state, ingredients: payload};

        case ADD_INSTRUCTION: 
            return {...state, instructions: payload};

//Now we'll add a case to our reducer. This case will be quite a bit different from what we've done so far, because it doesn't use a payload. Payloads are really useful when we need to transfer data from a component to Redux, but in this circumstance all the data is already being stored in Redux. So we'll pull all the values we've been storing so far off of state and build a recipe object with it. Then we we'll want to copy our list of recipes and add our a new recipe to it. Then of course we need to copy the rest of state in an immutable way.
        case ADD_RECIPE: 
            const {
                name, 
                category, 
                authorFirst, 
                authorLast, 
                ingredients, 
                instructions 
            } = state;
            const recipe = {
                name, 
                category, 
                authorFirst, 
                authorLast, 
                ingredients, 
                instructions 
            };
            const newRecipes = [...state.recipeList, recipe];
            return {...state, recipeList: newRecipes};

        default:
            return state;
    }
};

export default createStore(reducer);