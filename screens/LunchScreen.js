import React from 'react';
import {
  Text,
  StyleSheet,
  ImageBackground ,
  Image,
} from 'react-native';
import {SecureStore} from "expo"

class LunchScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await SecureStore.getItemAsync('token');
    console.log("lunch Screen!")
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    setTimeout(() =>this.props.navigation.navigate(userToken ? 'Home' : 'Auth'),2000)
  };

  render() {
    return (
      <ImageBackground  source={require("../assets/images/lunchScreenBG.png")} style={styles.container}>
        <Image source={require('../assets/images/LogoText.png')}
         style={styles.logo}        
        />
     
      </ImageBackground >
    );
  }
}

const styles = StyleSheet.create({
    container:{
      justifyContent:"center",
      alignContent:"center",
      height:"100%",
      width:"100%",
    },
    logo: {
      width: 150,
       height: 200,
       marginRight:"auto",
       marginLeft:"auto"
    },
  
})

export default LunchScreen