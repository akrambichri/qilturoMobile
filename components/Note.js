import React, { Component } from 'react'
import { View,StyleSheet, Text, TouchableOpacity, Image,Dimensions } from "react-native"

export class Note extends Component {
    render() {
        const {note}=this.props
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
                        <TouchableOpacity onPress={()=> this.props.deleteNote(note.id)}>
                            <Image
                                style={styles.actionImg}
                                source={require("../assets/images/delete.png")}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.text}>{note.text}</Text>
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
