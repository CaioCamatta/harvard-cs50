import React from 'react'
import { FlatList, View, Image, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import PropTypes from 'prop-types'
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',

        marginTop: 15,
        marginLeft: 20,
        marginRight: 20,
        padding: 8,
        paddingRight: 50,
        marginVertical: 5,

        borderRadius: 7,

        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 4,
        elevation: 7,
    },
    title: {
        fontSize: 16,
        paddingLeft: 10,
        alignSelf: 'flex-start',
    },
    imageIcon: {
        width: 50,
        borderRadius: 7,
        
    },
    header: {
        flex: 1,
        flexDirection: 'row'
    },
    detailsText: {
        paddingLeft: 10,
        fontSize: 15,
        color: '#666666',
        paddingTop: 7,
    }
})


function Item({ obj }) {
    const navigation = useNavigation();
    return (
        <View style={styles.item}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Movie Details', { id: obj.imdbID })}>
                <View style={styles.header}>
                    <Image style={styles.imageIcon} source={{ uri: obj.Poster }} 
        resizeMode="contain"/>
                    <View>
                        <Text style={styles.title}>{obj.Title}</Text>
                        <Text style={styles.detailsText}>{obj.Year} {obj.Type}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const SearchItemList = props => {
    return (
        <FlatList
            data={props.data}
            renderItem={({ item }) => <Item obj={item} />}
            keyExtractor={item => item.imdbID}
        />
    )
}

export default SearchItemList


