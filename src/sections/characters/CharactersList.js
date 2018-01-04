import React, { Component } from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import { Colors } from '../../../src/commons'

import CharacterCell from './CharacterCell'

//Redux
import { connect } from 'react-redux'
import * as CharactersActions from '../../../src/redux/actions/characters'

class CharactersList extends Component {

    componentWillMount() {

        const houseId = this.props.house ? this.props.house.id : null
        
        this.props.fetchCharactersList(houseId)
    }

    onSelect(character) {
        this.props.updateSelected(character)
    }

    renderItem(item, index) {
        console.log("Render item: ", item.nombre)
        return <CharacterCell item={item} onSelect= { (character) => {this.onSelect(character)}} /> //OnSelect con función vacía por ahora.
    }

    render() {

        console.log("this.props.list ", this.props.list)
        return (
            <View style={styles.container}>

                <FlatList
                    data={this.props.list} //viene actualizada por el reducer
                    renderItem= { ({item, index}) => this.renderItem(item, index)}
                    keyExtractor= { (item, index) => index }
                    extraData = { this.props }
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        house: state.houses.item,
        list : state.characters.list
    }
}

const mapDispatchToProps = (dispatch, props) => {

    return {
        fetchCharactersList: (houseId) => {
            dispatch(CharactersActions.fetchCharactersList(houseId))
        },

        updateSelected: (character) => {
            console.log("Updateselected character: ", character)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList)

const styles = StyleSheet.create({
    
        container: {
            flex: 1,
            backgroundColor: Colors.housesBackground
        },
    })