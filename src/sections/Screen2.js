import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Screen2 extends React.Component {

    render() {
        return (
            <View>
                <Text> Hola desde la Screen2! </Text>
                <Text> {this.props.texto} </Text>
            </View>
        )
    }
}