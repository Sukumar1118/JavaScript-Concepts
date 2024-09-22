/* 
    -> this in global scope: global object

        EX:'window' in browser
           'global' in nodeJs

*/

"use strict";
console.log(this);

/*
'this' - behaves differently in strict mode and non-strict mode inside functions.

    -> this - value is undefined inside function in strict mode.
    -> this - value is global(Window in browser) in non-strict mode.
    -> If the value of 'this' keyword is undefined or null, it will be replaced with
        globalObject only in non-strict mode(this substitution).
    -> this - inside non-strict mode - (this substitution).
*/

function thisInFunction() {
  console.log("thisInFunction: ", this);
}
thisInFunction();

/*
    -> this - value depends on how the function is called(window).
     
    -> If the function is called with out any reference, this - value is undefined.

    -> If the function is called with any reference(ex - window), this - value is reference(here window) object.

*/
thisInFunction();
window.thisInFunction();

/*
    -> this - inside object's method.
*/

let student1 = {
  name: "Sachin",
  func: function () {
    console.log(this.name);
  },
};

student1.func(); //'this' - value is 'Sachin'(student1.name) here.

let student2 = {
  name: "Virat",
};

/*  -> call, apply and bind(sharing methods).
    -> call  method takes this value as first argument.
*/
student1.func.call(student2); //'this' - value is 'Virat'(student2.name) here.

/* 
    "this" - inside arrow functions: 
        -> Arrow functions doesn't have their own 'this' binding, it retains the 'this' - value 
            of its enclosing lexical context(inherits the this from the parent scope when defined).

        -> In nested arrow function it refres to the context of parent function.
*/

const employee = {
  firstName: "John",
  lastName: "Cena",
  fullName: () => {
    console.log(this.firstName, this.lastName);
  },
};
employee.fullName(); // value is "undefined undefined" as it parent scope.

const employee1 = {
  firstName: "John",
  lastName: "Cena",
  fullName: function () {
    const func = () => {
      console.log(this.firstName, this.lastName);
    };
    func();
  },
};
employee1.fullName(); // value is "John Cena" as it parent scope(here it's employee1).

const employee2 = {
  firstName: "John",
  lastName: "Cena",
  fullName: () => {
    const func = () => {
      console.log(this.firstName, this.lastName);
    };
    func();
  },
};
employee2.fullName(); // value is "undefined undefined" as it parent scope.

/* 
    "this" - inside DOM: this refers to the HTML element.
        -> Output: [object HTMLButtonElement]

    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8" />
        <title>title</title>
    </head>
        <body>
            <script src="index.js"></script>
            <div>
            <button onclick="alert(this)">click me</button>
            </div>
        </body>
    </html>
*/

/*
    -> this inside class and constructor functions

    **** To be continued...
*/