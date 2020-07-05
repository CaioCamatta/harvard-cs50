/* --------------- ANIMATION --------------- */
// Animations require both the JS and UI threads Sending messages over the bridge 10s of times per second is expensive. Blocking either thread impacts the UX
// We could implement the animation in native. Requires knowing Obj-C/Swift and Java
// We can declare the animation in JS and have it execute on native thread

// ANIMATED LIBRARY
// Allows us to declare a computation in JS and compute it on the native thread
//  - JS thread no longer needs to compute anything
//  - JS thread can be blocked and the animation will still run!!

//  OBS: Cannot use native driver for layout props. Howeverm you an transform the layout. E.g. for a progress bar you want to scale the x.