/*
    -> Refer Image: JS Concepts\assets\images\executionContext.PNG

    -> JavaScript is synchronous single threaded language.
        -> It executes the code line by line that means, after completing 
            the execution of one line then only it goes to next line.

    -> Everythng in Javascript happens inside an execution context.

    -> You can consider it as one big box, which contain two sections:
        -> one is "Memory" and another is "Code".
            OR
        -> One is "Variable environment" and another is "Thread of execution".

        -> Memory section stores all variables  and functions in Key: Value pairs.

        -> Code is section is where all the JS code runs or executed.

    Refer Image: JS Concepts\assets\images\executionContext_2.PNG

    -> Initially GEC(Global Execution Context) is created whenever a JS program runs.

    -> First phase is "Memory allocation" phase:
        -> In this, all variables and functions are allocated memory.
        -> The value assigned is "undefined" for variables and the whole function 
            itself is assigned for functions

    -> Second phase is "Code execution" phase:
        -> In this phase, on execution of the code values for variables are assigned as applicable.

        -> When a function is invoked, local execution context is created.
            -> Again, it has two sections like GEC and everything like memory allocation,
                code exceution is same.
            -> In this params also will be considered as variables and so on.
            -> Like wise if any other function is invoked, another EC is created and so on.

    -> Call stack:
        -> All the ECs are maintained in call stack.
        -> First GEC is created and next local EC is created for each function invocation
            and pushed on to the stack and so on.
        -> When the exceution of the any function is completed, it's EC is removed 
            or popped out of call stack.
        -> When the excution of all program is completed, GEC is also deleted.
        -> Call stack is called with different names like: EC stack, Program stack,
            Machine stack, Contol stack, Runtime stack etc.

*/

/*
    Ex: To show every function has its own execution context.
    Refer Image: JS Concepts\assets\images\executionContext_3.PNG
*/
var x = 10;

aFunc(); //20
bFunc(); //30
console.log(x); //10

function aFunc() {
  var x = 20;
  console.log(x);
}

function bFunc() {
  var x = 30;
  console.log(x);
}

/*
    -> Shortest program in JS is empty file.
    -> When we run any empty JS file:
        -> It creates GEC or global space.
        -> It has window object and JS engine provides this window object.
        -> It alos give "this" - which is window object in GEC.
        -> this === window (true) in GEC.
        -> Any variable or function, written outside the function will be available
            as part of GEC.
        -> Anything written inside the function is available as part of that function
            execution context(Local).
*/

var xyz = 10;
console.log("xyz: ", xyz); //10
console.log(window.xyz); //10

/*
    "undefined" Vs "not defined":
        -> In JS, during memory allocation phase all variables are given a 
            default placeholder or value as"undefined"
        -> If some variable is not present in the program or memory of the EC,
            then it is thrown error as "variable is not defined".
*/
var a;
console.log(a); //undefined
console.log(aXYZ); //ReferenceError: aXYZ is not defined
console.log(a === undefined); //true

/*
    Loosely/weakly typed: In Js, we can assign any type of value to a variable.
        -> We can assign number, then we can assign string etc.
        -> It's flexible to add any type of values to a variable.
*/

var a = 10;
console.log(a); //10
a = "Sukumar";
console.log(a); //Sukumar
