/* --------------- Sixth lecture, including notes --------------- */
// USER INPUT
//  always use controlled components
//  not <form> tag, but we can create a function to submit

// VALIDATING 
//  Conditionally set state based on input value (every key pressed)
//  Validate form before submitting as well
//  Validate the whole form after (callback) setState is called because a key is pressed
//  Or call on component did update
// KeyboardAvoidingView helps prevent keyboard in from of view
   
    // One option
    componentDidUpdate(prevProps, prevState){
      // only validate if phone or name have updated
      if(this.state.name !== prevState.name || this.state.phone !== prevState.phone){
        this.validateForm()
      }
    }
  
    // OR this option can be called whenever needed
    validateForm = () => {
      if (+this.state.phone >= 0 && this.state.phone.length == 10 && this.state.name.length >= 3){
        return this.setState({isFormValid: true})
      } else {
        return this.setState({isFormValid: false})
      }
    }
  
    handleSubmit = () => {
        this.props.onSubmit(this.state) // Take all keyvalue pairs of state as pass them
    }
  

// GENERIC HANDLER 
// (can be user inside of a view! even easier, but not a efficient)
    // Abstract handler (returns a function)
    getHandler = key => {
        val => {
        // [key] evaluate expression and cast it to STRING
        this.setState({[key]: val})
        }
    }

    // Much easier than the two below
    handleNameChange = this.getHandler('name') //val => {this.setState({name: val})}
    handlePhoneChange = this.getHandler('phone')

    // OR 
    
    <TextInput
        keyboardType="numeric"
        style={styles.input}
        value={this.state.phone}
        onChangeText={this.getHandler('phone')}
        placeholder="Phone"
    />

  
// DEBUGGING
//  console.error() throws full-page alert
//  console.warn() throws smaller ones that do not appear in smaller codes

// CHROME DEVTOOLS
//  chrome debugger is awesome
//  We can run the JavaScript in a chrome tab, since the native and Javascript are run asunchronously through a bridge. In fact we can run the JS anywhere
//  On the expo app, run debugger

// LAYOUT INSPECTOR / DEBUGGER
//  Similar to chrome's 
//  however, it doesn't allow you to edit

// React-devtools
//  allows you to inspect and change elements

// PACKAGE MANAGER
//  npm install installs it and adds it to package.json
//  always add all necessary packages to package.json