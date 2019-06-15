import React, { Component } from 'react'
import {ScrollView, View ,StyleSheet} from "react-native"
import {fetchNotes,deleteNote} from "../actions/userActions"
import {connect} from "react-redux"
import Note from "../components/Note"
export class NotesScreen extends Component {
    componentDidMount(){
        this.props.fetchNotes()
    }
    render() {
        const {notes} = this.props
        return (
            <ScrollView style={{width:"100%",padding:20,backgroundColor:"#fff"}}>
                {notes && notes.map(note => <Note key={note.id} note={note} deleteNote={this.props.deleteNote}/>)}
            </ScrollView>
        )
    }
}
const mapStateToProps = state => {
    return {
            notes:state.user.notes
    }
}
export default connect(mapStateToProps,{fetchNotes,deleteNote})(NotesScreen)
