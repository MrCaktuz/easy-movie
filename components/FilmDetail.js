 // Components/FilmDetail.js

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class FilmDetail extends React.Component {
  render() {
    const idFilm = this.props.navigation.state.params.idFilm;

    return (
      <View style={styles.main_container}>
        <Text>Détail du film {idFilm}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  }
});