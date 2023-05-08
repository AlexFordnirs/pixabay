import React, {Component } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList,ActivityIndicator} from 'react-native';
import { SearchBar } from 'react-native-elements';
import filter from "lodash.filter";

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      searchValue: "",
    };
  }

  async getMovies() {
    try {
      const response = await fetch('https://pixabay.com/api/?key=36164790-3b06d71b56c63cad364a2fa13&q=yellow+flowers&image_type=photo');
      const json = await response.json();
      this.setState({data: json.exchangeRate});
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({isLoading: false});
    }
  }
  componentDidMount() {
    this.getMovies();
  
  }
  

//
searchFunction = (text) => {
  const updatedData = this.arrayholder.filter((item) => {
    const item_data = `${item.currency.toUpperCase()})`;
    const text_data = text.toUpperCase();
    return item_data.indexOf(text_data) > -1;
  });
  this.setState({ data: updatedData, searchValue: text });
};
//
  render() {
    const {data, isLoading} = this.state;
    return (
      <View style={{flex: 1, padding: 24}}>
            <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => this.searchFunction(text)}
          placeholder="Type Here..."
          autoCorrect={false}
          
        />
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            renderItem={renderItem}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 20,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
});



const renderItem = ({ item }) => ( <View style={styles.card}>
  <View style={styles.cardContent}>

   <Image onPress={() => getItem(item)}>
   {item.pageURL}
   </Image>
  </View>
</View>);

const getItem = (item) => {
  // Function for click on an item
  alert( item.pageURL);
};

