import React from 'react';
import {Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as firebase from 'firebase';
import LottieView from 'lottie-react-native';

// Initialize Firebase
export var config = {
    apiKey: "AIzaSyDZABsfg5EI--eO4N2AogYOJMfrM7DMl0s",
    authDomain: "trat-46dbc.firebaseapp.com",
    databaseURL: "https://trat-46dbc.firebaseio.com",
    projectId: "trat-46dbc",
    storageBucket: "trat-46dbc.appspot.com",
    messagingSenderId: "529381865694"
};
firebase.initializeApp(config);
firebase.auth().signInAnonymously().catch(function (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
});

export default class Start extends React.Component {

    signInAnonymous = () => {
        firebase.auth().onAuthStateChanged(function (user) {

            if (user) {
                // User is signed in.
                const isAnonymous = user.isAnonymous;
                let uid = user.uid;
                console.log("L'UID est : " + uid);
                console.log(user);
            }
            else {
                console.log(error.Message);
            }

        });

    };

    constructor(props) {
        super(props)
        this.state = ({
            newToken: false,
        })
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null && this.state.newToken === true) {
                this.props.navigation.navigate('HomeScreen');
                console.log(user);
            }
        })
    }

    render() {
        return (
            <ImageBackground source={require('../assets/Images/Start.png')} style={styles.container}>
                <LottieView
                    autoPlay
                    loop={false}
                    style={{width: 100+'%', height: 300, marginTop: 20}}
                    source={require('../Animations/logo.json')}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('HomeScreen')
                        }}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Accès Etudiant</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.signInAnonymous();
                            this.setState({newToken: true})
                        }}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Accès à l'application</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flex:1,
        marginTop: 80
    },
    button: {
        borderRadius: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        width: 282,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        marginTop: 50,
    },
    buttonText: {
        color: 'white',
        fontSize: 22,
    }

});
