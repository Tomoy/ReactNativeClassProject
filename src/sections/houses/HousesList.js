import React, { Component } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { AsyncCalls, Colors } from '../../commons'
import {fetch} from '../../webservices/Webservices'
import HousesCell from './HousesCell'

export default class HousesList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            list: [], //Inicializamos un array vacio en el State, usamos el list del state, 
            //para que cuando obtenga la data del webservice, puedo usar setstate para que se llame el render
            selected: null
        }
    }

    componentWillMount() {
        //Normalmente llamamos al webservice en el componentWillmount()
        fetch('/casas').then( response => {
            console.log("Fetch response: ", response)
            this.setState({ list: response.records})
        }).catch( error => {
            console.log("Error: ", error)
        })
    }

    onSelect(house) {
        
        this.setState( { selected: house } )
    }

    renderItem(item) {
        
        return (

            <HousesCell
                item={item}
                onSelect={ (house) => this.onSelect(house) } //onSelect es como un delegate que se le pasa para que pueda llamar la cell cuando es clickeada
            />
        )
    }

    render () {

        const nombre = this.state.selected ? this.state.selected.nombre : ''

        return (
            <View style= {styles.container} >
                <FlatList
                    data={this.state.list} //Pide array de data
                    renderItem={ ({item, index}) => this.renderItem(item)}
                    keyExtractor= { (item, index) => item.id } //para asignar una key con un id único para cada elemento
                    extraData= { this.state} //To tell the flatlist to update itself when the state changes
                    numColumns={2}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'rgb(42,42,42)',
        paddingVertical: 20
    },
})