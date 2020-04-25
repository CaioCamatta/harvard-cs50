import React from 'react'
import {Button, StyleSheet, TextInput, View, KeyboardAvoidingView} from 'react-native'
import {Constants} from 'expo'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    justifyContent: "center"
  },
  submit: {
    marginTop: 5
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    minWidth: 100,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
  }
})

export default class AddContactForm extends React.Component {
  state = {
    name: '',
    phone: '',
    isFormValid: false
  }

  componentDidUpdate(prevProps, prevState){
    // only validate if phone or name have updated
    console.log('validate')
    if(this.state.name !== prevState.name || this.state.phone !== prevState.phone){
      this.validateForm()
    }
  }

  // Abstract handler (returns a function)
  getHandler = key => {
    return val => {
      // [key] evaluate expression and cast it to STRING
      this.setState({[key]: val})
    }
  }

  // Much easier than the two below
  handleNameChange = this.getHandler('name') //val => {this.setState({name: val})}
  handlePhoneChange = this.getHandler('phone')

  // handleNameChange = name => {
  //   // this.validateForm on call callback
  //   this.setState({name}, this.validateForm)
  // }

  // handlePhoneChange = phone => {
  //   // + tries to cast it to a number
  //   // only positive numbers
  //   // only up to 10 numbers
  //   if (+phone >= 0 && phone.length <= 10){
  //     this.setState({phone}, this.validateForm)
  //   }
  // }

  validateForm = () => {
    const names = this.state.name.split(" ") // separate first and last name
    if (+this.state.phone >= 0 && this.state.phone.length == 10 && names.length >= 2 &&name[1] && names[0]){
      return this.setState({isFormValid: true})
    } else {
      return this.setState({isFormValid: false})
    }
  }

  handleSubmit = () => {
      this.props.onSubmit(this.state) // Take all keyvalue pairs of state as pass them
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TextInput
        style={styles.input}
        value={this.state.name}
        onChangeText={this.getHandler('name')}
        placeholder="Name"
      />
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        value={this.state.phone}
        onChangeText={this.getHandler('phone')}
        placeholder="Phone"
      />
        <Button title="Submit"
          style={styles.submit} 
          onPress={this.handleSubmit}
          disabled={!this.state.isFormValid}/>
      </KeyboardAvoidingView>
    )
  }
}
