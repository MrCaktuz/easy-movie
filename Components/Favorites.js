// Components/Favorites.js

import React from 'react';
import FilmList from './FilmList';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';

 class Favorites extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <FilmList
                    films={this.props.favoritesFilm}
                    navigation={this.props.navigation}
                    page={0}
                    totalPages={0}
                    loadFilms={this.handleLoadFilms}
                /> 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#304448',
    },
});

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm,
    };
};

export default connect(mapStateToProps)(Favorites);