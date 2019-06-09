import React, { Component } from 'react'
import {View,ScrollView, StyleSheet,TouchableOpacity, Text,Image,Modal,Alert,TouchableHighlight , TextInput} from "react-native"
import {Tabs,Tab,Item,Label,Input,Form,DatePicker} from "native-base"
import {connect} from "react-redux"
import {fetchallPlans} from "../actions/planActions"
import {subscribe} from "../actions/userActions"
import Stripe from 'react-native-stripe-api';

export class SubscriptionScreen extends Component {
    state={
        modalVisible:false,
        cc:"",
        mexp:"",
        yexp:"",
        cvc:"",
        plan_id:1,
        finish:false,
    }
    componentDidMount(){
        this.props.fetchallPlans()
    }
    openModel= () => {
        this.setState({modalVisible:true});
    }
    componentWillUnmount(){
        this.setState({modalVisible:false});
        this.setState({finish:false})
    }

    handleSubscribe = async () => {
        console.log(this.state.cc,this.state.cvc,this.state.mexp,this.state.yexp,this.state.plan_id)

        const apiKey="pk_test_QZoYkfIegj1tcC2BbvO8qXwf"
        const client = new Stripe(apiKey);
        let {cvc,cc,mexp,yexp} = this.state
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
        console.log(token)
        this.props.subscribe(this.state.plan_id,token.id)
        this.setState({finish:true})
        this.setState({modalVisible:false})
    } 
    handleCCChange = text => {
      const pattern = /^[0-9]*$/
      if(!pattern.test(text))
        return;
      
      if(text.length>16)
        return;
      this.setState({cc:text})  
    }
    handleCVCChange = text => {
      const pattern = /^[0-9]*$/
      if(!pattern.test(text))
        return;
      
      if(text.length>4)
        return;
      this.setState({cvc:text})  
    }
    handlemexpChange = text => {
      const pattern = /^[0-9]*$/
      if(!pattern.test(text))
        return;
      
      if(text.length>2)
        return;
      this.setState({mexp:text})  
    }
    handleyexpChange = text => {
      const pattern = /^[0-9]*$/
      if(!pattern.test(text))
        return;
      
      if(text.length>2)
        return;
      this.setState({yexp:text})  
    }
    render() {
        const {plans,success} = this.props
         if(this.state.finish &&  success !== undefined){
             this.setState({finish:false})
            success   ?  Alert.alert(
            'Success',
            'Votre Abbonement est reussi',
          ):
          Alert.alert(
            'error',
            'Votre Abbonement a echouer',
          );}
        return (
            <ScrollView>
                <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            this.setState({modalVisible:false})
          }}>
          <View style={{marginTop: 22}}>
            <View style={styles.paimentcontainer}>
              <Image style={{height:92,margin:15}} source={require("../assets/images/CC.png")}/>
              <Form style={{margin:"5%",width:"90%"}}>
            <Item floatingLabel>
              <Label>CC Numberx</Label>
              <Input keyboardType="numeric" value={this.state.cc} onChangeText={(text)=>this.handleCCChange(text)}/>
            </Item>
          <View style={{flexDirection:"row",width:300}}>
             <Item floatingLabel  style={{width:"45%"}}>
              <Label>month Exp</Label>
              <Input keyboardType="numeric" value={this.state.mexp} onChangeText={this.handlemexpChange} />
            </Item>
            <Item floatingLabel  style={{width:"45%"}} last>
              <Label>Year EXP</Label>
              <Input keyboardType="numeric" value={this.state.yexp} onChangeText={this.handleyexpChange} />
            </Item>
          </View>
           
            <Item floatingLabel>
              <Label>CVC</Label>
              <Input keyboardType="numeric" value={this.state.cvc} onChangeText={this.handleCVCChange}  />
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
                <Image style={styles.img} source={require("../assets/images/logo.png")}/>
                <Tabs
                     tabContainerStyle={styles.tabsContainer} 
                     tabBarUnderlineStyle={styles.tabBarUnderlineStyle} 
                     onChangeTab={(ob) => this.setState({plan_id:ob.i+1})}
                >
                    {plans&& plans.filter(x=> x.name !== "free" && x.name !== "Free").map((plan,i) => 
                    <Tab 
                    key={i}
                    heading={plan.name}
                    textStyle={styles.textStyle}
                    activeTabStyle={i=== 0 && [styles.activeTabStyle,styles.borderLeft] || i ===plans.length-2 &&[styles.activeTabStyle,styles.borderRight] || styles.activeTabStyle }
                    tabStyle={i=== 0 && [styles.tab,styles.borderLeft] || i ===plans.length-2 &&[styles.tab,styles.borderRight] || styles.tab }
                    activeTextStyle={styles.activeTextStyle}
                    >
                        <Plan plan={plan}  />
                       
                    </Tab>
                    
                    )}
                </Tabs>
                <TouchableOpacity style={styles.btn} onPress={() => this.openModel()}>
                               <Text style={styles.btnText}>S'Abonner</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}
const Plan = props => (
    <View style={styles.planContainer}>
        <View style={styles.textContainer}>
        {props.plan.description.map((x,i) => <Text key={i} style={styles.text}>{x}</Text>)}
        </View>
         
    </View>
);

const styles= StyleSheet.create({

    paimentcontainer:{
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        paddingTop:"auto",
        paddingBottom:"auto"
    },
    paiementActions:{
        flexDirection:"row",
        margin:20,
    },

    textContainer:{
        padding:20,
    },
    tabs:{
        borderRadius:25,
        borderColor:"#043578",
        borderWidth:1
    },
    tabsContainer:{
        backgroundColor:"#fff",
        borderRadius:25
       },
       tabBarUnderlineStyle:{
           width:0
       },
   tab:{
     borderColor:"#043578",
     borderWidth:0.5,
     backgroundColor:"#fff"
     
   },
   textStyle:{
     color:"#043578"
   },
   activeTabStyle:{
     borderColor:"#043578",
     borderWidth:1,
     backgroundColor:"#043578"
     
   },
   activeTextStyle:{
     color:"#fff"
   },
   borderRight:{
       borderTopRightRadius:25,
       borderBottomRightRadius:25,
     },
     borderLeft:{
       borderTopLeftRadius:25,
       borderBottomLeftRadius:25,
     },

    container:{
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
    img:{
        width:150,
        height:150,
        marginTop:20,
        marginRight:"auto",
        marginLeft:"auto"
    },
    text:{
        fontSize:18,
        margin:5,
        textAlign:"center"
    },
    btn:{
        backgroundColor:"#043578",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        width:"100%",
        height: 53.67,
    },
    btnText:{
        textAlign:"center",
        color:"white",
        fontSize:21,
        marginTop:"auto",
        marginBottom:"auto"
    },
    planContainer:{
        height:"auto",
        width:"100%"
    }
})
const mapStateToProps = state => {
    return {
        plans:state.plans,
        user:state.user,
        success:state.user.success
    }
}
export default connect(mapStateToProps,{fetchallPlans,subscribe})(SubscriptionScreen)