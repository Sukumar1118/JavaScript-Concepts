/*
    Refer Images: JS Concepts\assets\images\scopeChain.PNG,
                  JS Concepts\assets\images\scopeChain_2.PNG

    Scope: "Scope" is like accessibility of variables, functions etc. at different parts of the code.
        -> If we take any variable, it has access to it's function lexical scope
            and it's parent's lexical scope and so on until gobal scope.
        -> Lexical environment is a structure that holds all variable names, constants and
            function refrences and reference to the outer lexical environment
        -> Looking up in this chain of lexical environments/scopes for variable resolution,
            from local to global scope is called "Scope chain".
*/

var z = 40;
function a() {
  var x = 20;
  c();
  function c() {
    var y = 30;
    console.log(x); //20: It has access to it's function lexical scope.
    console.log(z); //40: It has access to it's parent's lexical scope.
  }
}

a();

/*
    let and const:
        -> "let" and "const" are also hoisted like var, but they have Temporal Dead Zone(TDZ).

        -> "var" can be accessed before it's initialization, but let and const cannot
            be accessed before it's declaration is encountered in the code.

        -> The zone/area where until let and const are hoisted but not declaraed in the code,
            there they can't be accessed. It is called TDZ(Temporal Dead Zone).

        -> They ar also allocated memory before execution, but they are not placed 
            in global space. They are placed in separate memory location.
            So, they are not accessible until declaration in the code.

        -> To avoid TDZ, push all declarations and initialize on the top of the scope/code.

        -> "let and const" cannot be redeclared like var.

        -> "const" should be initialized immediately at declaration.

        -> Different errors are explained in example.

        -> Try to use const and let more, try to avoid var as good practice.
*/

//console.log(xLet); //ReferenceError: Cannot access 'xLet' before initialization.
//console.log(yLet);; //ReferenceError: yLet is not defined.

let xLet;
console.log(xLet); // undefined
xLet = "Tendulkar";
console.log(xLet);
//let xLet = "Dhoni";//SyntaxError: Identifier 'xLet' has already been declared.

//const aConst;// SyntaxError: Missing initializer in const declaration.
const bConst = 30;
//bConst = 40; // TypeError: Assignment to constant variable.

/*
    Block: Block is open and close curly braces - {} in JS.

        -> Block is used to combine or execute multiple statements like 
            if & else blocks, function blocks etc.

        -> let and const are "block scoped". That means, when let and const are 
            declared inside block, they are stored in separate memory called "Block".
            And they cannot be accessed outside these block. So, they are called "block scoped".

        -> If multiple blocks(nested blocks) are created, seperate memory blocks are createf for 
            each one whcih can be observed in dev tools.

    Shadowing: Shadowing is like when a variable in the inner scope has the same name as outer
            scope variable, the inner scope variable shadows outer one.

            -> Shadowing happens at different levels like: global, function or block scope.

            -> Try to avoid shadowing to clear confusion by creating proper descriptive 
                variable names and using different names inside and outside blocks etc.
*/

//Global vs Local (Function) Scope Shadowing
let x = 10;

function func1() {
  let x = 20; // Local variable shadows global one.
  console.log(x); // 20 - local x is used.
}
func1();
console.log(x); // 10 - global x is used ouside the function.

//Block Scope Shadowing
let xy = 30;

if (true) {
  let xy = 50; // block-scoped variable shadows outer xy variable.
  console.log(xy); // 50 - block scoped xy is used.
}
console.log(xy); // 30 - outer xy is used outside the block.

//Function Parameter Shadowing
let z = 50;

function test(z) {
  console.log(z); // 100 (parameter z shadows the outer z)
}

test(100);
console.log(z); // 50 (outer z is used outside the function)
