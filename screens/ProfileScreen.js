import React, { Component } from 'react'
import {View, TouchableOpacity, Button, Text, StyleSheet, Platform} from "react-native"
import {connect} from "react-redux"
import Loading from "../components/Loading"
import {fetchProfile} from "../actions/userActions"
import {Icon} from "expo"
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
            <View>
                <Option value={profile.email} >
                    E-mail
                </Option>
                <Option value={profile.name} >
                    Nom
                </Option>
                <Option value={"***********"} >
                    Mot de pass
                </Option>
                <Option noIcon={true} value={profile.roles[0].name} >
                   Abonnement
                </Option>
            </View>
        )
    }
}
const Option = (props) => (
    <TouchableOpacity onPress={() => props.onPress?props.onPress():null} style={styles.option}>
      <Text style={{...styles.optionText,color:props.color}}>
        {props.children}
      </Text>
     
     <View style={{flexDirection:"row"}} >
         <Text style={{...styles.optionImg,marginRight:5}}>
             {props.value}
         </Text>
         {props.noIcon?null:
      <Icon.Ionicons
          name={Platform.OS === 'ios' ? 'ios-arrow-forward' : 'md-arrow-forward'}
          size={18}
          style={styles.optionImg}
          color="#444" 
          />}
     </View>
          
    </TouchableOpacity>
  )

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
