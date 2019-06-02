import React from 'react'
import {View, Image, StyleSheet, Dimensions,StatusBar,Text,TouchableOpacity } from "react-native"
import { TabView,TabBar,  } from 'react-native-tab-view';
import {fetchOne} from "../actions/articleActions"
import {connect} from "react-redux"
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

    render(){
    let {article} = this.props;
    if(!article)
        return null;
    else
      article=article[0]
    return (
        <>
        <View style={styles.imgContainer}>
            <Image style={styles.image} source={{uri : "http://lorempixel.com/150/150/"} }/>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity rounded style={styles.btn} onPress={()=> this.props.navigation.navigate("Reading",{article_id:article.id})}  >
            <Text style={{textAlign:"center",color:"white"}}>
              Read
            </Text>
          </TouchableOpacity>
        </View>
        <TabView
        navigationState={this.state}
        renderScene ={ ({ route }) => {
          switch (route.key) {
            case 'first':
              return <SummaryRoute summary={article.description} />;
            case 'second':
              return <SecondRoute WITF={article.WITF} />;
            default:
              return null;
          }
        }}

        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
        style={styles.container}
        renderTabBar={props =>
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: "#043578" }}
            style={{ backgroundColor: "white"}}
            activeColor="#000"
            inactiveColor="#000"
          />
        }
        
      />
        </>
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
        height:239,
        zIndex:1,
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
        marginLeft:"auto",
        marginRight:"auto",
        width:240.35,
        height: 53.67,
        padding:"auto",
        textAlign: 'center',
        justifyContent: 'center',
        margin:20,
        borderRadius:25
      },
      actionsContainer:{
        marginTop:40,
        padding:10
      }
})


const mapStateToProps = state => {
  return {
    article:state.articles.show
  }
}
export default connect(mapStateToProps,{fetchOne})(ArticleViewScreen)
