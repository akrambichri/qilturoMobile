import React from 'react'
import {Image,  TouchableOpacity, StyleSheet, View, Text} from "react-native"
import {connect} from "react-redux"
import { addArticleBiblio,removeArticleBiblio,fetchBiblio,fetchProfile } from '../actions/userActions';
import {addError} from "../actions/errorsActions"

class ArticleCard extends React.Component {
    componentDidMount(){
        const {biblio} = this.props;
        if(!biblio || biblio.length === 0){
            this.props.fetchBiblio()
        }
        if(!this.props.profile)
         this.props.fetchProfile()
        
    }
    handleAddToBiblio =() => {
        const {article,biblio,profile} = this.props;
        let isInBiblio = biblio.filter(book => book.id ===  article.id).length>0;
        const isUserFree = profile.roles.filter(x=> x.name ==="free" || x.name==="Free").length !== 0 
        const isArticleFree = article.free
        if(isInBiblio)
        { 
            this.props.removeArticleBiblio(article.id)
            return
        }
         if(isUserFree && !isArticleFree){
             this.props.addError("Article n'est pas Gratuit!, Abonnez vous!")
             return
         }
         if(isUserFree && biblio.length >1){
            this.props.addError("Maximum d'article que vous pouvez avoir est 2, Abonnez vous!")
            return
         }

       this.props.addArticleBiblio(article.id)
    }
    render(){
    const {article,biblio, authors} = this.props;
    let isInBiblio = biblio.filter(book => book.id ===  article.id).length>0;
    let auteur;
    if(authors && article)
     auteur = authors.filter(aut => aut.id === article.auteur_id)[0]
    if(article){

        return (
        <TouchableOpacity style={styles.container} onPress={() => this.props.navigateToView() }>

                <Image source={{uri:  "http://lorempixel.com/150/150/"}} style={styles.image}/>
                <View style={styles.textContainer}>
                    <Text style={styles.title} >{article.book_name}</Text>
                    <Text style={styles.description}>{article.description}</Text>
                    <View style={styles.textFooter}>
                    <Text style={styles.author}>{auteur?auteur.auteur:"..."}</Text>
                    <TouchableOpacity onPress={this.handleAddToBiblio}>
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
        justifyContent: 'center',
        alignItems: 'center',
        margin:5,
        padding: 5,

        borderRadius:5,
        elevation:3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
         backgroundColor:"#fff"

    },
    image:{
        height:100,
        flex:1,
        borderRadius:5,
      
    },
    textContainer:{
        flexDirection:"column",
        flex:2,
        marginLeft:5,
        alignItems:"stretch",
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
        profile:state.user.profile,
        authors:state.articles.authors
    }
}
export default connect(mapStateToProps,{ addArticleBiblio,removeArticleBiblio,fetchBiblio,fetchProfile,addError })(ArticleCard)
