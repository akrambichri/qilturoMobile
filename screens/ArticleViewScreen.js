import React from 'react'
import {View, Image, StyleSheet, ScrollView,StatusBar,Text,TouchableOpacity } from "react-native"
import {Tabs, Tab, TabHeading} from "native-base"
import { TabView,TabBar,  } from 'react-native-tab-view';
import {fetchOne} from "../actions/articleActions"
import {connect} from "react-redux"
import { Audio,SecureStore } from 'expo';
import {API_URL} from "../api"

class ArticleViewScreen extends React.Component {
    componentDidMount(){
      const article_id = this.props.navigation.getParam("article_id");
      if(article_id)
        this.props.fetchOne(article_id)
    }
    state = {
        index: 0,
        routes: [
          { key: 'first', title: 'Summary' },
          { key: 'second', title: 'WITF' },
        ],
      };
      
      static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam("name"),
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
              marginLeft:"auto",
              marginRight:"auto"
            }
          };
      };
      handleAudio = async () => {
        const article_id = this.props.navigation.getParam("article_id");
        
        const soundObject = new Audio.Sound();
      try {
        let token = await SecureStore.getItemAsync("token")
        await soundObject.loadAsync({uri:API_URL+`/articles/getaudio/${article_id}?token=${token}`});
        await soundObject.playAsync();
        // Your sound is playing!
      } catch (error) {
        // An error occurred!
        console.log(error)
      }
      }
    render(){
    let {article} = this.props;
    if(!article)
        return null;
    else
      article=article[0]
    return (
        <ScrollView>
        <View style={styles.imgContainer}>
            <Image style={styles.image} source={{uri : "http://lorempixel.com/150/150/"} }/>
        </View>
        <View style={styles.articleInfoContainer}>
            <Text style={styles.articleInfoAuthor}>De Joi Pulizzi</Text>
            <Text style={styles.articleInfoTitle}>{article.book_name}</Text>
        </View>
        <View style={styles.actionsContainer}>
        <TouchableOpacity rounded style={{...styles.btn,...styles.btnRadLeft}} onPress={()=> this.handleAudio()}  >
        <Image style={{height:13,marginRight:5}} source={require("../assets/images/listen.png")}/>
            <Text style={{textAlign:"center",color:"white"}}>
              Listen
            </Text>
          </TouchableOpacity>
          <TouchableOpacity rounded style={{...styles.btn,...styles.btnRadRight}} onPress={()=> this.props.navigation.navigate("Reading",{article_id:article.id})}  >
           <Image style={{height:13,marginRight:5}} source={require("../assets/images/read.png")}/>
            <Text style={{textAlign:"center",color:"#0854B3"}}>
              Read
            </Text>
          </TouchableOpacity>
        </View>
        <Tabs>
          <Tab heading="Summary">
             <SummaryRoute summary={article.description} />
          </Tab>
          <Tab heading="WITF">
            <SecondRoute WITF={article.WITF} />
          </Tab>
        </Tabs>
        </ScrollView>
    )
    }
}
const SummaryRoute = (props) => (
    <View style={styles.scene} >
          <Text style={styles.text}> {props.summary} </Text>  
      </View>
  );
  
const SecondRoute = (props) => (
    <View style={styles.scene} >
       <Text style={styles.text}> {props.WITF} </Text>  
      </View>
  );

const styles = StyleSheet.create({
    articleInfoContainer:{
        marginTop:30,
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
    articleInfoTitle:{
      fontSize:18,
      textAlign:"center"
    },
    articleInfoAuthor:{
      textAlign:"center",
      fontSize:14,
    },
    imgContainer:{
        backgroundColor:"rgba(4, 53, 120, 0.1)",
        height:210,
        width:"100%"
    },
    image:{
        position:"absolute",
       ...StyleSheet.absoluteFill,
        left:89,
        top:30,
        width:178,
        height:200,
        zIndex:1,
        borderRadius:5
    },
    container: {
        marginTop: StatusBar.currentHeight,
        backgroundColor:"#fff",
        color:"#000"
      },
      scene: {
        flex: 1,
        
      },
      text:{
        padding:5,
        fontSize:16
      },
      btn:{
        backgroundColor:"#0854B3",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        width:140.35,
        height: 53.67,
        flexDirection:"row",
        textAlign: 'center',
        alignItems:"center",
        justifyContent: 'center',
        marginVertical:20,
      },
      btnRadLeft:{
        
        borderTopLeftRadius:25,
        borderBottomLeftRadius:25
      },
      btnRadRight:{
        borderTopRightRadius:25,
        borderBottomRightRadius:25,
        backgroundColor:"#fff",
        borderWidth:0.3,
        borderColor:"#0854B3",
      },
      actionsContainer:{
        padding:5,
        flexDirection:"row",
        justifyContent:"center"
      },
      icon:{
        height:"auto"
      }
})


const mapStateToProps = state => {
  return {
    article:state.articles.show
  }
}
export default connect(mapStateToProps,{fetchOne})(ArticleViewScreen)
