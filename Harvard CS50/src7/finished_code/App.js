import React from 'react'
import { StatusBar, View } from 'react-native'
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

import AddContactScreen from './screens/AddContactScreen'
import SettingsScreen from './screens/SettingsScreen'
import ContactListScreen from './screens/ContactListScreen'
import ContactDetailsScreen from './screens/ContactDetailsScreen'
import LoginScreen from './screens/LoginScreen'
import contacts from './contacts'
import {fetchUsers} from './api'

const MainStack = createStackNavigator(
  {
    ContactList: ContactListScreen,
    ContactDetails: ContactDetailsScreen,
    AddContact: AddContactScreen,
  },
  {
    initialRouteName: 'ContactList',
    navigationOptions: {
      headerTintColor: '#a41034',
      headerStyle: {
        backgroundColor: '#fff',
      },
    },
  }
)

MainStack.navigationOptions = {
  tabBarIcon: ({ focused, tintColor }) => (
    <Ionicons name={`ios-contacts${focused ? '' : '-outline'}`} size={25} color={tintColor} />
  ),
}

const MainTabs = createBottomTabNavigator(
  {
    Contacts: MainStack,
    Settings: SettingsScreen,
  },
  {
    tabBarOptions: {
      activeTintColor: '#a41034',
    },
  }
)

const AppNavigator = createSwitchNavigator({
  Login: LoginScreen,
  Main: MainTabs,
})

export default class App extends React.Component {
  state = {
    contacts: null, // we will fetch this from the API
  }

  componentDidMount() {
    // (async () => { //must be an arrow function so that this.setState makes sense
    //   const response = await fetch('https://randomuser.me/api/?results=50&nat=us')
    //   const results = await response.json()
    //   console.log(results)
    //   this.setState({ contacts: results })
    // })()

    // .then(({results}) => this.setState({contacts: results})) // {result} means we are only using reponse.results}
    
    // From the api
    fetchUsers().then(results => this.setState({results}))
    // or (asuncy () => { ... await ...})
  }

  addContact = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }))
  }

  render() {
    return (
      <AppNavigator
        screenProps={{
          contacts: this.state.contacts,
          addContact: this.addContact,
        }}
      />
    )
  }
}
