/* --------------- Expo --------------- */
// MAPS
import React from 'react';
import Expo from 'expo';

// Show map
<Expo.MapView style={{flex:1}} />

// Ask for permissions & get location
_getLocationAsync = async () => {
    let {status} = await Expo.getPermisisons.askAsync(Expo.Permissions.LOCATION);
    if(status !== 'granted'){
        console.error("Location permission not granted");
        return;
    }

    let location = await Expo.Location.getCurrentPositionAsync({});
    this.setState({location});
}

// Map will open before location is fetched. So setState after location is acquired. Use componentDidMount()

// Markers can be used. Title is also available for markers.
<Expo.MapView.Marker coordinate title description pinColor/>

// You can get coordinates from search using 
let place = await (Expo.Location.geocodeAsync("148 paul st"))[0]

// Coordinates into 
let where = await Expo.Location.reverseGeocodeAsync(location.coords);

// CONTACTS
// First get permissions async
_getRandomContactAsync = async () =>{
    //... permissions
    let contacts = await Expo.Contacts.getContactsAsync({
        pageSize:1,
        offset: 50,
        fields: ['PHONE_NUMBERS'],
    }) // Get 50th contact's number
}

// COMPASS
// Use <ImageBackground/> and <Image> for the needle.
let {x,y,z} = v // pulls x,y,z out of v

// SENSOR COMBINATIONS (DEVICE MOTION)
// You can use a combination of sensors to figure out the motion of the phone
// Create a listener and instantiate it when component is mounted
// Use setUpdateInterval to make it faster