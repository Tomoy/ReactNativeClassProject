import React, { Component } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { AsyncCalls, Colors } from '../../commons'

export default class HousesList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            list: [], //Inicializamos un array vacio en el State, usamos el list del state, 
            //para que cuando obtenga la data del webservice, puedo usar setstate para que se llame el render
            selected: null
        }
    }

    componentDidMount() {

        AsyncCalls.fetchHousesList()
        .then( (response) => {  //Si no uso arrow function y uso un function normal, pierdo el contexto y no puedo usar el this.
            console.log("axios get response: ", response);
            const list = response.data && response.data.records ? response.data.records : []
            this.setState( {list }) //mismo que ({list : list})
        })
        .catch( (error) => {
            console.log("axios get error: ", error);
        });
    }

    isCellSelected(item) {
       
        if ( this.state.selected && this.state.selected.id == item.id ) {
            return true
        } else {
            return false
        }
    }

    renderItem(item) {

        const isSelected = this.isCellSelected(item)
        const cellStyle = isSelected ? {backgroundColor: Colors.red} : { backgroundColor: 'gray'}
        const titleStyle = isSelected ? { color: 'white'} : { color: 'black'}
        const buttonTitleColor = isSelected ? 'white' : 'black'

        return (
           // <View style={{height: 200, backgroundColor: 'red', marginVertical: 10}}> //Puedo usar inline o con la const styles declarada abajo
           <View style = {[styles.cell, cellStyle]}>
                <Text style={titleStyle}> {item.nombre} </Text>

                <Button
                    title={'Select House'}
                    onPress={() => this.setState({ selected: item})}
                    color= {buttonTitleColor}
                />
            </View>
        )
    }

    render () {

        const nombre = this.state.selected ? this.state.selected.nombre : ''

        return (
            <View>
                <Text style={styles.title}> {"Selected House: " + nombre} </Text>
                <FlatList
                    data={this.state.list} //Pide array de data
                    renderItem={ ({item, index}) => this.renderItem(item)}
                    keyExtractor= { (item, index) => item.id } //para asignar una key con un id único para cada elemento
                    extraData= { this.state} //To tell the flatlist to update itself when the state changes
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cell: {
        height: 200,
        marginVertical: 10
    },
    title : {
        fontSize:20,
        textAlign: 'center',
        marginVertical: 20
    }
})