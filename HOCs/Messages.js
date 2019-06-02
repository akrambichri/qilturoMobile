import React, { Component } from 'react'
import {connect} from "react-redux"
import {removeMsg} from "../actions/msgsActions"
import {removeError} from "../actions/errorsActions"
import {Alert} from "react-native"

class Messages extends Component {
  render(){
      const {errors,messages} = this.props;
    {errors.map((err,i) => 
          {
            Alert.alert(
              "Erreur",
              err,
               [
                 {
                  text:"ok",
                  onPress: () => this.props.removeError(i),
                  style: 'ok',
                 }
               ]
            )
           
          })
          }

      return null
  }
}
const mapStateToProps = state  => {
    return {
        errors:state.errors,
        messages:state.messages
    }
}

export default  connect(mapStateToProps,{removeMsg,removeError})(Messages)
