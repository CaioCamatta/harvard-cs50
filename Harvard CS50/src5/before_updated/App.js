import React from 'react';
import { Button, SectionList, ScrollView, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

import contacts, {compareNames} from './contacts'
import ContactsList from './ContactsList'
import AddContactForm from './AddContactForm'

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

  toggleContacts = () => {
    this.setState(prevState => ({showContacts: !prevState.showContacts}))
  }

  toggleForm = () => {
    this.setState(prevState => ({showForm: !prevState.showForm}))
  }

  // Sorting is normally done in place, so it wouldn't change the array of props, so the FlatList wouldn't rerender. Hence, we must use [...array] put everything into a new array
  sort = () => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts].sort(compareNames)
    }))
  }

  render() {
    if (this.state.showForm) return <AddContactForm onSubmit={this.addContact}/>
    return (
      <View style={styles.container}>
       <Button title="Toggle Contacts" onPress={this.toggleContacts} />
        <Button title="Add Contact" onPress={this.toggleForm} />
        {this.state.showContacts && <ContactsList contacts={this.state.contacts}/> }
      </View>
    ); // WE must pass keys to elements to improve rendering speed and reduce complexity. FlatList automatically extracts the keys from each obj.item
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },
});
