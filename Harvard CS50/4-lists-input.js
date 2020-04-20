/* --------------- Fifth lecture, including notes --------------- */
// LISTS
//  ScrollView is the most basic one. ListView is deprecated
//  FlatList and SectionList are also used

// SCROLL VIEW
//  renders all of its childern before appearing

// FLATLIST
//  only renders what is needed at the time
//  rows may be unmounted
//  only updates if props are changed
import React from 'react';
import { Button, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

import contacts, {compareNames} from './contacts'
import Row from './row'

export default class App extends React.Component {
  state = {
    showContacts: false,
    contacts: contacts
  } // shorthand for creating constructor that all it does is define the state

  toggleContacts = () => {
    this.setState(prevState => ({showContacts: !prevState.showContacts}))
  }

  // extracts item from obj.item (Destructuring)
  // item: {name: String, phone: String, key: Number }, same as data
  renderItem = ({item}) =>  <Row {...(item)} />

  // Sorting is normally done in place, so it wouldn't change the array of props, so the FlatList wouldn't rerender. Hence, we must use [...array] put everything into a new array
  sort = () => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts].sort(compareNames)
    }))
  }

  render() {
    return (
      <View style={styles.container}>
       <Button title="Toggle Contacts" onPress={this.toggleContacts} />
        <Button title="Sort" onPress={this.sort} />
        {this.state.showContacts && (
          <FlatList 
            renderItem={this.renderItem}
            data={this.state.contacts}
          />
        )}
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


// SECTIONLIST
//  same as flatlist, but with additional support for sections/headers
//  each section has its own data array
//  each section can override the renderItem
import React from 'react'
import {SectionList, Text} from 'react-native'
import PropTypes from 'prop-types'
import Row from './row'

// extracts item from obj.item (Destructuring)
// item: {name: String, phone: String, key: Number }, same as data
const renderItem = ({item}) =>  <Row {...(item)} />

const renderSectionHeader = obj => <Text>{obj.section.title}</Text>

// Stateless component
const ContactsList = props => {
    const contactsbyLetter = props.contacts.reduce((obj, contact) => {
        const firstLetter = contact.name[0].toUpperCase()
        return {
            ...obj, 
            [firstLetter]:  [...(obj[firstLetter] || []), contact]// wrapping [it] evaluates it to become a key. We are overwritting firstLetter
        }
    }, {})

    // Array where the keys are letters
    const sections = Object.keys(contactsbyLetter).sort().map(letter => ({
        title: letter,
        data: contactsbyLetter[letter],
    }))

    return (
        <SectionList 
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        sections={sections}
        />
    )
}

ContactsList.PropTypes = {
    contacts: PropTypes.array,
}

export default ContactsList

// USER INPUT
//  controlled (react controls what is in a value) vs uncontrolled (the dom controls)
//  pass Value and OnChangeInput
