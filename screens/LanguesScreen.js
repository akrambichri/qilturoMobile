import React, { Component } from 'react'
import {View, Picker, Text,TouchableOpacity,StyleSheet} from "react-native"

export class LanguesScreen extends Component {
    state ={
        language:"fr"
    }
    render() {
        return (
            <View style={{padding:20, width:"100%"}}>
                <Text>Choisir la langue de l'application</Text>
                <Picker
                selectedValue={this.state.language}
                style={{height: 50, width: "100%",zIndex:5}}
                onValueChange={(itemValue, itemIndex) =>
                this.setState({language: itemValue})
                }>
                <Picker.Item label="Français" value="fr" />
                <Picker.Item label="English" value="en" />
            </Picker>
            <TouchableOpacity style={styles.btnContainer}>
                <View>
                    <Text style={styles.btnText}>Confirmer</Text>
                </View>
            </TouchableOpacity>
          </View>
        )
    }
}
const styles= StyleSheet.create({
    btnContainer:{
        margin:10,
        width:"40%",
        height:50,
        backgroundColor:"#043578",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:25
    },
    btnText:{
        color:"white",
        textAlign:"center"
    }
})
export default LanguesScreen
