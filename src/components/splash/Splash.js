import React from 'react';
import {
    TextInput,
    Text,
    TouchableOpacity,
    Image,
    View,
    StyleSheet,
    Dimensions,
    StatusBar,
    AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './styles/style'

class Splash extends React.Component {
    constructor(props) {
        super(props)
    }
    // async componentDidMount() {
    //     const signindetails = await AsyncStorage.getItem("signindata")
    //     console.log("recent", signindetails)
    //     let parsedata = JSON.parse(signindetails)
    //     console.log("parsedata", parsedata.accessToken)
    //     let gettoken = parsedata.accessToken
    // }
    async componentDidMount() {
        const signindetails = await AsyncStorage.getItem("accesstoken")
        console.log("signindetails", signindetails)
        if (signindetails !== null) {
            setTimeout(() => {
                Actions.header()
            }, 3000)
        }
        else {
            Actions.SignIn()
        }
        // console.log("signindetails", signindetails)


    }
    render() {
        return (
            <View style={styles.ContainerSplash}>
             <StatusBar backgroundColor="#000" barStyle="light-content" animated={true}/>
                {/* <StatusBar hidden = {true} /> */}
                <Text style={styles.LogoText}>
                <Image
                    source={require('../../assets/images/logo.png')}
                 />
                </Text>
                {/* <Text style={styles.LogoPara}>Sed ut perspiciatis unde omnis iste na</Text> */}
            </View>
        )
    }
}

export default Splash