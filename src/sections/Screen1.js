import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Actions } from 'react-native-router-flux'

export default class Screen1 extends React.Component {

    goScreen2() {
        Actions.screen2( { texto: "Texto de prueba"})
    }

    render() {
        return (
            <View>
                <Text> Hola desde la Screen1! </Text>
                <Button 
                    onPress={() => this.goScreen2()}
                    title= "Go Screen2"
                />
            </View>
        )
    }
}