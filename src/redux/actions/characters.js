import * as types from '../types/characters'
import { fetch, post} from '../../../src/webservices/Webservices'

function updateCharactersList(value) {
    
        return {
            type: types.CHARACTERS_UPDATE_LIST,
            value: value
        }
    }
    
function setCharactersFetching(value) {

    return {
        type: types.CHARACTERS_SET_FETCHING,
        value: value
    }
}

export function updateCharacterSelected(value) {

    return {
        type: types.CHARACTERS_UPDATE_CHARACTER,
        value: value
    }
}

export function fetchCharactersList(houseId) {

    return (dispatch, getState) => {

        dispatch(setCharactersFetching(true))
        dispatch(updateCharactersList([])) //Limpiar la lista antes de mostrar nuevo contenido.

        const fetchUrl = '/personajes?casa=' + houseId
        fetch(fetchUrl).then(response => {
            dispatch(setCharactersFetching(false))            
            dispatch(updateCharactersList(response.records))
        }).catch( error => {
            console.log("error downloading characters list ", error)
            dispatch(setCharactersFetching(false))                        
        })
    }
}
