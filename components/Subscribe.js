import React, { Component } from 'react'
import {View, StyleSheet, TouchableOpacity, Image, Text} from "react-native"
export class Subscribe extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View  style={styles.space}/>
                <TouchableOpacity style={styles.button} onPress={()=> this.props.onPress()} >
                    <Image style={styles.img} source={require("../assets/images/logo.png")} />
                    <View style={styles.textContainer}>
                        <Text style={styles.textHeader}>
                            S'Abonner
                        </Text>
                        <Text style={styles.text}>
                            Decouvrir la Version premium
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.space} />

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:170
    },
    button:{
        padding:10,
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center"
    },
    img:{
        height:62,
        width:62
    },
    textContainer:{
        flexDirection:"column"
    },
    textHeader:{
        color:"rgba(4, 53, 120, 1)",
        fontSize:16,
    },
    text:{
        color:"rgba(0, 0, 0, 1)",
        fontSize:14
    },
    space:{
        backgroundColor:"rgba(4, 53, 120, 0.15)",
        height:42,
        width:"100%"
    }
})
export default Subscribe
