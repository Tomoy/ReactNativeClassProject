import * as types from '../types/houses'
import {fetch} from '../../webservices/Webservices'

function updateHousesList(value) {

    return {
        type: types.HOUSES_UPDATE_LIST,
        value: value
    }
}

export function fetchHousesList() {

    return (dispatch, getState) => {

        const fetchUrl = '/casas'

        fetch(fetchUrl).then( response => {
            console.log("Fetch response: ", response)
            const list = response.records
            dispatch(updateHousesList(list))
            
        }).catch( error => {
            console.log("Error: ", error)
        })
    }
}