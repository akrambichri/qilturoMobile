import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {View,ScrollView, StyleSheet,TouchableOpacity, Text,Image,Modal,Alert,TouchableHighlight , TextInput} from "react-native"
import { connect } from 'react-redux'
import {subscribe} from "../actions/userActions"
import Stripe from 'react-native-stripe-api';

export class PaimentForm extends Component {
    static propTypes = {
        prop: PropTypes
    }
    state={
        modalVisible:false,
        cc:"",
        mexp:"",
        yexp:"",
        cvc:"",
        plan_id:0,
        finish:false,
    }
    handleSubscribe = async () => {
        console.log(this.state.cc,this.state.cvc,this.state.mexp,this.state.yexp,this.state.plan_id)

        const apiKey="pk_test_QZoYkfIegj1tcC2BbvO8qXwf"
        const client = new Stripe(apiKey);
        const token = await client.createToken({
            number: this.state.cc ,
            exp_month: this.state.mexp , 
            exp_year: this.state.yexp, 
            cvc: this.state.cvc,
         });
         if(token.error) 
         { 
             Alert.alert(
            'Erreur',
            token.error.message,
          )
          return;
        }
        this.props.subscribe(this.props.plan_id,token.id)
        this.setState({finish:true})
        this.setState({modalVisible:false})
    } 
    
    render() {
        return (
            <Modal
            animationType="slide"
            transparent={false}
            visible={this.props.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={{marginTop: 22}}>
              <View style={styles.paimentcontainer}>
                <Image style={{height:92,margin:15}} source={require("../assets/images/CC.png")}/>
                <Form style={{margin:"5%",width:"90%"}}>
              <Item floatingLabel>
                <Label>CC Number</Label>
                <Input keyboardType="numeric" onChangeText={(text) => this.setState({cc:text})}/>
              </Item>
            <View style={{flexDirection:"row",width:300}}>
               <Item floatingLabel  style={{width:"45%"}}>
                <Label>month Exp</Label>
                <Input keyboardType="numeric" onChangeText={(text) => this.setState({mexp:text})} />
              </Item>
              <Item floatingLabel  style={{width:"45%"}} last>
                <Label>Year EXP</Label>
                <Input keyboardType="numeric"  onChangeText={(text) => this.setState({yexp:text})} />
              </Item>
            </View>
             
              <Item floatingLabel>
                <Label>CVC</Label>
                <Input keyboardType="numeric" onChangeText={(text) => this.setState({cvc:text})}  />
              </Item>
              </Form>
            <View style={styles.paiementActions}>
                <TouchableHighlight
                style={{marginRight:25}}
                  onPress={() => {
                      this.setState({modalVisible:false});
                  }}>
                  <Text style={{fontSize:16,color:"#043578"}}>Annuler</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => {
                     this.handleSubscribe()
                  }}>
                  <Text style={{fontSize:21,color:"#043578"}}>Valider</Text>
                </TouchableHighlight>
              </View>
              </View>
            </View>
          </Modal>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    subscribe,
}

export default connect(mapStateToProps, mapDispatchToProps)(PaimentForm)
