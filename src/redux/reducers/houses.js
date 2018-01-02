import * as types from '../types/houses'

const initialState = {
    isFetching: false,
    list: [],
    item: null
}

export default function reducer(state = initialState, action = {}) {
   
    console.log("Llega a switch con action type: ", action.type)    
    console.log("Llega a switch con action value: ", action.value)    
    
    switch (action.type) {
        
        case types.HOUSES_UPDATE_LIST: 
            console.log("Entra en Houses_UPDATE_LIST")
            return {
                //Hago una copia de state y puedo modificar directo sus propiedades
                ...state,
                list: action.value
            };

        default:
            return state;
    }
}