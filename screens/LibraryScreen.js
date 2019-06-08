import React from 'react';
import {View, Image, FlatList, StyleSheet, Dimensions,StatusBar,Text,TouchableOpacity } from "react-native"

import  {Tab,Tabs,TabHeading} from 'native-base';
import ArticleCard from "../components/ArticleCard"
import {connect} from "react-redux"
import {fetchBiblio} from "../actions/userActions"
import Loading from "../components/Loading"

class LibraryScreen extends React.Component {
  static navigationOptions = {
    title: 'Library',
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

  state = {
    index: 0,
    routes: [
      { key: 'En Cours', title: 'En Cours' },
      { key: 'Terminer', title: 'Terminer' },
      { key: 'Tous', title: 'Tous' },
    ],
  };

  componentDidMount() {
    if(this.props.biblio.length === 0)
      this.props.fetchBiblio()
      console.log("LibraryScreen mounting...")
  }


  componentWillUnmount(){
    console.log("LibraryScreen unmounting...")
  }

  render() {
    const books = this.props.biblio;
    let booksFinished = []
    let booksUnfinished  = []

    if(books.length>0)
    {
     booksFinished = books.filter(x=> x.info.finished === 1)
     booksUnfinished = books.filter(x=> x.info.finished === 0)
      }
    return (
        <Tabs  tabContainerStyle={{backgroundColor:"#fff",borderRadius:25}}
              tabBarUnderlineStyle={{width:0}}
        >
              <Tab 
                textStyle={styles.textStyle}
                activeTabStyle={{...styles.activeTabStyle,...styles.borderLeft}}
                tabStyle={{...styles.tab,...styles.borderLeft}}
                activeTextStyle={styles.activeTextStyle}
               heading="Tous">
              {this.props.loading?<Loading/>:<BookList navigation={this.props.navigation} data ={books}/>}
              </Tab>
              <Tab 
                textStyle={styles.textStyle}
                activeTabStyle={styles.activeTabStyle}
                activeTextStyle={styles.activeTextStyle}
                tabStyle={styles.tab} 
                heading="En cours" >
             { this.props.loading?<Loading/>:<BookList navigation={this.props.navigation} data ={booksUnfinished}/>}
              </Tab>
              <Tab 
                textStyle={styles.textStyle}
                activeTabStyle={{...styles.activeTabStyle,...styles.borderRight}}
                activeTextStyle={styles.activeTextStyle}
                tabStyle={{...styles.tab,...styles.borderRight}}
                heading="Terminer" >
              {this.props.loading?<Loading/>:<BookList navigation={this.props.navigation} data ={booksFinished}/>}
              </Tab>
        </Tabs> 
       
    );
  }
}

const BookList = props => 
   props.data && props.data.length>0? 
   <FlatList 
      data={props.data} 
      renderItem={({item}) =>
              <ArticleCard 
                article={item}
                navigateToView = {() => props.navigation.navigate("Article",{article_id:item.id,name:item.book_name})}

              />
          }
          numColumns={1}
       keyExtractor={(item, index) => index.toString()}
    />
:
<LibVide/>

const LibVide = props => (
  <View style={styles.videContainer}>
      <Image style={styles.videImg} source={require("../assets/images/libvide.png")} />
      <Text style={styles.videText}>Aucune Article Trouvees !</Text>
  </View>
)
const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
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

  videContainer:{
    height:"100%",
    width:"100%",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
  },
  videImg:{
      width:130,
      height:130,
  },
  videText:{
    fontSize:19,
    margin:5
  },
  borderRight:{
    borderTopRightRadius:25,
    borderBottomRightRadius:25,
  },
  borderLeft:{
    borderTopLeftRadius:25,
    borderBottomLeftRadius:25,
  }

});
const mapstateToProps = state => {
  return {
    biblio: state.user.biblio,
    loading:state.user.loading
  }
}
export default connect(mapstateToProps,{fetchBiblio})(LibraryScreen)