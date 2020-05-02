import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Constants from 'expo-constants';
import SearchItemList from './SearchItems'
import MovieDetailsScreen from './MovieDetailsScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

class HomeScreen extends React.Component {
  state = {
    movie: '',
    typingTimeout: 0,
    typing: false,
    data: null,
  }

  // Search
  search = (query) => {
    fetch(`http://www.omdbapi.com/?apikey=c77f45ba&s=${query}`)
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson['Search'],
        })
      })
      .catch(error => console.log(error)) // To catch the errors if any
  }

  // Handle change
  handleMovieChange = (movie) => {
    // If use starts typing, clear timeout again
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }

    // Set the input and create a timeout, that executes function after 1.5s
    this.setState({
      movie: movie,
      typing: false,
      typingTimeout: setTimeout(() => this.search(movie), 1500)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Madagascar"
          onChangeText={this.handleMovieChange}
        />

        {this.state.data && <SearchItemList data={this.state.data} navigate={() => this.props.navigation.navigate('Details')}/>}
      </View>
    );
  }
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="Movie Details"
          component={MovieDetailsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 6,
    textAlign: 'left',
    alignSelf: 'stretch',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    marginTop: Constants.statusBarHeight + 30,
  }
});
