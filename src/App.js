/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';

import * as WebServices from './webservices/Webservices'
import { Colors } from './commons'

import HousesList from './sections/houses/HousesList';
import CharactersList from './sections/characters/CharactersList';

import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'

import * as reducers from './redux/reducers'
const reducer = combineReducers(reducers)
const store = createStore(
    reducer,
    applyMiddleware(thunk)
)

export default class App extends Component {
  
  componentWillMount() {
      WebServices.configureAxios()
      StatusBar.setBarStyle('light-content') //iOS StatusBar light style
  }
    
  render() {

    console.disableYellowBox = true
    
    return (
        <Provider store={store}>
            <Router>
                <Scene key={ "root" }>
                
                <Scene 
                    key={ 'HousesList' }
                    component={ HousesList }
                    hideNavBar
                />

                <Scene 
                    key={ 'CharactersList' }
                    component={ CharactersList }
                    navigationBarStyle= {styles.navBar}
                    navBarButtonColor= {'white'}
                />

                </Scene>
            </Router>
        </Provider>
    );
  }
}

const styles = StyleSheet.create({

    navBar: {
        backgroundColor: Colors.navBar
    }
});
