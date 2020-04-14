/* --------------- First lecture, including notes --------------- */
const firstName = "Caio";

const x = 40;

console.log(typeof x)
console.log(typeof null)

// Avoid using '==' as it might have strange behaviours

// Falsy values: undefined, null, false, +-0, NaN, ""
// Truthy values {}, [], everything else

/* OBJECTS*/
// Everything that is not a primitive value is an object
//  Primitives are immutable, passed by value
//  Objects are mutable and stored by reference

const o = new Object()
o.firstName = firstName
o.lastName = 'Camatta'
o.isLearning = true
o.greet = function(){
    console.log("hi")
}

const o2 = {} // Newer, easier-to-read way of creating an object
o2['lastName'] = "Camatta"
const key = "isLearning"
o[key] = true 
o2['greet'] = function(){
    console.log("hi")
}

// All keys are casted to a string
const o3 = {
    firstName: 'Caio',
    isLearning: true,
    greet: function(){
        console.log('hi')
    },
    address: {
        street: "148 Paul ST" // object within object
    }
}

console.log(o3.address.street)
console.log(o3.address['street']) 

/* MUTATING OBJECTS */
const obj = {
    a: 'a',
    b: 'b'
}
const obj2 = obj
obj.a = 'new value' // THis also changes obj2.a, since obj is just referencing the same "obj" im memory
console.log(obj2.a) // new value

// Alternatively,
const obj3 = Object.assign({}, obj) // Copy object's keys and values (shallow copy, not recursive)
obj3.a = 'new test value'
console.log(obj3.a) // new test value
// arrays are also copy by reference

// var is function scoped and let is block scoped.
// let can be changed but not redeclared. This is something that var does not give you  
// Hoisting: 'function' definitions and 'vars' are hoisted
//  Hoisted: variable is declared, but not initialized.