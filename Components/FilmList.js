// Component/FilmList.js

import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import FilmItem from './FilmItem';
import {connect} from 'react-redux';

 class FilmList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            films: [],
        };
    }

    handleDisplayFilmDetail(idFilm) {        
        this.props.navigation.navigate('FilmDetail', {idFilm})
    }

    render() {
        return (
            <FlatList
                style={styles.list}
                data={this.props.films}
                extraData={this.props.favoritesFilm}
                keyExtractor={(item) => item.id.toString()}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    if (this.props.page < this.props.totalPages) {
                        this.props.loadFilms()
                    }
                }}
                renderItem={({item}) => {
                    return (
                        <FilmItem
                            film={item}
                            isFavorite={this.props.favoritesFilm.findIndex((favorite) => favorite.id === item.id) !== -1}
                            onDisplayFilmDetail={this.handleDisplayFilmDetail}
                        />
                    );
                }}
            />
        );
    }
}

const styles = StyleSheet.create({
    list: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'white',
        flex: 1,
    },
});

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm,
    };
};

export default connect(mapStateToProps)(FilmList)