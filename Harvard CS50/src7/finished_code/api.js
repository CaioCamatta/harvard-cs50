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