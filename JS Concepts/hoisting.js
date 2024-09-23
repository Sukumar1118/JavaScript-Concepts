/*
    Hoisting: It means, variables and functions in JS can be accessed before 
        they are atually decalred in the code.

        -> How it happens is, in memory allocation phase all variables and functions 
            are allocated memory and check Execition context and so on.

        -> Functions declared with Variables will also be considered as variables.

        -> So, before the code execution the value of variables is undefined, 
            and functions is actual function copy.

        -> If any variable is not in the memory and tried to access, 
            it throws an error: Reference error: variable is not defined.
*/

console.log(x); //undefined
console.log(y) //ReferenceError: y is not defined

var x = 10;
console.log(x); //10

getName(); //Sukumar
console.log(getName1); //undefined
getName1(); //TypeError: getName1 is not a function

function getName() {
  console.log("Sukumar");
}
var getName1 = () => {
  console.log("Reddy");
};

getName(); //Sukumar
getName1(); //Reddy
