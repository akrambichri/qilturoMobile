import React, { Component } from 'react'
import {View, Text, StyleSheet} from "react-native"


export class CGScreen extends Component {
    static navigationOptions = {
        title: 'Conditions Generales',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
          textAlign:"center",
          marginLeft:"auto",
          marginRight:"auto"
        }
      };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum. when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        padding:"5%",
        textAlign:"center"
    },
    text:{
        fontSize:18,
        color:"rgba(0,0,0,0.7)"
    }
})
export default CGScreen
