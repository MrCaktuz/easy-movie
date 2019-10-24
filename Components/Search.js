 // Components/Search.js

import React from 'react';
import {StyleSheet, Button, TextInput, View, FlatList, ActivityIndicator} from 'react-native';
import FilmItem from './FilmItem';
import {getFilmsFromTmdbApiWithSearchedText} from '../Api/TmdbApi';
import {connect} from 'react-redux';
import FilmList from './FilmList';

class Search extends React.Component {

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

    handleLoadFilms = () => {
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
        }, () => this.handleLoadFilms());
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
                <FilmList
                    films={this.state.films}
                    navigation={this.props.navigation}
                    page={this.page}
                    totalPages={this.totalPages}
                    loadFilms={this.handleLoadFilms}
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
        backgroundColor: '#304448',
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        marginBottom: 10,
        height: 50,
        backgroundColor: '#546E7A',
        borderColor: '#263238',
        borderRadius: 2,
        borderWidth: 1,
        paddingLeft: 5,
        color: "white",
    },
    button: {
        width: 50,
        height: 100,
        backgroundColor: 'red',
    },
});

export default (Search)