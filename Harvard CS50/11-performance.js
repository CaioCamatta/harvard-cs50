/* --------------- PERFORMANCE --------------- */
// How quickly and efficiently something works
// This lecture focuses on the Javascript side 

// TRADE-OFFS
// Performance comes at a complexity/time cost
// Don't over-optimize until you find bottlenecks

// Measuring Performance
// - be in the right environment
// - React Native Perf Monitor for checking memory and fps. Anything below 60fps is trouble. This will help you find which screens are underperforming
// - Chrome Performance Profile: run remote debugger in Chrome  


// COMMON INEFFICIENCIES

// Rerendering too often: 
// - Components will automatically rerender when they receive new props. Sometimes, a prop that is not needed for the UI will cause an unnecessary render
//  - If using redux, only subscribe to the part of the state that is necessary
//  - For lists, a key is essential so react can calculate the delta and only render what has been changed
//  - shouldComponentUpdate() can prevent an update. You can manually write the function to decide.
//  - a React.PureComponent does a shallow comparison (reference) when props are updated. So if it receives a prop that has the same value as before it won't update

// Unnecessarily Changing Props
// - Unnecessarily changing a value that is passed to a child could cause a rerender of the entire subtree
// - If you have any object (or array, function, etc.) literals in your render() method, a new object will be created at each render
// - Use a stylesheet instead of setting the style in the render (prevents recreation)
// - Declare functions outside render() so they are not reacreated each time

// Unnecessary Logic in Mount/Update
// - Adding properties to class instance instead of methods on the class. I.e. inc() instead of inc = () =>. Sometimes you need to bind fucntions to the instance, but not always/ 
// Class properties are created once for each object2




// OTHER NOTES
const {type} = action  // same as
const type = action.type

const [firstContact, ...rest] = state 
// if state [{name: 'caio', phone: '123'}]
// then firstContact === the first object in the array 
// and rest === the rest of the elements ([] in this case)