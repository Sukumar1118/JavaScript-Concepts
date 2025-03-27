/*
  -> "this" is a special keyword that refers to the context in which a function is executed. 
     It's value depends on how and where the function is called.
*/

/*
  -> this in global scope: global object

      EX:'window' in browser
          'global' in nodeJs

  -> In Browser's global scope (outside a function): Both in 'strict' mode and 'non-strict' mode,
                ->  'this' - value is window object in browsers.
                ->  'this' - value is undefined when the script type/runs as module.
                    Ex: <script type="module">
                          console.log(this);  //undefined
                          console.log(globalThis); //Window object
                        </script>
                        Output: undefined

      Not specified:      - Default: "text/javascript" (normal JavaScript execution)
      "text/javascript":  - Default JavaScript execution (explicit but unnecessary)
      "module":           - Enables ES6 modules (import/export support)
      "application/json": - Stores JSON data inside <script>

      -> In NodeJs global scope (outside a function): Both in 'strict' mode and 'non-strict' mode,
                ->  'this' - value is {} (module.exports) object in NodeJs.

      -> Node.js treats each file as a separate module, so this in the global scope is 
         module.exports to avoid polluting global.
      -> Each module in Node.js runs in an isolated scope, unlike browsers where scripts share a global window.
*/

/* In browser: */
console.log(this); //window object

("use strict");
console.log(this); //window object

// <script type="module">console.log(this);</script>; //undefined

/* In NodeJs: */
console.log(this); //{} (Same as module.exports)
console.log(globalThis); //global object

("use strict");
console.log(this); //{} (Same as module.exports)

/*
'this' - behaves differently in strict mode and non-strict mode inside functions.

    -> this - value is 'undefined' inside function in 'strict mode'.
    -> this - value is 'global(Window in browser)' in 'non-strict mode'.
*/

function thisIndiseFunction() {
  console.log("thisIndiseFunction: ", this); //window
}
thisIndiseFunction();

/* 'use strict':
  -> 'use strict' mode should be on top of the file or it should be inside the function,
      otherwise it will not as expected.
  -> 'use strict' mode code directly in browser's console doesn't work as expected.
  -> To check 'use strict', create html file, implement Code,Run and verify in browser console.
*/
function thisIndiseFunctionStrict() {
  ("use strict");
  console.log("thisIndiseFunctionStrict - mode : ", this); //undefined
}
thisIndiseFunctionStrict();

/* 'this substitution':
    -> In non-strict mode, if the value of 'this' keyword is 'undefined or null', 
       JavaScript automatically replaces with global object.
    -> However, in strict mode ("use strict"), this substitution does not happen
       and this remains undefined.
  Why?
    -> Backward compatibility – JavaScript was designed to be forgiving.
    -> Preventing errors in function calls – Without substitution, this would be undefined, 
       causing crashes.

  In Strict mode: No this substitution.
    -> Strict mode removes this substitution to avoids accidental global modifications.
    -> Prevents unintended global variables and makes this behavior predictable.
    -> This remains undefined if not explicitly set in strict mode.
*/

function thisSubstitution() {
  console.log("thisSubstitution: ", this); //window
}
thisSubstitution.call(null); //window
thisSubstitution.call(undefined); //window

function thisSubstitutionStrict() {
  ("use strict");
  console.log("thisSubstitutionStrict: ", this); //undefined
}
thisSubstitutionStrict.call(null); //null
thisSubstitutionStrict.call(undefined); //undefined

/* 
  -> The function setValue() is called without an object context.
  -> Instead of this being undefined (which would cause an error), JavaScript replaces 
     this with the global object (window / global).
  -> this.x = 100; actually means window.x = 100;, unintentionally creating a global variable.
*/

function setValue() {
  this.x = 100; // 'this' becomes 'window' (in browsers)
}
setValue();
//console.log(window.x); // Output: 100  (in browsers)

/*
  In Strict mode: this - value depends on how the function is called(window).

    -> If the function is called with out any reference, this - value is undefined.
    -> If the function is called with any reference(ex - window), 
       this - value is reference(here window) object.
       
    -> Here, you are explicitly calling the function as a property of window.
       Since the call is window.thisWithOutRef(), this inside the function refers to window.
*/

function thisWithOutRef() {
  "use strict";
  console.log("thisWithOutRef: ", this);
}
thisWithOutRef(); //undefined
//window.thisWithOutRef(); //window

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
    -> this inside Constructor functions.
*/

/* In constructor function When called with new, this refers to the newly created object.*/
function Person(name) {
  this.name = name;
  console.log(this); // `this` refers to the new object
}
const p1 = new Person("Alice");
// Output: Person { name: "Alice" }

/* In constructor function When called without new, this refers to the global object. */
function Person1(name) {
  this.name = name;
  console.log(this); // `this` refers to the global object
}
Person1("Alice");
// Output: Window { name: "Alice" }

/* In strict mode, this is undefined, preventing accidental global modifications. */
function Person2(name) {
  "use strict";
  //this.name = name;
  console.log(this); // `this` is undefined
}
Person2("Alice");
// Output: undefined

/*
    -> this inside Class functions.
*/

/* this refers to the newly created instance, just like in a constructor function. */
class Person3 {
  constructor(name) {
    this.name = name;
    console.log(this); // `this` refers to the new object
  }
}
const p3 = new Person3("Alice");
// Output: Person3 { name: "Alice" }

/*  Calling a Class Without new Throws an Error. */
class Person4 {
  constructor(name) {
    this.name = name;
  }
}
//Person4("Alice");
// Output: TypeError: Class constructor Person4 cannot be invoked without 'new'

/* Inside a class method, this still refers to the instance. */
class Person5 {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
}
const p5 = new Person5("Alice");
//p1.greet();
// Output: Hello, my name is Alice

/* this with Arrow Functions Inside a Class. 
      -> Arrow functions inherit this from the surrounding class instance.
*/
class Person6 {
  constructor(name) {
    this.name = name;
  }

  greet = () => {
    console.log(`Hello, my name is ${this.name}`);
  };
}
const p6 = new Person("Alice");
//p1.greet();
// Output: Hello, my name is Alice

/* this with Event Listeners Inside a Class. 
      -> When using addEventListener, this refers to the element that triggered the event.
      -> this.handleClick is passed as a callback, so this inside it refers to #myButton,
         not the class instance.    
*/
class Button {
  constructor(label) {
    this.label = label;
    document
      .getElementById("myButton")
      .addEventListener("click", this.handleClick);
  }

  handleClick() {
    console.log(this.label); // ❌ `this` is undefined
  }
}

/* Fix: Use an Arrow Function
class Button {
  constructor(label) {
    this.label = label;
    document
      .getElementById("myButton")
      .addEventListener("click", () => this.handleClick());
  }

  handleClick() {
    console.log(this.label); // ✅ Correct `this`
  }
}
*/
/*
    Case	                  Constructor Function (function)                 Class (class)
    this in constructor	    Refers to the new object (if called with new)	  Refers to the new object.
    Calling without new	    this refers to window/global (non-strict mode)	❌ TypeError (Must use new)
    this in method	        Depends on how it's called	                    Always refers to the instance.
    this in arrow function	Inherits from the surrounding function	        Inherits from the class.
    this in event listener	Refers to the event target (<button> element)	  Needs an arrow function to maintain class this.
*/
