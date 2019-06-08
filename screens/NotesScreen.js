import React, { Component } from 'react'
import {ScrollView, View ,StyleSheet} from "react-native"
import Note from "../components/Note"
export class NotesScreen extends Component {
    render() {
        return (
            <ScrollView style={{width:"100%",padding:20,backgroundColor:"#fff"}}>
                <Note/>
            </ScrollView>
        )
    }
}

export default NotesScreen
