import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

class DetailsScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            data: null,
        }
    }

    // After mounting, get the data
    componentDidMount() {
        // Get data
        fetch(`http://www.omdbapi.com/?apikey=c77f45ba&i=${this.props.route.params.id}`)
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    data: responseJson,
                })
            })
            .catch(error => console.log(error)) // To catch the errors if any
    }

    render() {
        if (this.state.data) {
            return (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Image style={styles.image} source={{ uri: this.state.data['Poster'] }}
                            resizeMode="contain" />
                        <View>
                            <Text style={styles.title}>{this.state.data['Title']}</Text>
                            <Text style={styles.detailsText}>{this.state.data['Year']} {this.state.data['Type']}</Text>
                            <Text style={styles.detailsText}>{this.state.data['Genre']}</Text>
                            <Text style={styles.detailsText}>Director: {this.state.data['Director']}</Text>
                            <Text style={styles.detailsText}>IMDB: {this.state.data['imdbRating']}</Text>
                            <Text style={styles.detailsText}>{this.state.data['Plot']}</Text>
                        </View>
                    </View>
                </View>
            );
        }
        else {
            return null
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    image: {
        height: 250,
        marginTop: 10,
    }, 
    detailsText: {
        paddingLeft: 10,
        fontSize: 15,
        color: '#666666',
        paddingTop: 7,
    },
    title: {
        fontSize: 20,
        paddingTop:20,
        fontWeight: "700",
        paddingLeft: 10,
        alignSelf: 'flex-start',
    },
});

export default DetailsScreen;
