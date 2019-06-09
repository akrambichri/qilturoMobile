import React, { Component } from 'react'
import {View, TouchableOpacity, Text, StyleSheet, Platform,ScrollView,KeyboardAvoidingView} from "react-native"
import {connect} from "react-redux"
import Loading from "../components/Loading"
import {fetchProfile} from "../actions/userActions"
import {Icon} from "expo"
import Form from "../components/Form"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export class ProfileScreen extends Component {
    static navigationOptions = {
        title: 'Profile',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
          textAlign:"center",
          marginLeft:"auto",
          marginRight:"auto"
        }
      };
      componentDidMount(){
        if(!this.props.profile)
            this.props.fetchProfile()
        console.log("ProfileScreen mounting...")
      }
    
      componentWillUnmount(){
        console.log("ProfileScreen unmounting...")
      }
    render() {
        const {profile} = this.props;
        if(!profile)
            return <Loading/>
        else
        return (
          <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>
            <ScrollView>
                <Option value={profile.email} element="email" >
                    E-mail
                </Option>
                <Option value={profile.name} >
                    Nom
                </Option>
                <Option value={"***********"}  element="password">
                    Mot de pass
                </Option>
                <Option value={profile.kindle_email}  element="kindle">
                    kindle
                </Option>
                <Option value={profile.evernote_email}  element="evernote">
                    Evernote
                </Option>
                <Option noIcon={true} value={profile.roles[0].name} >
                   Abonnement
                </Option>
            </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}
class Option extends React.Component {
  state= {
    showForm:false,
  }
    render(){
      return (
    <View style={{formDirection:"column"}}>
        <TouchableOpacity onPress={() => this.setState({showForm:!this.state.showForm})} style={styles.option}>
          <Text style={{...styles.optionText,color:this.props.color}}>
            {this.props.children}
          </Text>
        
        <View style={{flexDirection:"row"}} >
            <Text style={{...styles.optionImg,marginRight:5}}>
                {this.props.value?this.props.value:"non definie!"}
            </Text>
            {this.props.noIcon?null:
          <Icon.Ionicons
              name={Platform.OS === 'ios' ? 'ios-arrow-forward' : 'md-arrow-forward'}
              size={18}
              style={styles.optionImg}
              color="#444" 
              />}
        </View>     
        </TouchableOpacity>
        {this.state.showForm && this.props.element&&
        <Form element={this.props.element} hide={() => this.setState({showForm:false})}/>
        }
      </View>
    )}
}


  const styles = StyleSheet.create({
    option:{
      width:"100%",
      height:60,
      flexDirection:"row",
      justifyContent: "space-between",
      paddingHorizontal:10,
      backgroundColor:"#fff"
    },
    optionText:{
        fontSize:16,
        marginTop:"auto",
        marginBottom:"auto",
    },
    optionImg:{
        marginTop:"auto",
        marginBottom:"auto",
    },
  })
const mapStateToProps = state => {
    return {
        profile:state.user.profile,
    }
}
export default connect(mapStateToProps,{fetchProfile})(ProfileScreen)
