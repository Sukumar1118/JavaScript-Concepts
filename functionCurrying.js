/* Function Currying:
   =================
    It's a tecnique to tranform a function in to a sequence of functions, each function taking an argument.
    Instead of taking all arguments at once, a function takes single argument and returns a function that 
    takes another argument and so on until all arguments are provided. Then final function returns the result.

    Note: -> Curried functions can take multiple arguments and combination also like single and multiple 
            arguments in the chain, but it's like partial application rather than pure currying. 
    -> Curried functions take single argument at once.
*/
function curriedSum(a, b) {
  return function (b) {
    return a + b;
  };
}

console.log("curriedSum: ", curriedSum(2)(3));

const curriedArrowSum = (a) => (b, c) => a + b + c;

console.log("curriedArrowSum: ", curriedArrowSum(2)(5, 5));

/*
Benefits:
========
-> Reuse logic with different parameters.
-> To write cleaner, maintainable and scalable code.
-> Simplifying the code while making API calls
-> Can be used to manage function compositions
*/

let logger = (logType) => (message) => console[logType](message);

const info = logger("log");
const warn = logger("warn");
const error = logger("error");

info("This is an info message");
warn("This is warning");
error("This is an error");

/* Funcition Composition:
   =====================
   It's like combine two or more functions to produce another new function. The result of 
   one function is passed as input to another function and so on until all funtiona are applied.

   Notes:
    -> Composing function from right to left using reduceRight called 
        function composition - Traditional appoach.
    -> Composing function from left to right using reduce called 
        pipe - Not a traditional appoach and more intuitive for sequential processes.
*/

//Example with arrow functions.
const add = (x) => x + 3;
const multiply = (x) => x * 3;

const composedFuncArrow = (x) => multiply(add(x));
console.log("composedFuncArrow: ", composedFuncArrow(3));

//Using reduce & reduceRight functions to compose multiple functions.
const substract = (x) => x - 1;

const composeromRight =
  (...functions) =>
  (input) =>
    functions.reduceRight((acc, fun) => fun(acc), input);

const composeReduceRight = composeromRight(add, multiply, substract);
console.log(`composeReduceRight: ${composeReduceRight(2)}`)

const composeFromLeft = (...functions) => input =>
    functions.reduce((acc, fun) => fun(acc), input);

const composeReduceLeft = composeFromLeft(add, multiply, substract);
console.log(`composeReduceLeft: ${composeReduceLeft(2)}`)



//Example with named functions.
function sum(x) {
  return x + 2;
}
function multiplication(x) {
  return x * 2;
}

function composedFunc(x) {
  return multiplication(sum(2));
}
console.log("composedFunc: ", composedFunc(2));
