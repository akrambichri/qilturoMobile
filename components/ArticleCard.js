import React from 'react'
import {Image, Button, TouchableOpacity, StyleSheet, View, Text} from "react-native"
import {connect} from "react-redux"
import { addArticleBiblio,removeArticleBiblio,fetchBiblio } from '../actions/userActions';

class ArticleCard extends React.Component {
    componentDidMount(){
        const {biblio} = this.props;
        if(!biblio || biblio.length === 0){
            this.props.fetchBiblio()
        }
    }
    render(){
    const {article} = this.props;
    const {biblio} = this.props;
    let isInBiblio = biblio.filter(book => book.id ===  article.id).length>0;

    if(article){

        return (
        <TouchableOpacity style={styles.container} onPress={() => this.props.navigateToView() }>

                <Image source={{uri:  "http://lorempixel.com/150/150/"}} style={styles.image}/>
                <View style={styles.textContainer}>
                    <Text style={styles.title} >{article.book_name}</Text>
                    <Text style={styles.description}>{article.description}</Text>
                    <View style={styles.textFooter}>
                    <Text style={styles.author}>{"mehdi"}</Text>
                    <TouchableOpacity onPress={() =>isInBiblio?this.props.removeArticleBiblio(article.id):this.props.addArticleBiblio(article.id)}>
                        <Image source={isInBiblio?require("../assets/images/remove.png"):require("../assets/images/add.png")} style={styles.addButton}/>
                    </TouchableOpacity>
                    </View>
                </View>
        </TouchableOpacity>
        )}
    else 
         return null;
        }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        padding:5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
        margin:5

    },
    image:{
        height:100,
        flex:1,
        borderRadius:5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
    },
    textContainer:{
        flexDirection:"column",
        flex:2,
        marginLeft:5,
        alignItems:"stretch"
    },
    title:{
        fontSize:14,
        fontWeight:"600"
    },
    description:{
        fontSize:11,
    },
    author:{
        fontSize:10,
        color:"rgba(8, 12, 45, 0.7)"
    },
    addButton:{
        height:22,
        width:22,
        marginLeft:"auto",
        borderRadius:25,
        borderWidth:0.1,
        borderColor:"#043578"
    },
    textFooter:{
        flexDirection:"row",
        justifyContent:"space-between",

    }
})
const mapStateToProps = state => {
    return {
        biblio:state.user.biblio,
    }
}
export default connect(mapStateToProps,{ addArticleBiblio,removeArticleBiblio,fetchBiblio })(ArticleCard)
