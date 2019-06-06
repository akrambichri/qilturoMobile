import React, { Component } from 'react'
import {View, TouchableOpacity, Text, StyleSheet, Platform,ScrollView} from "react-native"
import {connect} from "react-redux"
import Loading from "../components/Loading"
import {fetchProfile} from "../actions/userActions"
import {Icon} from "expo"
import Form from "../components/Form"
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
      }
    render() {
        const {profile} = this.props;
        if(!profile)
            return <Loading/>
        else
        return (
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
                <Option noIcon={true} value={profile.roles[0].name} >
                   Abonnement
                </Option>
            </ScrollView>
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
                {this.props.value}
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
