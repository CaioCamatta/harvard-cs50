import React from 'react';
import { Button, SectionList, ScrollView, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

import contacts, {compareNames} from './contacts'
import {createSwitchNavigator} from 'react-navigation';
import AddContactScreen from './screens/AddContactScreen';
import ContactListScreen from './screens/ContactListScreen';

const AppNavigator = createSwitchNavigator({
  AddContact: AddContactScreen,
  ContactList: ContactListScreen
},{
  initialRouteName: 'ContactList',
})

export default class App extends React.Component {
  state = {
    showContacts: false,
    contacts: contacts,
    showForm: false
  } // shorthand for creating constructor that all it does is define the state


  addContact = newContact => {
    console.log('adding contact')
    this.setState(prevState => ({showForm: false, contacts: [...prevState.contacts, newContact]}))
  }

  render() {
    return <AppNavigator/>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },
});
