import React from 'react'
import {Text, StyleSheet} from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
    text: {fontSize: 72},
})

export const num = 50

class Count extends React.Component{
    // documentation for prop type
    static propTypes = {
        count: PropTypes.number.isRequired
    }
    render(){
        return(
            <Text style={styles.text}>{this.props.count}</Text>
        )
    }
}

export default Count // Set default export