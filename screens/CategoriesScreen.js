import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from 'react-native';
import {connect} from "react-redux"
import {logoutUser} from "../actions/userActions"
import Category from "../components/Category"
import {fetchCategories} from "../actions/categoryActions"

 class categoriesScreen extends React.Component {

  componentDidMount(){
    this.props.fetchCategories()
  }

  static navigationOptions = {
    title: 'Categories',
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
    const {categories} = this.props;
    return (
      <View >
        
       {categories?
        <FlatList 
         data={categories} 
         renderItem={({item}) =>
                    <Category item={item} key={item.id} navigate={() => this.props.navigation.navigate("Articles",{category:item})}/>
                  }
         numColumns={2}
         keyExtractor={(item, index) => index.toString()}
        />
        :null
       }

      </View>
    );
  }


}
const mapStateToProps = state => {
  return {
    user:state.user,
    categories:state.categories.categories
  }
}
export default connect(mapStateToProps,{logoutUser,fetchCategories})(categoriesScreen)
