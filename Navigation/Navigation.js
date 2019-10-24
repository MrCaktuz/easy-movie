// Navigation/Navigation.js

import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import Search from '../Components/Search';
import Favorites from '../Components/Favorites';
import FilmDetail from '../Components/FilmDetail';

const SearchStackNavigator = createStackNavigator({
    Search: {
        screen: Search,
        navigationOptions: {
            title: "Recherche",
        }
    },
    FilmDetail: {
        screen: FilmDetail,
    },
});

const MoviesTabNavigator = createBottomTabNavigator({
    Search: {
        screen: SearchStackNavigator,
        navigationOptions: {
            tabBarIcon: () => {
                return (
                    <Image
                        source={require('../Img/ic_search.png')}
                        style={styles.tab_icon}
                    />
                );
            },
        },
    },
    Favoris: {
        screen: Favorites,
        navigationOptions: {
            tabBarIcon: () => {
                return (
                    <Image
                        source={require('../Img/ic_favorite.png')}
                        style={styles.tab_icon}
                    />
                );
            },
        },
    },
}, {
    tabBarOptions: {
        showLabel: false,
        showIcon: true,
        activeBackgroundColor: '#304448',
        inactiveBackgroundColor: '#546E7A',
    },
});

const styles = StyleSheet.create({
    tab_icon: {
        width: 30,
        height: 30,
    },
});

export default createAppContainer(MoviesTabNavigator);