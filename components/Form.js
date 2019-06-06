import React, { Component } from 'react'
import {View, Button,  StyleSheet, TextInput} from "react-native"
import {changeEmail,changePass} from "../actions/userActions"
import {connect} from "react-redux"

export class Form extends Component{

    state ={
      oldPass : "",
      element:"",
      element_confirmation:"",
    }
    handleSubmit= () => {
        const {element} = this.props;
        const oldPass = this.state.oldPass;
        const elementV = this.state.element
        const elementVconf = this.state.element_confirmation
        console.log(oldPass,elementV,elementVconf)
        if(oldPass<6)
            return
        if(elementV !== elementVconf )
            return
        if(element === "password")
            this.props.changePass(oldPass,elementV)
        else if(element ==="email")
            this.props.changeEmail(oldPass,elementV)
        this.props.hide()

    }
  render() {
    const {element} = this.props
    return (
    <View style={styles.form}>
      <TextInput style={styles.formElement} 
        secureTextEntry={true}  
        placeholder=" Mot de pass" 
        onChangeText={(text) => this.setState({oldPass:text})} 
        value={this.state.oldPass} 
        autoFocus
        autoCapitalize="none"
      />
      <TextInput style={styles.formElement} 
          secureTextEntry={element === "password"} 
          placeholder={` Nouveau ${element}`} 
          onChangeText={(text) => this.setState({element:text})}
          value={this.state.element}
          autoCapitalize="none"
          />
      <TextInput style={styles.formElement} 
        secureTextEntry={element === "password"} 
        placeholder={` Confirmation ${element}`} 
        onChangeText={(text) => this.setState({element_confirmation:text})}
        value={this.state.element_confirmation}
        autoCapitalize="none"
        />
        <Button 
          onPress={() => this.handleSubmit()}
          color="rgba(8, 84, 179, 1)"
          title="OK PRESS"
        />
    </View>
  )}
  }

const styles=StyleSheet.create({
    form:{
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        paddingHorizontal:10,
        paddingVertical:5,
      },
      formElement:{
          borderWidth:0.5,
          borderColor:"#eee",
          marginVertical:5,
          width:"100%"
      }
})


export default connect(null,{changeEmail,changePass})(Form)
