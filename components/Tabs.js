import React, { Component } from 'react'
import {StyleSheet} from "react-native"
import {Tab, Tabs } from 'native-base';


export class MyTabs extends Component {
     
    render() {
        return (
            <Tabs 
                tabContainerStyle={styles.tabsContainer} 
                tabBarUnderlineStyle={styles.tabBarUnderlineStyle} 
            >
                {this.props.children}
           </Tabs>
        )
    }
}


export const MyTab = (props) => {
    return (
        <Tab 
            textStyle={styles.textStyle}
            activeTabStyle={{...styles.activeTabStyle,...styles.borderLeft}}
            tabStyle={{...styles.tab,...styles.borderLeft}}
            activeTextStyle={styles.activeTextStyle}
           {...props}
        >
            {props.children}
        </Tab>
    )

}

const styles =StyleSheet.create({
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
  borderWidth:1,
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
  }
})

export default MyTabs
