/* --------------- Second lecture, including notes --------------- */
// CLOSURES
//  Functions that refer to variables declared by parent function still have access to those variables
//  Possible because of JS's scoping
//  Because of closure, functions that are declared have access to their variables at the point of declaration
//  "A closure is the combination of a function and the lexical environment within which that function was declared. 
//  ... This environment consists of any local variables that were in-scope at the time the closure was CREATED"
function makeAdder(x) {
    return function(y) {
        return x + y;
    };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12
// add5 and add10 are both closures. They share the same function body definition, but store different lexical environments
console.log("---------------")


function makeFunctionArray(){
    const arr = []

    // 'let' only works for the block
    for (var i = 0; i < 5; i++) {
        arr.push(function() {console.log(i)})
    }

    console.log(i)

    return arr

}
const functionArr = makeFunctionArray()
functionArr[0]() // Prints 5 ! Bug
console.log("---------------")

function makeHello(){
    const message = "Hello"

    function sayHello(){
        console.log(message)
    }

    return sayHello
}

const sayHello = makeHello()
// console.log(message) error because its out of scope
console.log("typeof message: ", typeof message)
console.log(sayHello.toString())
sayHello() // works! accessible outside of function. Variable message was within scope when function was created
console.log("---------------")

// IMMEDIATELY INVOKED FUNCTION EXPRESSION (IIFE)
//  a function that gets invoked immediately; creats closure
//  they don't add to or modify the global object
const sayHello2 = (function(){ // Annonimous function
    const message = "Hello"

    function sayHello2(){
        console.log(message)
    }

    return sayHello2
})() // Immediately invoke it

const counter = (function(){
    let count = 0

    return {
        inc: function(){ count = count + 1},
        get: function(){ console.log(count)}
    }
})()

// The variable count is limited to the block, so it is not accessible in the global scope.
// However, the functions do have access to it.
counter.get()
counter.inc()
counter.get()
console.log("---------------")

// USING IIFE TO FIX THE FIRST PROBLEM
function makeFunctionArray2(){
    const arr = []

    // 'let' only works for the block
    for (var i = 0; i < 5; i++) {
        arr.push((function(x) {
            return function() {console.log(x)}
        })(i))
    }

    return arr

}
const functionArr2 = makeFunctionArray2()
functionArr2[0]() // Prints 5 ! Bug
console.log("---------------")
