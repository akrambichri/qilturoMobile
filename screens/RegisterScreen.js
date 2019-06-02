import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Header, Content,Toast , Form, Item, Icon, Input, Label, Title, Left, Body, Right,Text,Button } from 'native-base';
import {registerUser} from "../actions/userActions"

import {StyleSheet} from "react-native"


export class RegisterScreen extends Component {
    state ={
        email:"",
        emailError:false,
        name:"",
        password:"",
        passError:false,
        password_confirmation:"",
        passConfErr:false,
    }
    handleSubmit =() =>{
      let {email,password,password_confirmation,name} = this.state;

      this.setState({emailError:false,passError:false,passConfErr:false})

        let emTest=/\S+@\S+\.\S+/;

        if(!emTest.test(email)){
          Toast.show({
            text: "Email non Valid",
            buttonText: "ok",
            duration: 3000
          })
          this.setState({emailError:true})
          return;  
        }
        if(password !== password_confirmation){
          Toast.show({
            text: "mdps differents",
            buttonText: "ok",
            duration: 3000
          })
          this.setState({passConfErr:true})
          return
        }
         if(password.length<6){
          Toast.show({
            text: "password tres court",
            buttonText: "ok",
            duration: 3000
          })
          this.setState({passError:true})
           return;  
        }
        this.props.registerUser(email,password,name)
        this.setState({password:"",password_confirmation:""})
    }
    static navigationOptions = {
      title: 'Register',
      headerStyle: {
        backgroundColor: '#fff',
        border:"none"
      },
      headerTintColor: '#0854B3',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize:34,
      }
    };

    render() {
        return (
            <Container>
            <Content style={styles.content}>
              <Form onSub style={styles.form}>
                <Item error={this.state.emailError}  >
                  <Input placeholder="Email" autoCapitalize = 'none' value={this.state.email}  onChangeText={(text)=> this.setState({email:text})} />
                  <Icon style={styles.icons} name="person" ios="ios-person" android="md-person"/>
                </Item>
                <Item   >
                  <Input placeholder="Nom Complet" value={this.state.name}  onChangeText={(text)=> this.setState({name:text})} />
                  <Icon style={styles.icons} name="person" ios="ios-person" android="md-person"/>
                </Item>
               
                <Item  error={this.state.passError && this.state.passConfErr}  >
                  <Input  placeholder="password" secureTextEntry={true} value={this.state.password} onChangeText={(text)=> this.setState({password:text})} />
                  <Icon style={styles.icons} name="lock"  ios="ios-lock" android="md-lock"/>
                </Item>
                <Item  error={this.state.passErro && this.state.passConfErrr}  >
                  <Input  placeholder="confirmation"  secureTextEntry={true} value={this.state.password_confirmation} onChangeText={(text)=> this.setState({password_confirmation:text})} />
                  <Icon style={styles.icons} name="lock"  ios="ios-lock" android="md-lock"/>
                </Item>
                <Button rounded style={styles.logginButton}  onPress={this.handleSubmit}>
                  <Text>
                   Register 
                   </Text>
                </Button>
              </Form>
            </Content>
          </Container>
        )
    }
}

const styles = StyleSheet.create({
  logginButton:{
    backgroundColor:"#0854B3",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5,
    marginLeft:"auto",
    marginRight:"auto",
    width:240.35,
    height: 53.67,
    padding:"auto",
    textAlign: 'center',
    justifyContent: 'center',
    margin:20,
  },
  form:{
    marginTop:50,
    marginLeft:10,
    marginRight:10
  },
  icons:{
    color:"#0854B3"
  },
  content:{
    margin:"auto"
  },
  socialButtons:{
    justifyContent:"center",
    flexDirection:"row"
  }

});
const mapStateToProps = state => {
    return {
        user:state.user
    }
}


export default connect(mapStateToProps,{registerUser})(RegisterScreen)
