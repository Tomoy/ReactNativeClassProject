import React, { Component } from 'react'
import { TouchableOpacity, Image, StyleSheet, Dimensions, Platform } from 'react-native'

export default class HousesCell extends Component {

    //Se ponen las propiedades que esperamos del componente padre por defecto, por si no las llegan a pasar, para que no pinche la app.
    static defaultProps = {
        onSelect: () => {}, //Funcion
        item:     {}  //Objeto
    }

    render () {

        const { item, onSelect } = this.props //Mismo que hacer const item = this.props.item ...
        
        const image = item.image_dir ? { uri: item.image_dir } : null //o require('path_a_la_img_default')

        return (
            <TouchableOpacity style={styles.container} onPress= { () => onSelect(item) }>
                <Image source= { image } style={ styles.image} resizeMode = {'contain'}/>
            </TouchableOpacity>
        )
    }
        
}

const styles = StyleSheet.create({

    container: {
        margin: 10,
        width: Dimensions.get('window').width / 2 - 20,
        height: (Dimensions.get('window').width / 2 - 20) * (857/600), //ratio de la imagen que viene del server

        ...Platform.select({
            ios: {
                shadowColor: 'rgba(255,255,255,0.1)',
                shadowOpacity: 1,
                shadowOffset: { height: 4, width: 4},
                shadowRadius: 2
            },
            android: {
                elevation: 4
            }
        })
    },

    image: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
})