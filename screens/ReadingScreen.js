import React, { Component } from 'react'

import {WebView } from "react-native"
import Loading from "../components/Loading"
import {SecureStore} from "expo"
export class ReadingScreen extends Component {
    
   async componentDidMount(){
    const id = this.props.navigation.getParam("article_id");
    this.setState({id})
    const token=await SecureStore.getItemAsync("token")
    this.setState({token})
    
   }
    state ={
        id:null,
        token:null
    }

    render() {
        const {id, token} = this.state
        if(id && token)
        return (
            <WebView
            source={{uri: `https://qilturo.netlify.com/read/${id}/${token}`}}
            onMessage={(event)=> {
                if(event.nativeEvent.data==="FIN")
                    this.props.navigation.navigate("Library")
            }}
            />
        )
        else
        return <Loading/>
    }
}

export default ReadingScreen