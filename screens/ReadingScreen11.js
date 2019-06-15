import React, { Component } from 'react'
import {connect} from "react-redux"
import {readBook,clearReading,getNextPage,getPreviousPage,addNote,finishReading,setReadDuration} from "../actions/userActions"
import {addMsg} from "../actions/msgsActions"
import {Text, ScrollView, StyleSheet,Keyboard, TouchableOpacity, View, Image, Platform, TextInput} from "react-native"
import {Icon} from "expo"
import Loading from "../components/Loading"

export class ReadingScreen extends Component {
    
    componentDidMount(){
        const id = this.props.navigation.getParam("article_id");
        this.props.readBook(id)
        this.setState({id})
    }

    fontSizes=[20,23,26]
    state ={
      id:undefined,
        showPopover: false,
        audioUrl:undefined,
        duration:0,
        showHeaders:false,
        showToolbox:false,
        showAudio:false,
        nightMode:false,
        fontSize:this.fontSizes[0],
    }
    handleaddNote = ({ eventType, content, selectionStart, selectionEnd }) => {
        const id = this.props.navigation.getParam("article_id");
        console.log(eventType,content)
            switch(eventType){
                case "add note":
                    this.props.addNote(id,content)
                    return
                default :
                    console.log("no eventType")
                    return
            }
    }
    render() {
        let {reading} = this.props;
        let fin = false;
        let titles=[]
        if(reading)
        {    
            reading = reading[0]
             fin = reading.page_number === reading.Max;
             titles=reading.titles
        }
        else   
            return <Loading/>
        return (
            <View style={{width:"100%",height:"100%"}}>
            <ScrollView style={this.state.nightMode?{...styles.container,backgroundColor:"#0854B3"}:styles.container}>
               <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                <Text style={this.state.nightMode?{...styles.title,color:"#fff"}:styles.title}>
                 {reading.title}
                </Text>
                <TouchableOpacity style={{flex:1,marginLeft:"auto"}} onPress={() => this.setState({showToolbox:!this.state.showToolbox})}>
                        <Icon.Ionicons
                            name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
                            size={30}
                            color="#000"
                        /> 
                    </TouchableOpacity>
                </View>
                <Text 
                selectable={true}  
                style={this.state.nightMode?{fontSize:this.state.fontSize,color:"#fff"}:{fontSize:this.state.fontSize}}
                onPress={(e)=>console.log(e)}
                 >
                {reading.text}
                 </Text>
                 
                
            </ScrollView>
            {this.state.showToolbox &&
            <View style={styles.toolBox}>
                   
                    <TouchableOpacity style={styles.action} onPress={()=>this.setState({showHeaders:!this.state.showHeaders})} >
                        <Image style={styles.actionImg} source={require("../assets/images/titles.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={()=>this.setState({nightMode:!this.state.nightMode})}>
                        <Image style={styles.actionImg} source={require("../assets/images/night.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={() => {let font = this.state.fontSize; this.setState({fontSize:font === 26 ? 20:font+3})} } >
                        <Image style={styles.actionImg} source={require("../assets/images/fontSize.png")}/>
                    </TouchableOpacity>           
                </View>}
                {this.state.showHeaders &&
                <View style ={styles.headersContainer} onPress={()=> console.log("xx")}>
                    <View style={styles.headers}>
                    {titles.map(title => 
                    <View key={title.page_number} style={styles.header}>
                        <Text style={{marginHorizontal:5}}>{title.page_number}</Text>
                        <Text style={{marginHorizontal:5}}>{title.title}</Text>
                    </View>)}
                    </View>
                </View>
                }
                <View style={this.state.nightMode?{...styles.footer,backgroundColor:"#0854B3"}:styles.footer}>
                   {reading.page_number !==1 &&
                    <TouchableOpacity style={styles.footerBtnPrev} onPress={() => this.props.getPreviousPage(this.state.id)}>
                        <Text style={this.state.nightMode?{color:"#fff",textAlign:"center",}:{textAlign:"center",}}>prev</Text>
                    </TouchableOpacity>
                    }
                 <Text style={this.state.nightMode?{...styles.footerNbPage,color:"#fff"}:styles.footerNbPage}>{reading.page_number}</Text>
                   
                    <TouchableOpacity style={styles.footerBtnNext} onPress={() => {
                        if(fin) {
                            this.props.navigation.navigate("Rating",{article_id:this.state.id})
                            this.props.finishReading(this.state.id)
                            }
                        else
                        this.props.getNextPage(this.state.id)}
                        }>
                        <Text style={this.state.nightMode?{color:"#fff",textAlign:"center"}:{textAlign:"center",}}>{fin?"fin":"Next"}</Text>
                    </TouchableOpacity>
                    
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
        textAlign:"center",
        flex:5
    },
    body:{
  
    },
    footer:{
        height:"5%",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
    },
    footerNbPage:{
        textAlign:"center",
        position:"absolute"
    },
    footerBtnNext:{
        flex:1,
        position:"absolute",
        right:"5%"
    },
    footerBtnPrev:{
        flex:1,
        position:"absolute",
        left:"5%"
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
        zIndex:5,
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
    headers:{
        width:"70%",
        height:"100%",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#fff",
        padding:5,
        elevation:5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    header:{
        flexDirection:"row",
        marginVertical:10,
        padding:5,
    },
    headersContainer:{
        ...StyleSheet.absoluteFill,
        width:"100%",
        height:"100%",
        backgroundColor:"rgba(0,0,0,0.3)",
        zIndex:2,
    },
    headermarg:{
        marginHorizontal:10
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
