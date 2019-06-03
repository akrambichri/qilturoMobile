import React, { Component } from 'react'
import {View, StyleSheet, ImageBackground, Text,TouchableOpacity } from "react-native"
import {Icon} from "expo"
import {connect} from "react-redux"
import {rateArticle} from "../actions/userActions"

export class RatingScreen extends Component {
    static navigationOptions = {
        title: 'Rate your Experience',
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
      componentDidMount(){
          let article_id =  this.props.navigation.getParam("article_id")
          this.setState({article_id})
      }
      state ={
          article_id:undefined,
          scoreF:0,
          scoreR:0,
          scoreA:0
      }
    render() {
        return (
            <View style={styles.container}>
            <ImageBackground source={require("../assets/images/rateFrame.png")} style={styles.imgBg}>
                <View>
                    <Text style={styles.text}>Facile a lire?</Text>
                </View>
                <View style={styles.iconsContainer}>
                    <TouchableOpacity onPress={()=> this.setState({scoreF:1})}>
                        <Icon.Ionicons name="md-star" style={this.state.scoreF >= 1?{...styles.icon,color:"#ff0"}:styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.setState({scoreF:2})}>
                        <Icon.Ionicons name="md-star" style={this.state.scoreF >= 2?{...styles.icon,color:"#ff0"}:styles.icon} />
                    </TouchableOpacity>     
                    <TouchableOpacity onPress={()=> this.setState({scoreF:3})}>
                        <Icon.Ionicons name="md-star" style={this.state.scoreF >= 3?{...styles.icon,color:"#ff0"}:styles.icon} />
                    </TouchableOpacity>     
                    <TouchableOpacity onPress={()=> this.setState({scoreF:4})}>
                        <Icon.Ionicons name="md-star" style={this.state.scoreF >= 4?{...styles.icon,color:"#ff0"}:styles.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.setState({scoreF:5})}>
                        <Icon.Ionicons name="md-star" style={this.state.scoreF >= 5?{...styles.icon,color:"#ff0"}:styles.icon}  />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.text}>a recommander?</Text>
                </View>
                <View style={styles.iconsContainer}>
                    <TouchableOpacity onPress={()=> this.setState({scoreR:1})}>
                        <Icon.Ionicons name="md-star" style={this.state.scoreR >= 1?{...styles.icon,color:"#ff0"}:styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.setState({scoreR:2})}>
                        <Icon.Ionicons name="md-star" style={this.state.scoreR >= 2?{...styles.icon,color:"#ff0"}:styles.icon} />
                    </TouchableOpacity>     
                    <TouchableOpacity onPress={()=> this.setState({scoreR:3})}>
                        <Icon.Ionicons name="md-star" style={this.state.scoreR >= 3?{...styles.icon,color:"#ff0"}:styles.icon} />
                    </TouchableOpacity>     
                    <TouchableOpacity onPress={()=> this.setState({scoreR:4})}>
                        <Icon.Ionicons name="md-star" style={this.state.scoreR >= 4?{...styles.icon,color:"#ff0"}:styles.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.setState({scoreR:5})}>
                        <Icon.Ionicons name="md-star" style={this.state.scoreR >= 5?{...styles.icon,color:"#ff0"}:styles.icon}  />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.text}>appris qqch de nouveau ?</Text>
                </View>
                <View style={styles.iconsContainer}>
                    <TouchableOpacity onPress={()=> this.setState({scoreA:1})}>
                        <Icon.Ionicons name="md-star" style={this.state.scoreA >= 1?{...styles.icon,color:"#ff0"}:styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.setState({scoreA:2})}>
                        <Icon.Ionicons name="md-star" style={this.state.scoreA >= 2?{...styles.icon,color:"#ff0"}:styles.icon} />
                    </TouchableOpacity>     
                    <TouchableOpacity onPress={()=> this.setState({scoreA:3})}>
                        <Icon.Ionicons name="md-star" style={this.state.scoreA >= 3?{...styles.icon,color:"#ff0"}:styles.icon} />
                    </TouchableOpacity>     
                    <TouchableOpacity onPress={()=> this.setState({scoreA:4})}>
                        <Icon.Ionicons name="md-star" style={this.state.scoreA >= 4?{...styles.icon,color:"#ff0"}:styles.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.setState({scoreA:5})}>
                        <Icon.Ionicons name="md-star" style={this.state.scoreA >= 5?{...styles.icon,color:"#ff0"}:styles.icon}  />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <TouchableOpacity style={styles.confBtn} onPress={() => 
                    { 
                        let {article_id,scoreF,scoreR,scoreA} = this.state
                        this.props.rateArticle(article_id,scoreF,scoreR,scoreA)
                        this.props.navigation.navigate("Library")
                    }
            }>
                <Text style={styles.confBtnText}>Confirmer</Text>
            </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
    imgBg: {
        height:458,
        width:330,
        borderRadius:10,
        margin:30,
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
    iconsContainer:{
        flexDirection:"row",
    },
    icon:{
        fontSize:32,
        color:"#777",
        margin:5
    },
    text:{
        fontSize:26
    },
    confBtn:{
        borderRadius:25,
        height:46,
        width:280,
        marginLeft:"auto",
        marginRight:"auto",
        elevation:5,
        backgroundColor:"#043578"
    },
    confBtnText:{
        color:"#fff",
        textAlign:"center",
        marginTop:"auto",
        marginBottom:"auto"
    }
})
export default connect(null,{rateArticle})(RatingScreen)
