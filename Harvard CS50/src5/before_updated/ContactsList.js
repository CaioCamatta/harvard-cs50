import React from 'react'
import {SectionList, Text} from 'react-native'
import propTypes from 'prop-types'
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

ContactsList.propTypes = {
    contacts: propTypes.array,
}

export default ContactsList
