 // Components/Search.js

import React from 'react';
import {StyleSheet, Button, TextInput, View, FlatList, ActivityIndicator} from 'react-native';
import FilmItem from './FilmItem';
import {getFilmsFromTmdbApiWithSearchedText} from '../Api/TmdbApi';

export default class Search extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            films: [],
            isLoading: false,
        };

        this.searchText = "";
        this.page = 0;
        this.totalPages = 0;
    }

    handleLoanFilms = () => {
        this.setState({isLoading: true});
        getFilmsFromTmdbApiWithSearchedText(this.searchText, this.page+1)
            .then(data => {
                this.page = data.page;
                this.totalPages = data.total_pages
                this.setState({
                    films: [...this.state.films, ...data.results],
                    isLoading: false,
                });
            });
    }

    handleSearchTextInputChanged = (text) => {
        this.searchText = text;
    }

    handleSearchFilms = () => {
        this.page = 0;
        this.totalPages = 0;
        this.setState({
             films: [],
        }, () => this.handleLoanFilms());
    }

    handleDisplayFilmDetail = (idFilm) => {
        this.props.navigation.navigate("FilmDetail", {idFilm: idFilm});
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
            <View style={styles.container}>
                <TextInput style={styles.textInput} placeholder="Avengers" onChangeText={(text) => this.handleSearchTextInputChanged(text)} onSubmitEditing={() => this.handleSearchFilms()} />
                <Button style={styles.button} title="Search" onPress={()=>this.handleSearchFilms()} />
                <FlatList
                    style={styles.flat_list}
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (this.page < this.totalPages) {
                            this.handleLoanFilms()
                        }
                    }}
                    renderItem={({item}) => <FilmItem film={item} onDisplayFilmDetail={this.handleDisplayFilmDetail} />}
                />
                {this.renderLoading()}
            </View>
        );
    } 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 10,
        backgroundColor: '#304448'
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        marginBottom: 10,
        height: 50,
        backgroundColor: '#546E7A',
        borderColor: '#263238',
        borderRadius: 2,
        borderWidth: 1,
        paddingLeft: 5,
        color: "white"
    },
    button: {
        height: 50
    },
    flat_list: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'white',
        flex: 1
    },
});
