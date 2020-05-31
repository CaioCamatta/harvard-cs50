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
let {x,y,z} = v;// pulls x,y,z out of v

// SENSOR COMBINATIONS (DEVICE MOTION)
// You can use a combination of sensors to figure out the motion of the phone
// Create a listener and instantiate it when component is mounted
// Use setUpdateInterval to make it faster

// MEDIA (audio, video, fonts)
// check src 8

// VIDEO
<Expo.Video source={require="./assets/1.mp4"} style={{width:400, height:400}} resizeMode="cover" />;
shouldPlay={true};

// it's also important to set the audio mode, so the audio plays even if the phone is on silent
_setAudioModeAsync = async () =>{
    await Expo.Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        //...etc
    });
}
componentWillMount(){
    this._setAudioModeAsync();
}

// Showing first frame after video is done: break video into it's own component
onPlaybackStatusUpdate={(status) => {
    if(status.didJustFinish){
        ...where
    }
}};

// FONTS
state ={
    fontIsReady = false
}

_loadFontsAsync = async () => {
    // Can load from internet
    Expo.Font.loadAsync({
        fontName: require("./assets/fontName.ttf")
    })
}

_setupFontAsync = async () => {
    // Run all these functions before
    await Promise.all([this._setAudioModeAsync(), this._loadFontsAsync])
    this.setState({isReady: true});
}

componentDidMount(){
    this._setupFontAsync();
}

render(){
    // show this while font is loading
    if(!this.state.fontIsReady){
        return (<Expo.AppLoading />);
    }
}

// PHOTOS
// simple camera
_launchCameraRollAsync = async () => {
    let {status} = await Expo.Permissions.askAsync(Expo.Permissions.CAMERA_ROLL)
    if(status !== 'granted'){
        console.error("No permissions");
        return;
    }
    let img = Expo.ImagePicker.launchImageLibraryAsync()

    let flippedImage = Expo.ImageManupilator.manipulate(img.uri, [
        {flip:...}// etc
    ])
    console.log(img)
}

// customizable camera
{(this.state.cameraReady && (
    <Expo.Camera style ={{
        width:400,
        height:400,  
    }} type={Expo.Camera.Constants.back} />
) || null)}