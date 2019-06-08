import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Platform} from "react-native"
import {Icon} from "expo"
import { connect } from 'react-redux';
import {logoutUser} from "../actions/userActions"
import Subscribe from "../components/Subscribe"
class SettingsScreen extends React.Component {

  static navigationOptions = {
    title: 'Settings',
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

  render() {
   return(
     <View>
          <Subscribe onPress={()=> this.props.navigation.navigate("Subscription")}/>
          <Option onPress={() => this.props.navigation.navigate("Profile")}>
            Mon Compte
          </Option>
          <Option  onPress={() => this.props.navigation.navigate("Langues")}>
            Langue de l'Application
          </Option>
          <Option onPress={() => this.props.navigation.navigate("CG")}>
            Conditions Generales
          </Option>
          <Option onPress={() => this.props.navigation.navigate("Notes")}>
            Notes
          </Option>
          
          <Option color="red" noIcon={true} onPress={() =>this.props.logoutUser()}>
            se Deconnecter
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
   {props.noIcon?null:
    <Icon.Ionicons
        name={Platform.OS === 'ios' ? 'ios-arrow-forward' : 'md-arrow-forward'}
        size={18}
        style={styles.optionImg}
        color="#444"
        
        />}
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
   
  }
}
export default connect(mapStateToProps,{logoutUser}) (SettingsScreen) 