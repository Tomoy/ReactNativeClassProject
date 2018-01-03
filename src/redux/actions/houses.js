import * as types from '../types/houses'
import {fetch} from '../../webservices/Webservices'

function updateHousesList(value) {

    return {
        type: types.HOUSES_UPDATE_LIST,
        value: value
    }
}

function setHousesFetching(value) {

    return {
        type: types.HOUSES_SET_FETCHING,
        value: value
    }
}

export function updateHouseSelected(value) {

    return {
        type: types.HOUSES_UPDATE_SELECTED,
        value: value
    }
}

export function fetchHousesList() {

    return (dispatch, getState) => {

        dispatch(setHousesFetching(true))

        const fetchUrl = '/casas'

        fetch(fetchUrl).then( response => {
            console.log("Fetch response: ", response)
            dispatch(setHousesFetching(false))            
            const list = response.records
            dispatch(updateHousesList(list))
            
        }).catch( error => {
            console.log("Error: ", error)
        })
    }
}