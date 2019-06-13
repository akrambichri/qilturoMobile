import React from 'react'
import {View, Image, StyleSheet, ScrollView,StatusBar,Text,Platform,TouchableOpacity,TouchableHighlight,Dimensions } from "react-native"
import {Tabs, Tab, TabHeading} from "native-base"
import { TabView,TabBar,  } from 'react-native-tab-view';
import {fetchOne} from "../actions/articleActions"
import {exportKindle,fetchProfile} from "../actions/userActions"
import {addError} from "../actions/errorsActions"
import {connect} from "react-redux"
import { Audio,SecureStore,Video, Icon } from 'expo';
import VideoPlayer from 'expo-video-player'
import {API_URL} from "../api"


class ArticleViewScreen extends React.Component {
    componentDidMount(){
      console.log("ArticleViewScreen mounting...")
      const article_id = this.props.navigation.getParam("article_id");
      if(article_id)
        this.props.fetchOne(article_id)
      if(!this.props.profile)
       this.props.fetchProfile()
      const token = SecureStore.getItemAsync("token")
      token.then(token => this.setState({token:token}))
    }
    componentWillUnmount(){
      console.log("ArticleViewScreen unmounting...")
    }
    state = {
        token:"",
        showVideo:false
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

      handlekindle =() => {
        const article_id = this.props.navigation.getParam("article_id");
        if(this.props.profile&&this.props.profile.kindle_email!="")
          this.props.exportKindle(article_id)
        else{
          this.props.navigation.navigate("Profile")
          this.props.addError("veillez ajouter un email kindle!")
        }
      }

    render(){
    let {article,authors} = this.props;
    
    if(!article)
        return null;
    else {
      article=article[0]
      let auteur;
      if(authors && article)
       auteur = authors.filter(aut => aut.id === article.auteur_id)[0]
    return (
      <>
      {this.state.showVideo &&
          <View style={styles.videContainer} >
          
          <Video
            source={{ uri: 'http://techslides.com/demos/sample-videos/small.mp4' }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            isLooping
            style={{ width: 300, height: 300,zIndex:6 }}
            useNativeControls
           />
           <TouchableHighlight onPress={() => this.setState({showVideo:false})}>
             <Text style={{color:"#fff",zIndex:6,marginTop:20,fontSize:26}}>Close</Text>
           </TouchableHighlight>
            </View>
         }
        <ScrollView style={{paddingBottom:20}}>
          
        <View style={styles.imgContainer}>
            <Image style={styles.image} source={{uri : "http://lorempixel.com/150/150/"} }/>
        </View>
        <View style={styles.articleInfoContainer}>
            <Text style={styles.articleInfoAuthor}>{auteur&&auteur.auteur || "auteur introubable!"}</Text>
            <Text style={styles.articleInfoTitle}>{article.book_name}</Text>
        </View>
        <View style={{flexDirection:"column"}}>
        <View style={styles.actionsContainer}>
          <TouchableOpacity rounded style={styles.btn} onPress={()=>  this.props.navigation.navigate("Reading",{article_id:article.id})}  >
           <Image style={{height:13,marginRight:5}} source={require("../assets/images/read.png")}/>
            <Text style={{textAlign:"center",color:"#fff"}}>
              Read
            </Text>
          </TouchableOpacity>
          <TouchableHighlight style={{width:"45%",}} onPress={this.handlekindle}>
          <Text style={{color:"#FFAE42",fontSize:18,textAlign:"center",marginTop:"auto",marginBottom:"auto"}}>Kindle</Text>
        </TouchableHighlight>
        </View>
        {this.props.profile && this.props.profile.roles.filter(x=> x.name!=="free" && x.name!=="Free").length > 0 &&
        <View style={styles.actionsContainer}>
        <TouchableOpacity rounded style={styles.roundBtn} onPress={()=> this.handleAudio()}  >
            <Image style={{height:19,marginRight:5}} source={require("../assets/images/listen.png")}/>
        </TouchableOpacity>
          <TouchableOpacity rounded style={styles.roundBtn} onPress={()=> this.setState({showVideo:!this.state.showVideo})}  >
             <Icon.Ionicons name={Platform === "ios"? "ios-play-circle":"md-play-circle"} color="white" style={{height:26}} />
          </TouchableOpacity>
          </View>
        }
        </View>
        <Tabs tabContainerStyle={{backgroundColor:"#fff",borderRadius:25}}
              tabBarUnderlineStyle={{width:0,height:0,display:"none"}}>
          <Tab 
          activeTabStyle={{...styles.activeTabStyle,...styles.borderLeft}}
          tabStyle={{...styles.tab,...styles.borderLeft}}
           textStyle={styles.textStyle}
         
           activeTextStyle={styles.activeTextStyle}

          heading="Summary">
             <SummaryRoute summary={article.description} />
          </Tab>
          <Tab
          activeTabStyle={{...styles.activeTabStyle,...styles.borderRight}}
          tabStyle={{...styles.tab,...styles.borderRight}}
           textStyle={styles.textStyle}
           activeTextStyle={styles.activeTextStyle}
          heading="WITF">
            <SecondRoute WITF={article.WITF} />
          </Tab>
        </Tabs>
        </ScrollView>
        </>
    )
  }
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
  roundBtn:{
    backgroundColor:"#043578",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        width:50,
        height: 53.67,
        flexDirection:"row",
        textAlign: 'center',
        alignItems:"center",
        justifyContent: 'center',
        marginVertical:20,
        borderRadius:25
  },
  videContainer:{
    ...StyleSheet.absoluteFill,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex:5,
  },
  video:{
    marginTop:"auto",
    marginBottom:"auto",
    height:500,
  },
  tabs:{
    borderColor:"#043578",
    borderWidth:1,
    backgroundColor:"#fff"
},
tab:{
  borderColor:"#043578",
  borderWidth:1,
  backgroundColor:"#fff"
  
},
textStyle:{
  color:"#043578"
},
activeTabStyle:{
  borderColor:"#043578",
  borderWidth:1,
  backgroundColor:"#043578"
  
},
activeTextStyle:{
  color:"#fff"
},

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
        left:Dimensions.get("screen").width/2 - 178/2,
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
        backgroundColor:"#043578",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        width:"45%",
        height: 53.67,
        flexDirection:"row",
        textAlign: 'center',
        alignItems:"center",
        justifyContent: 'center',
        marginVertical:20,
        borderRadius:25
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
        marginBottom:15,
        padding:5,
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"center"
      },
      icon:{
        height:"auto"
      },
      borderRight:{
        borderTopRightRadius:25,
        borderBottomRightRadius:25,
      },
      borderLeft:{
        borderTopLeftRadius:25,
        borderBottomLeftRadius:25,
      }
})


const mapStateToProps = state => {
  return {
    article:state.articles.show,
    authors:state.articles.authors,
    profile:state.user.profile
  }
}
export default connect(mapStateToProps,{fetchOne,exportKindle,addError,fetchProfile})(ArticleViewScreen)
