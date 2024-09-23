/*
    Refer Images: JS Concepts\assets\images\scopeChain.PNG,
                  JS Concepts\assets\images\scopeChain_2.PNG

    Scope: scope is like where and all the variable has access.
        -> If we take any variable, it has access to it's function lexical scope
            and it's parent's lexical scope.
        -> This chaining of lexical environments/scopes is called "scope chain".
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
