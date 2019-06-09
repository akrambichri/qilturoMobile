import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Header, Content,Toast , Form, Item, Icon, Input,Text,Button } from 'native-base';
import {loginUser} from "../actions/userActions"
import {StyleSheet, Image,View, TouchableOpacity} from "react-native"
import { Facebook,Google } from 'expo';


export class LoginScreen extends Component {
    state ={
        email:"",
        emailError:false,
        password:"",
        passError:false,
    }
    static navigationOptions = {
      title: 'Login',
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
    handleSubmit =() =>{
      let {email,password} = this.state;

      this.setState({emailError:false,passError:false})

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
        if(password.length<6){
          Toast.show({
            text: "password tres court",
            buttonText: "ok",
            duration: 3000
          })
          this.setState({passError:true})
           return;  
        }
        this.props.loginUser(email,password)
        this.setState({password:""})
    }

    handleFbLogin = async () => {
      const FB_APP_ID = "2183698665279759";
      try {
        const {
          type,
          token,
        } = await Facebook.logInWithReadPermissionsAsync(FB_APP_ID, {
          permissions: ['profile'],
        });
        if (type === 'success') {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
        } else {
          // type === 'cancel'
        }
      } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
      }
    }
    handleGoogleLogin = async () => {
      const clientId = '497115443806-9ig03cj3jnvs6bfbc7ok1tltbd8qsiai.apps.googleusercontent.com';
      const { type, accessToken, user } = await Google.logInAsync({ clientId });

      if (type === 'success') {
        /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */
        console.log(user);
      }
      else{
        console.log("error");
      }
    }
    render() {
    
        return (
            <Container >
            <Content style={styles.content}>
              <Form onSub style={styles.form}>
                <Item error={this.state.emailError}  >
                  <Input placeholder="Email" autoCapitalize = 'none' value={this.state.email}  onChangeText={(text)=> this.setState({email:text})} />
                  <Icon style={styles.icons} name="person" ios="ios-person" android="md-person"/>
                </Item>
                <Item  error={this.state.passError}  >
                  <Input  placeholder="Password" secureTextEntry={true} autoCapitalize = 'none'  value={this.state.password} onChangeText={(text)=> this.setState({password:text})} />
                  <Icon style={styles.icons} name="lock"  ios="ios-lock" android="md-lock"/>
                </Item>
               
                <Button rounded style={styles.logginButton}  onPress={this.handleSubmit}>
                  <Text>
                   Login 
                   </Text>
                </Button>
                  <View style={styles.socialButtons}>
                  <TouchableOpacity onPress={this.handleFbLogin}>
                      <Image source={require( "../assets/images/fb.png")}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.handleGoogleLogin}>
                      <Image source={require( "../assets/images/google.png")}/>
                  </TouchableOpacity>
                  </View>
                <Text style={{marginTop:"10%",marginLeft:"auto",marginRight:"auto"}} onPress={()=> this.props.navigation.navigate("Register")}>
                   Register ?
                   </Text>
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


export default connect(mapStateToProps,{loginUser})(LoginScreen)
