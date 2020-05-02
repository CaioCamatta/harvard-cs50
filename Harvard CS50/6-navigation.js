/* --------------- Seventh lecture, including notes --------------- */
// NAVIGATION
//  moving between screens
//  implement mainly in JavaScript with React
//  navigator is a component that implements a navigation pattern, e.g. tabs
//  routes: children of a navigator; each route has a name and a screen component that is rendered while active

// SWITCH
//  displays one screen at a time
//  inactive screens are unmounted

//  Creating a navigator
import { createSwitchNavigator } from 'react-navigation';
const AppNavigator = createSwitchNavigator({
    "RouteNameOne": ScreenComponentOne,
    "RouteNameTwo": ScreenComponentTwo,
});

export default class App extends React.Component {
    render() {
        return <AppNavigator />
    }
}

//  Navigating to another route 
class ScreenComponentOne extends React.Component {
    render() {
        return (
            <Button
                title="Go to two"
                onPress={() => this.props.navigation.navigate('RouteNameTwo')}
            />
        );
    }
}

//Full example
import React from 'react';
import { Button, View } from 'react-native';
import { createSwitchNavigator } from 'react-navigation';

export default class App extends React.Component {
    render() {
        return <MyNavigator />;
    }
}

class ScreenComponentOne extends React.Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    borderWidth: 25,
                    borderColor: 'teal',
                }}>
                <Button
                    title="Go to two"
                    onPress={() => this.props.navigation.navigate('routeNameTwo')}
                />
            </View>
        );
    }
}

class ScreenComponentTwo extends React.Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    borderWidth: 25,
                    borderColor: 'orange',
                }}>
                <Button
                    title="Go to one"
                    onPress={() => this.props.navigation.navigate('routeNameOne')}
                />
            </View>
        );
    }
}

const MyNavigator = createSwitchNavigator({
    routeNameOne: ScreenComponentOne,
    routeNameTwo: ScreenComponentTwo,
});


// screenProps: made available to every screen component in the navigator. Good for small applications  

// STACK NAVIGATOR
//  one screen at a time, stacked on top of each other with a back button
//  the state of inactive screens is maintained and they remain mounted

//  creating screen and changing screens is similar to the switch, with the added fucntionality of poping the stack to go back
class ScreenComponentThree extends React.Component {
    render() {
        return (
            <Button
                title="Go back"
                onPress={() => this.props.navigation.goBack()}
            />
        );
    }
}

// Full example

import React from 'react';
import { Button, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class App extends React.Component {
    render() {
        return <MyNavigator />;
    }
}

function getRandomNumber() {
    return Math.floor(Math.random() * 10);
}

class ScreenComponentOne extends React.Component {
    static navigationOptions = {
        title: 'First screen',
    };

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    borderWidth: 25,
                    borderColor: 'teal',
                }}>
                <Button
                    title="Go to two"
                    onPress={() => this.props.navigation.navigate('routeNameTwo')}
                />
            </View>
        );
    }
}

class ScreenComponentTwo extends React.Component {
    static navigationOptions = {
        title: 'Second screen',
    };

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    borderWidth: 25,
                    borderColor: 'orange',
                }}>
                <Button
                    title="Go to three"
                    onPress={() =>
                        this.props.navigation.navigate('routeNameThree', {
                            randomNumber: getRandomNumber(),
                        })
                    }
                />
            </View>
        );
    }
}

class ScreenComponentThree extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `Number: ${navigation.getParam('randomNumber')}`,
        };
    };

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 25,
                    borderColor: 'purple',
                }}>
                <Text style={{ fontSize: 25 }}>
                    {this.props.navigation.getParam('randomNumber')}
                </Text>
                <Button
                    title="Get a new random number"
                    onPress={() => {
                        this.props.navigation.setParams({
                            randomNumber: getRandomNumber(),
                        });
                    }}
                />
                <Button
                    title="Go back"
                    onPress={() => this.props.navigation.goBack()}
                />
            </View>
        );
    }
}

const MyNavigator = createStackNavigator(
    {
        routeNameOne: ScreenComponentOne,
        routeNameTwo: ScreenComponentTwo,
        routeNameThree: ScreenComponentThree,
    },
    {
        // headerTransitionPreset: 'uikit',
        // mode: 'modal',
    }
);

// PASSING PARAMETERS
//  Three options

// navigate with params
this.props.navigation.navigate('RouteName', {
    paramName: 'value-of-param'
});

// setParams to update params for the route
this.props.navigation.setParams({
    paramName: 'new-value-of-param',
});

// getParam to read a param
this.props.navigation.getParam('paramName', 'default-value');

/*navigationOptions = {
    headerTitle
    headerStyle
    headerTintColor
    headerLeft
    headerRight
}*/

// If a screen is already in the stack, you can push it with 
// “Push” a new screen, even if it already is in the stack
push('MyRouteName');


// COMPOSING NAVIGATORS
//  The app should only contain one top-level navigator
//  You can navigate() to any route in the app
const MyStackNavigator = createStackNavigator({
    "Home": HomeScreen,
    "AddContact": AddContactScreen,
});
const AppNavigator = createSwitchNavigator({
    "Login": LoginScreen,
    "Main": MyStackNavigator,
});

// Do not render a navigator inside a screen
class MyScreen extends React.Component {
    render() {
        return <MyStackNavigator />;
    }
}
// Instead, set as a screen within the AppNavigator
const AppNavigator = createSwitchNavigator({
    "Main": MyStackNavigator,
});


// TAB NAVIGATORS
//  one screen at a time, but other screens are maintained
//  Platform-specific layout, animations, and gestures
//  use navigate() and goBack()

// Creating a tab navigator
const AppNavigator = createBottomTabNavigator({
    "TabOne": ScreenComponentOne,
    "TabTwo": ScreenComponentTwo,
});
export default class App extends React.Component {
    render() {
        return <AppNavigator />
    }
}

// Configure settings
MainStack.navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) => (
        <Ionicons
            name={`ios-contacts${focused ? "" : "-outline"}`}
            size={25}
            color={tintColor}
        />
    )
};

// Common Icons
// Install it in your shell
/*npm install --save react-native-vector-icons*/
// Import a supported icon set in your code
import Ionicons from "react-native-vector-icons/Ionicons";
// Use it as a React component
<Ionicons name="md-checkmark" size={25} color="#000" />


