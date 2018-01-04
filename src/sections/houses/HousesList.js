import React, { Component } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { AsyncCalls, Colors } from '../../commons'
import HousesCell from './HousesCell'

import { Actions } from 'react-native-router-flux'

//Redux
import { connect } from 'react-redux'
import * as HouseActions from '../../redux/actions/houses'

class HousesList extends Component {

    componentWillMount() {
        //Normalmente llamamos al webservice en el componentWillmount()
        //Este this props viene del redux
        this.props.fetchHousesList()
    }

    onSelect(house) {
        this.props.updateSelected(house)
    }

    renderItem(item) {
        
        return (

            <HousesCell
                item={item}
                onSelect={ (house) => this.onSelect(house) } //onSelect es como un delegate que se le pasa para que pueda llamar la cell cuando es clickeada
            />
        )
    }

    renderHeader() {

        return <ActivityIndicator animating={this.props.isFetching} size = "large" color="white" />
        /*if(this.props.isFetching) {
            
            return (

                <View>
                    <ActivityIndicator size = "large" color="white" />
                </View>
            )
        } else {
            return null
        }*/
    }

    render () {
        console.log("is fetching: ", this.props.isFetching)
        const houseSelected = this.props.item && this.props.item.nombre ? this.props.item.nombre : "None"

        return (
            <View style= {styles.container} >

                <Text> {"House selected: " + houseSelected} </Text>
                <FlatList
                    data={this.props.list} //Pide array de data
                    ListHeaderComponent= {this.renderHeader()}
                    renderItem={ ({item, index}) => this.renderItem(item)}
                    keyExtractor= { (item, index) => item.id } //para asignar una key con un id único para cada elemento
                    extraData= { this.state} //To tell the flatlist to update itself when the state changes
                    numColumns={2}
                />
            </View>
        )
    }
}

//Aca es donde venimos una vez que el estado es actualizado y queda accesible en toda la vista desde this.props
const mapStateToProps = (state) => {
    
    console.log("state: ", state)
    return {
        list: state.houses.list,
        item: state.houses.item,
        isFetching: state.houses.isFetching       
    }
}

const mapDispatchToProps = (dispatch, props) => {
    
    return {

        fetchHousesList: () => {
            dispatch(HouseActions.fetchHousesList())
        },

        updateSelected: (house) => {
            dispatch(HouseActions.updateHouseSelected(house))
            Actions.CharactersList( {title: house.nombre} )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HousesList)

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.housesBackground,
        paddingVertical: 20,
        paddingTop: 60
    },
})