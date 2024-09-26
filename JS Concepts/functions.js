/*
    Functions:
        -> Function statement aka Function declaration aka Named function
        -> Function expression
        -> Anonymous function
        -> Named function expression
        -> First-class functions(First-class citizens)
        -> callback functions


        -> Immediately Invoked Function Expression (IIFE)

    Parameters and Arguments: 
        -> Parameters are variables that are listed as part of the funciton definition. They are
            the placeholeders for the values that function uses when executed.
        -> Arguments are the actual values that are passed to the function when invoked.

    Diff b't "Function statement" & "Function expression":
        -> Funtion statements(Function declaration) are hoisted and can be called before declaration
            where as Function expressions are not hoisted since they are assigned to variables 
            as a value and cannot be called before the line where the function is defined.

    Anonymous function: A function that doesn't have a name.
        -> These ar created by function expressions or arrow functions.
        -> These are passed as arguments to another functions.
        -> These are mostly used:
            -> As callbacks to pass arguments to another functions like seTimeout(), 
            -> For handling events like clicks etc.
            -> In IIFEs as functions.
                etc...

    Named function expression: A function expression that has a name even though it is assigned to a variable.
        -> In this, named function is only invoked from inside the function and the named function
            cannot be called outside the function.
        -> It can be used for recursion where thr function needs refrence to itself.
        -> It is used for better debugging, since named functions gives more meaningful information
            than anonymous functions in debugging tools or stack traces.

    First-class functions: 
        -> Functions are treated like any other values or objects in JS, that means functions can be 
            assigned to variables, passed as arguments to another functions, can be returned from functions,
            can be stores in data structures like arrays, objects etc.

    callback functions:
        -> Callback is a function which is passed as an argument to another function 
            and it is executed after specific point of time or an event has occurred.
        -> Callbacks are essential for handling tasks like fetching data from server,
            timers etc. without blocking the execution of other code and they provide 
            a way to hadle sync operations.
        -> Callbacks are heavily used to handle events.
        For Ex: When you clcik a button, you define a calback function to handle 
        that event.

    
        
*/

// Function statement aka Function declaration
function func1() {
  console.log("func1 is called");
}

// Function expression
var func2 = function () {
  console.log("func2 is called");
};

//Anonymous function
var func3 = function () {
  console.log("func3 is called");
};

//Named function expression
let func4 = function greet() {
  console.log("greet is called");
  console.log(greet);
};
func4();
greet(); // ReferenceError: greet is not defined.

//callback functions
console.log("Start 1");
setTimeout(function () {
  console.log("Time out");
}, 2000);
console.log("End 1");

document.getElementById("myButton").addEventListener("click", function () {
  console.log("Button clicked!");
});

