/*
    Functions:
        -> Function statement aka Function declaration aka Named function
        -> Function expression
        -> Anonymous function
        -> Named function expression
        -> First-class functions(First-class citizens)
        -> Higher-order function
        -> callback functions
        -> Arrow function
        -> Immediately Invoked Function Expression (IIFE)
        -> Pure and Impure functions
        -> Constructor function

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

    First-class functions: (First-class citizens)
        -> Functions are treated like any other values or objects in JS, that means functions can be 
            assigned to variables, passed as arguments to another functions, can be returned from functions,
            can be stores in data structures like arrays, objects etc.

    Higher-order function:
        -> If a function takes one or more another functions as arguments or 
            returns a function as result, then it is called Higher-order function.

    callback functions:
        -> Callback is a function which is passed as an argument to another function 
            and it is executed after specific point of time or an event has occurred.
        -> Callbacks are essential for handling tasks like fetching data from server,
            timers etc. without blocking the execution of other code and they provide 
            a way to hadle sync operations.
        -> Callbacks are heavily used to handle events.
        For Ex: When you clcik a button, you define a calback function to handle 
        that event.

    Arrow function:
        -> Arrow functions are more concise way to write functions in JavaScript. 
            They provide shorter syntax and they are introduced in ES6.
        -> Arrow functions doesn't have their own "this" binding, they inherit "this"
            from the surrounding scope  where the function is defined.
        -> They don't have a name, but when assigned to a variable or an object property
            they inherit a name based on the variable or property name.

    Immediately Invoked Function Expression (IIFE):
        -> An IIFE is a function expression that gets executed immediately after created
            without calling it explicitly.
        -> The paranthesis around it makes it an expression not a declaration.

    Pure and Impure functions:
        -> Pure function is that, if given the same inputs, will always return the same output
            with causing any side affects(doesn't alter any external state or data).
        -> Impure function is that which produces different output even with same inputs or
            may cause side effects by modifying external state or data.

        -> It's better to write pure functions most of the times becaise they are more predictable,
            testable and maintainable.

    Constructor function:
        -> Constructor function is a special type of function used to create and initialize objects.
        -> When called with "new" keyword, it creates instance of an object with properties and 
            methods defined inside the function.
        -> It is conventionally written in a capitalized name to distinguish it from regular functions.

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

//Arrow function
const funcName = (param1, param2) => {
  return param1 + param2;
};
console.log(funcName.name);

const personDetails = {
  firstName: "Sukumar",
  greet: () => {
    console.log(`Name: ${this.firstName}`);
  },
};
console.log(personDetails.greet());// Name: undefined (here it inherits global scope)

//Higher-order function(Calculate function takes another function as argument)
const radius = [2, 7, 10, 15];

const area = function (radius) {
  return Math.PI * radius * radius;
};
const diameter = function (radius) {
  return 2 * radius;
};

const calculate = function (radius, logic) {
  let output = [];
  for (let i = 0; i < radius.length; i++) {
    output.push(logic(radius[i]));
  }
  return output;
};

console.log(calculate(radius, area));
console.log(calculate(radius, diameter));

//Immediately Invoked Function Expression (IIFE)
(function () {
  console.log("IIFE executed");
})();

for (var i = 1; i <= 5; i++) {
  (function (i) {
    setTimeout(() => {
      console.log(i); // 1, 2, 3, 4, 5
    }, i * 1000);
  })(i);
}

//Pure function
function sum(a, b) {
  return a + b;
}

//Impure functions
let empName = "sukumar";
function changeName() {
  empName = "Sachin"; // alters external data
}

function randomNum() {
  return Math.random(); // gives different output each time
}

function logError(errorMessage) {
  console.error(errorMessage); // affects the external environment
}

//Constructor function
function Person(name, age) {
  this.name = name;
  this.age = age;

  this.sayHello = function () {
    console.log(`Name: ${name}, Age: ${age}`);
  };
}

let person1 = new Person("Sukumar", 34);
person1.sayHello(); //Output: Name: Sukumar, Age: 34
