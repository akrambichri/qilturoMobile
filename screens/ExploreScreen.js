import React, { Component } from 'react'
import {View, StyleSheet, Text, FlatList, Image, TouchableOpacity,ScrollView } from "react-native"
import {connect} from "react-redux"
import {fetchAll,fetchPopular} from "../actions/articleActions"
import {fetchCategories} from "../actions/categoryActions"
import Category from "../components/Category"
import ArticleCard from "../components/ArticleCard"

export class ExploreScreen extends Component {
    static navigationOptions = {
        title: 'Explorer',
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
          if(!this.props.categories)
             this.props.fetchCategories()
          this.props.fetchPopular()
      }
    render() {
        const {categories} = this.props
        const {popular} = this.props
        return (
            <ScrollView>
                <Text style={styles.header}>Les Categories</Text>
            {categories?
                <FlatList 
                data={categories} 
                renderItem={({item}) =>
                            <Category style={{marginLeft:10, marginRight:10}} item={item} key={item.id} navigate={() => this.props.navigation.navigate("Articles",{category:item})}/>
                        }
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}
                />
                :null
            }
            <Text style={styles.header}>Notre Selection</Text>
            <View style={styles.featuredContainer}>
                <Image style={styles.imgFeatured} source={{uri:"http://lorempixel.com/150/150/"}} />
                <View style={styles.featuredInfos}>
                    <Text >LE COUP DE COEUR DE LA SMAINE</Text>
                    <Text style={styles.featuredTitle}>The Attention Revolution</Text>
                    <Text style={styles.featuredAuteur}>Allen B. Wallence</Text>
                    <TouchableOpacity style={styles.btnFeatured} >
                        <Text style={styles.btnFeaturedText}>Decouvrir</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.header}>Les Populaires</Text>
            <ArticleCard 
                                    article={popular[0]}
                                    navigateToView = {() => this.props.navigation.navigate("Article",{article_id:item.id,name:item.book_name})}
                                 />
            <FlatList 
                     data={popular} 
                     renderItem={({item}) =>
                                 <ArticleCard 
                                    article={item}
                                    navigateToView = {() => this.props.navigation.navigate("Article",{article_id:item.id,name:item.book_name})}
                                 />
                              }
                     keyExtractor={(item, index) => index.toString()}
                    />
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
  header:{
      fontSize:16,
      margin:10
  },
  featuredContainer:{
        width:"100%",
        height:200,
        backgroundColor:"rgba(8, 84, 179, 0.1)",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
  },
  imgFeatured:{
      height:169,
      width:110,
      borderRadius:5,
      
  },
  featuredInfos:{
      flexDirection:"column",
      paddingHorizontal:10,
  },
  featuredTitle:{
      fontSize:20,
      marginVertical:5,
  },
  featuredAuteur:{
      fontSize:16,
      color:"rgba(8, 12, 45, 0.7)"
  },
  btnFeatured:{
      marginRight:"auto",
      marginLeft:"auto",
      borderRadius:25,
      backgroundColor:"rgba(4, 53, 120, 1)",
      color:"white",
      height:30,
      width: 100,
      marginVertical:10
  },
  btnFeaturedText:{
      color:"white",
      textAlign:"center",
      marginTop:"auto",
      marginBottom:"auto",
  }
})
const mapStateToProps = state => {
    return {
        popular:state.articles.popular,
        categories:state.categories.categories
    }
}
export default connect(mapStateToProps,{fetchPopular,fetchCategories})(ExploreScreen)
