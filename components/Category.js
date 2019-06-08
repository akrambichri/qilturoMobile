import React, { Component } from 'react'
import {View, Image, StyleSheet, Dimensions, Text, TouchableOpacity} from "react-native"

export class Category extends Component {
    render() {
        const {item} = this.props
        if(item)
            return (
                <View style={{...styles.container,...this.props.style}} >
                    <TouchableOpacity onPress={() => this.props.navigate()} >
                    <Image source={{uri : item.category_pic || "http://lorempixel.com/150/150/"} } style={styles.image}  resizeMode='cover'/>
                    <View style={styles.textView}>
                        <Text style={{color:"white",fontSize:20}}>{item.designation}</Text>
                    </View>
                    <View style={styles.overlay} />
                    </TouchableOpacity>
                </View>
            )
        else 
            return null
    }
}

const styles = StyleSheet.create( {
        container:{
            marginTop:10,
            marginBottom:10,
            marginLeft:"auto",
            marginRight:"auto",
            backgroundColor:"#fff",
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 2,
            borderRadius:5
        },
        image:{
            width:Math.round(Dimensions.get('window').width)*0.47,
            height:Math.round(Dimensions.get('window').width)*0.47,
            borderRadius:5
        },
        overlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(154, 196, 255, 0.5)',
            borderRadius:5
          },
        textView:{
            position:"absolute",
            textAlign:"center",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center', 
            alignItems: 'center',
            zIndex:1
        }

})

export default Category


