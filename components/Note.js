import React, { Component } from 'react'
import { View,StyleSheet, Text, TouchableOpacity, Image,Dimensions } from "react-native"

export class Note extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headertext}>17.05.2019</Text>
                    <View style={styles.actions}>
                        <TouchableOpacity>
                            <Image
                                style={styles.actionImg}
                                source={require("../assets/images/share.png")}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                style={styles.actionImg}
                                source={require("../assets/images/copy.png")}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                style={styles.actionImg}
                                source={require("../assets/images/delete.png")}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.text}> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum. when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                <Text style={styles.footerText}>1/2</Text>
            </View>
        )
    }
}
const styles= StyleSheet.create({
    container:{
        flexDirection:"column",
        elevation:2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        borderRadius:5,
        backgroundColor:"#fff",
        padding:10    
        
    },
    header:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    headertext:{
        flex:1,
        color:"#043578"
    },
    actions:{
        flexDirection:"row",
        justifyContent:"space-evenly",
        flex:2

    },
    actionImg:{
        width:21
    },
    text:{
        fontSize:16,
        margin:10,
        textAlign:"left"
    },
    footerText:{
        textAlign:"center",
        marginVertical:5,
    }
})
export default Note
