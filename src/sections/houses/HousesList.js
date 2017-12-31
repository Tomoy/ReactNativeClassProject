import React, { Component } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import axios from 'axios'

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
        
        axios.get("http://146.185.137.85/got/web/casas")
        .then( (response) => {  //Si no uso arrow function y uso un function normal, pierdo el contexto y no puedo usar el this.
            console.log("axios get response: ", response);
            const list = response.data && response.data.records ? response.data.records : []
            this.setState( {list }) //mismo que ({list : list})
        })
        .catch( (error) => {
            console.log("axios get error: ", error);
        });
    }

    renderItem(item) {

        return (
            <View style={{height: 200, backgroundColor: 'red', marginVertical: 10}}>
                <Text> {item.nombre} </Text>

                <Button
                    title={'Select House'}
                    onPress={() => this.setState({ selected: item})}
                />
            </View>
        )
    }

    render () {

        const nombre = this.state.selected ? this.state.selected.nombre : ''

        return (
            <View>
                <Text> {"Selected House: " + nombre} </Text>
                <FlatList
                    data={this.state.list} //Pide array de data
                    renderItem={ ({item, index}) => this.renderItem(item, index)}
                />
            </View>
        )
    }
}