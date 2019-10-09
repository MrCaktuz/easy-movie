# App Référence Fitness

First App Référence Fitness. This read me is made to be able to remember the steps I made to setup my testing App

To introduice my way into React-Native and build the first test app I follow [this tuto](https://openclassrooms.com/fr/courses/4902061-developpez-une-application-mobile-react-native) from openclassrooms

* * *
* * *

## First Setup

first of all, make sure you installed [Node JS](https://nodejs.org)

To be able to see the App during development you'll need a local server. Here we are going to use [EXPO](https://expo.io/)

    sudo npm install -g expo-cli

Once it's installed you are ready to create your first app with :

    expo init [AppName]

For a all new project select `expo-template-blank`

* * *
* * *


## Usage

### Start working

To start developping, go to your App folder and run :

    npm start

Scan the QR Code with **Expo** on your phone and you are ready do go !

* * *

### Components

Basic components => React native components [list here](https://facebook.github.io/react-native/docs/components-and-apis#docsNav)

Custom components => Group made of **Basic Components**.

* * *

### Styles

⚠️ Styles can only be used on **Basic Components** ️️️️️⚠️

For a better performence it is recommanded to use the [API StyleSheet](https://facebook.github.io/react-native/docs/stylesheet#docsNav) this way :

    import {StyleSheet} from 'react-native';

    <View style={styles.container} />

    const styles = StyleSheet.create({
        container: {marginTop: 25},
    });

⚠️ Here is the [Styling Cheat Cheet](https://github.com/vhpoet/react-native-styling-cheat-sheet) of all styles we can use with React-Native. ⚠️

* * *
