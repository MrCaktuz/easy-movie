import React from 'react';
import {StyleSheet, Button, TextInput, View, FlatList, ActivityIndicator} from 'react-native';
import FilmItem from './film-item';
import {getFilmsFromTmdbApiWithSearchedText} from '../api/tmdb-api';

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

    onLoadFilms() {
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

    onSearchTextInputChanged(text) {
        this.searchText = text;
    }

    onSearchFilms() {
        this.page = 0;
        this.totalPages = 0;
        this.setState({
             films: [],
        }, () => this.onLoadFilms());
    }

    renderLoading() {
        if (this.state.isLoading) {
            return(
                <View style={styles.loading_container}>
                    <ActivityIndicator size={'large'} />
                </View>
            );
        }
    }   

    render() {
        console.log("Render !!!"); 
        return (
            <View style={styles.container}>
                <TextInput style={styles.textInput} placeholder="Movie's title" onChangeText={(text) => this.onSearchTextInputChanged(text)} onSubmitEditing={() => this.onSearchFilms()} />
                <Button style={styles.button} title="Search" onPress={()=>this.onSearchFilms()} />
                <FlatList
                    style={styles.flat_list}
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (this.page < this.totalPages) {
                            this.onLoadFilms()
                        }
                    }}
                    renderItem={({item}) => <FilmItem film={item} />}
                />
                {this.renderLoading()}
            </View>
        );
    } 
}

const styles = StyleSheet.create({
  container: {flex:1, padding: 10, paddingTop: 35, backgroundColor: 'red'},
  loading_container: {position: 'absolute', left: 0, right: 0, top: 100, bottom: 0, alignItems: 'center', justifyContent: 'center'},
  textInput: {marginBottom: 10, height: 50, backgroundColor: 'white', borderColor: '#000000', borderRadius: 2, borderWidth: 1, paddingLeft: 5},
  button: {height: 50, backgroundColor: 'red'}, 
  flat_list: {marginTop: 10, padding: 10, backgroundColor: 'white', flex: 1},
});
