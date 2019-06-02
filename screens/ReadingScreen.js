import React, { Component } from 'react'
import {connect} from "react-redux"
import {readBook,clearReading,getNextPage,getPreviousPage,addNote,finishReading,setReadDuration} from "../actions/userActions"
import {addMsg} from "../actions/msgsActions"
import {Text, ScrollView, StyleSheet, TouchableOpacity, View, Image, Platform} from "react-native"
import {Icon} from "expo"
import Loading from "../components/Loading"

export class ReadingScreen extends Component {
    
    componentDidMount(){
        const id = this.props.navigation.getParam("article_id");
        this.props.readBook(id)
    }

    fontSizes=["20px","23px","26px"]
    state ={
      id:undefined,
        showPopover: false,
        audioUrl:undefined,
        duration:0,
        showHeaders:false,
        showFontSize:false,
        showAudio:false,
        nightMode:false,
        fontSize:this.fontSizes[1],
    }
  
    render() {
        let {reading} = this.props;
        if(reading)
            reading = reading[0]
        else   
            return <Loading/>
        return (
            <View style={{width:"100%",height:"100%"}}>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>
                 {reading.title}
                </Text>
                <Text style={styles.body}>
                 {reading.text}
                </Text> 
                <Text style={styles.footer}>
                 {reading.page_number}
                </Text>
                
            </ScrollView>
            <View style={styles.toolBox}>
                    <TouchableOpacity style={styles.action}>
                        <Icon.Ionicons
                            name={Platform.OS === 'ios' ? 'ios-arrow-forward' : 'md-arrow-forward'}
                            size={18}
                            style={styles.actionImg}
                            color="#043578"
                        />

                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action}>
                        <Image style={styles.actionImg} source={require("../assets/images/titles.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={()=>this.setState({nightMode:!this.state.nightMode})}>
                        <Image style={styles.actionImg} source={require("../assets/images/night.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} >
                        <Image style={styles.actionImg} source={require("../assets/images/fontSize.png")}/>
                    </TouchableOpacity>

                </View>
                <View style={styles.titles}>

                </View>
            </View>
        )
        
    }
}
const styles = StyleSheet.create({
    container: {
      padding:10,
      height:"100%",
      flex: 1,
    },
    title:{
        fontSize:21,
        fontWeight:"800",
        marginBottom:10,
    },
    body:{
        fontSize:16,
        
    },
    footer:{
        textAlign:"center",
        marginTop:5,
        marginBottom:15,
    },
    toolBox:{
        ...StyleSheet.absoluteFill,
        top:"40%",
        right:0,
        left:"auto",
        elevation:5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        height:208,
        width:50,
        backgroundColor:"white",
        flex:1,
        flexDirection:"column",
    },
    
    action:{
        borderWidth: 0.1,
        borderColor: '#000',
        flex:1,
    },
    actionImg:{
        marginLeft:"auto",
        marginRight:"auto",
        marginTop:"auto",
        marginBottom:"auto"
      
    },
    titles:{
        ...StyleSheet.absoluteFill,
        width:"50%",
        height:"100%",

    }
  });
const mapStateToProps = state => {
    return {
        profile:state.user.profile,
        reading:state.user.reading,
        loading:state.user.loading,
    }
}
export default connect(mapStateToProps,{readBook,clearReading,addMsg,getNextPage,getPreviousPage,addNote,finishReading,setReadDuration})(ReadingScreen)
