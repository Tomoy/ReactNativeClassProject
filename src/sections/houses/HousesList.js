import React, { Component } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { AsyncCalls, Colors } from '../../commons'
import HousesCell from './HousesCell'

import { connect } from 'react-redux'
import * as HouseActions from '../../redux/actions/houses'

class HousesList extends Component {

    componentWillMount() {
        //Normalmente llamamos al webservice en el componentWillmount()
        //Este this props viene del redux
        this.props.fetchHousesList()
    }

    onSelect(house) {
        
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
        console.log("props: ", this.props)
        
        return (
            <View style= {styles.container} >
                <FlatList
                    data={this.props.list} //Pide array de data
                    renderItem={ ({item, index}) => this.renderItem(item)}
                    keyExtractor= { (item, index) => item.id } //para asignar una key con un id único para cada elemento
                    extraData= { this.state} //To tell the flatlist to update itself when the state changes
                    numColumns={2}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    
    console.log("state: ", state)
    return {
        list: state.houses.list        
    }
}

const mapDispatchToProps = (dispatch, props) => {
    
    return {

        fetchHousesList: () => {
            dispatch(HouseActions.fetchHousesList())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HousesList)

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'rgb(42,42,42)',
        paddingVertical: 20
    },
})