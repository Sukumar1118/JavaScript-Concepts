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
