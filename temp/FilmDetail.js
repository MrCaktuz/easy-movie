 // Components/FilmDetail.js

import React from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, Image, View, Text} from 'react-native';
import {getFilmDetailFromApi, getImageFromApi} from '../Api/TmdbApi';
import moment from 'moment';
import numeral from 'numeral';
import {connect} from 'react-redux';

class FilmDetail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            film: undefined,
            isLoading: true,
        }
    }
 
    componentDidMount() {
        getFilmDetailFromApi(this.props.navigation.state.params.idFilm)
            .then(data => {
                this.setState({
                    film: data,
                    isLoading: false,
                });
            });
    }
 
    onToggleFavorite() {
        const action = {
            type: "TOGGLE_FAVORITE",
            value: this.state.film,
        };

        this.props.dispatch(action);
    }

    getNames(array) {
        return array.map(element => {
            return element.name;
        }).join(" / ");
    }

    renderButtonFavorite() {
        let srcImg = require('../Img/ic_favorite_border.png');

        if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
            srcImg = require('../Img/ic_favorite.png');
        }

        return (
            <Image
                source={srcImg}
                style={styles.favorite_img}
            />
        );
    }

    renderFilm() {
        let film = this.state.film;

        if (film !== undefined) {
            return (
                <ScrollView style={styles.scrollview_container}>
                    <Image
                        style={styles.cover}
                        source={{uri: getImageFromApi(film.poster_path)}}
                    />
                    <Text style={styles.title}>{film.title}</Text>
                    <TouchableOpacity
                        style={styles.favorite_button}
                        onPress={() => this.onToggleFavorite()}>
                        {this.renderButtonFavorite()}
                    </TouchableOpacity>
                    <Text style={styles.overview}>{film.overview}</Text>
                    <View style={styles.details}>
                        <Text style={styles.detail}>
                            Sortie le {moment(new Date(film.release_date)).format("DD/MM/YYYY")}
                        </Text>
                        <Text style={styles.detail}>
                            Note : {film.vote_average} / 10
                        </Text>
                        <Text style={styles.detail}>
                            Nombre de votes : {film.vote_count}
                        </Text>
                        <Text style={styles.detail}>
                            Budget : {numeral(film.budget).format("0,0[.]00 $")}
                        </Text>
                        <Text style={styles.detail}>
                            Genre(s) : {this.getNames(film.genres)}
                        </Text>
                        <Text style={styles.detail}>
                            Compagnie(s) : {this.getNames(film.production_companies)}
                        </Text>
                    </View>
                </ScrollView>
            );
        }
    }

  renderLoading = () => {
    if (this.state.isLoading) {
        return(
            <View style={styles.loading_container}>
                <ActivityIndicator size={'large'} />
            </View> 
        );
    }
}

    render() {
        return (
            <View style={styles.main_container}>
                {this.renderFilm()}
                {this.renderLoading()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    cover: {
        width: "100%",
        height: 300,
        marginBottom: 20,
    },
    title: {
        width: "100%",
        textAlign: "center",
        fontSize: 24,
        marginBottom: 20,
    },
    overview: {
        paddingLeft: 10,
        paddingRight: 10,
        fontStyle: 'italic',
        color: '#666666',
        marginBottom: 20,
    },
    details: {
        paddingRight: 10,
        paddingLeft: 10,
        marginBottom: 20,
    },
    detail: {
        marginBottom: 5,
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview_container: {
        flex: 1,
    },
    favorite_button: {
        alignItems: 'center',
    },
    favorite_img: {
        width: 40,
        height: 40, 
    },
});

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm,
    };
};

export default connect(mapStateToProps)(FilmDetail)