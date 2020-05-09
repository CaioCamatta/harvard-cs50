/* --------------- Eigth lecture notes --------------- */
// FETCH()
//  Use this to communicate with apis
//  Returns a promise fulfilled with a Response Object
//  On a broswer: fetch('url').then(response => response.json()).then(...)

// Async/Await
// Allows writing async code as if it were synchronous (stil non-blocking tho)
//
async function fetchUsers(){
    const response = await fetch('url api') // returns a promise. We wait for it to be fulfilled "before" setting it to the const reponse 
    const json = response.json() // waits for the promise to fulfill
    console.log(result) 
}
// With error handling

async function fetchUsersWithErrorHandling(){
    try{
        const response = await fetch('url api') // returns a promise. We wait for it to be fulfilled "before" setting it to the const reponse 
        const json = response.json() // waits for the promise to fulfill
        console.log(result) 
    } catch (err) {
        console.error(err)
    }
}

// TRANSFORMING DATA
//  do it early

// HTTP METHODS
//  GET is easy
//  POST submits data to an endpoit, parameters are in the request body
//  also, If POSTing JSON, must have content-type: application/json header and body must be JSON string

//  200 OK
//  400 bad request (missing something or weird shape)
//  403 forbidden
//  404 not found
//  500 internal server error

// Example API
const processContact = contact => ({
    name: `${contact.name.first} ${contact.name.last}`,
    phone: contact.phone,
})

export const fetchUsers = async () => {
    const response = await fetch('https://randomuser.me/api/?results=50&nat=us')
    const {results} = await response.json()
    return results.map(processContact())
}

export const login = async  (username, passowrd) => {
    const response = await fetch('127.0.0.1:8000', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({username, password}), // shortform form key and value names are the same
    })
    
    if (response.ok){
      return true
    }

    const errMessage = await response.text()
    throw new Error(errMessage)
  }