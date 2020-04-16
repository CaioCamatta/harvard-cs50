/* --------------- Second lecture, including notes --------------- */
// FIRST CLASS FUNCTIONS
//  functions are treated the same way as any other value, i.e. can be assigned to variables, array objects, object values, can be passed as arguments, can be returned by other functions
//  allows for the creation of higher-order functions. Either takes one/more functions as arguments or returns a function
//  map() applies a function to each value in the array
//  filter() retains the values that return true and filters out the values that return false, similar to map, but the original values are not affected
//  reduce() in an array uses every value in an array sequentially
// Now we implement a high order function
function map(arr, fn){
    const newArr = []

    arr.forEach(function(val){
        newArr.push(fn(val))
    })

    // for(let i=0; i<arr.length ; i++){
    //     let val = arr[i]
    //     newArr.push(fn(val))
    // }

    return newArr
}

function addOne(num){ return num +1 }

const x = [0,1,2,3]

console.log(map(x, addOne))


// SYNC vs ASYNC vs SINGLE-THREADED. 
//  Js is generally synchronous and single-threaded
//  however, some functions are async
function printOne(){
    console.log('one')
}
function printTwo(){
    console.log('two')
}
function printThree(){
    console.log('three')
}

// SetTimeout() is async 
// setTimeout(printOne,1000)
// setTimeout(printTwo,0)
// printThree()

// API's are handled by the browser, thats why they are asynchrounous. They let JS know when they are done by pushing the functions back to the queue
//  other functions: XMLHttpRequest() for other pages, jQuery.ajax(), fetch()


// CALLBACKS
//  control flows with async calls, i.e execute function once async call returns value
function doSomethingAsync(callback){
    setTimeout(function(){callback(1)},1000)
}
//doSomethingAsync(console.log)

// PROMISES
//  helps alliviate callback hell
/*const url = ''
fetch(url)
    .then(function(res){ return res.json() })
    .then(function(json){ return ({ importantData: json.importantData,}) })
    .then(function(data){ return console.log(data) })
    // basically a chain of callbacks
    .catch(function(err){
        //handles any errors in preceding then's
    })*/ 

// ASYNC/AWAIT allows u to 'force' async

// THIS
//  refers to an object that is set at the invocation of a function, refers to the object
const person = {
    name: 'caio',
    greet: function(){console.log('Hello', this.name)}
}
person.greet() // caio

const friend = {
    name: 'david'
}

friend.greet = person.greet // attach function from other object
friend.greet() // david

const greet = person.greet.bind({name:'this is a bound object'})

const newPerson = {
    name: 'newPerson',
    greet: () => {console.log(this.name)}
} // bind 'this' to be whatever it is at the time of writing

greet() // undefined (window.name)
newPerson.greet()