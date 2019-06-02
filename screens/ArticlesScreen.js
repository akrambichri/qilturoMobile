import React, { Component } from 'react'
import {FlatList,Image,StyleSheet,View } from "react-native"
import {connect} from "react-redux"
import {fetchArticleOF} from "../actions/categoryActions";
import  ArticleCard  from "../components/ArticleCard";

export class ArticlesScreen extends Component {
    componentDidMount() {
        const category = this.props.navigation.getParam("category")
        if(category)
            this.props.fetchArticleOF(category.id)
        else
        console.log("cat id not set")
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam("category").designation,
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

    render() {
        const {articles} = this.props;
        const category = this.props.navigation.getParam("category")
        return (
            <>
                 <Image source={{uri : category.category_pic || "http://lorempixel.com/150/150/"} } style={Styles.image}  resizeMode='cover'/>
                 <View ></View>
                {articles?
                    <FlatList 
                     data={articles} 
                     renderItem={({item}) =>
                                 <ArticleCard 
                                    article={item}
                                    navigateToView = {() => this.props.navigation.navigate("Article",{article_id:item.id,name:item.book_name})}

                                 />
                              }
                     numColumns={1}
                     keyExtractor={(item, index) => index.toString()}
                    />
                    :null
                   }
                   </>
        )
    }
}

const Styles = StyleSheet.create({
    image:{
        height:200,
        width:"100%"
    }
})
const mapStateToProps = state => {
    return {
        articles:state.categories.articlesCat
    }
}

export default connect(mapStateToProps,{fetchArticleOF})(ArticlesScreen)
