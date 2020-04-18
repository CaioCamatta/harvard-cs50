import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomCount from './Count.js'

export default function App() {
  return (
    <View style={styles.container}>
      <CustomCount count={0} />
    </View> 
  );
  // If you pass a string now, it will give you a warning, since we previously set up the prop type to be a number
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
