import React from 'react';
import {View, Image, FlatList, StyleSheet, Dimensions,StatusBar,Text,TouchableOpacity } from "react-native"
import { TabView,TabBar } from 'react-native-tab-view';
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
       <TabView
        navigationState={this.state}
        renderScene ={ ({ route }) => {
          switch (route.key) {
            case 'En Cours':
              return this.props.loading?<Loading/>:<BookList data ={booksUnfinished}/>
            case 'Terminer':
              return this.props.loading?<Loading/>:<BookList data ={booksFinished}/>
            case 'Tous':
              return this.props.loading?<Loading/>:<BookList data ={books}/>
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
            style={styles.tabar}
            activeColor="#000"
            inactiveColor="#000"
          />
        }
        
      />
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
                navigateToView = {() => this.props.navigation.navigate("Article",{article_id:item.id,name:item.book_name})}

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
  tabar:{
    backgroundColor:"#fff",
    borderWidth:0.5,
    borderColor:"rgba(4, 53, 120, 1)",
    borderRadius:25,
    margin:10

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
  }

});
const mapstateToProps = state => {
  return {
    biblio: state.user.biblio,
    loading:state.user.loading
  }
}
export default connect(mapstateToProps,{fetchBiblio})(LibraryScreen)