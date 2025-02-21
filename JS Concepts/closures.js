/*
    Closures: A closure is a combination of function and it's lexical environment(surrounding state).
        -> In other works, the closure gives access to it's outer function scope.
        -> Closure has access to it's variable references not it's values.
*/

function a() {
  let x = 20;
  return function b() {
    console.log("closure-1: ", x);
  };
}
var c = a();
c(); // 20 - this has access to the outer variables even after returning the function.

function ab() {
  let x = 20;
  function bc() {
    console.log("closure-2: ", x);
  }
  x = 30;
  return bc;
}
var cd = ab();
cd();

/*
    Uses of closure:
        -> Data Encapsulation.
        -> Currying: Closures allow you to create functions with preset parameters.
        -> Maintaing state in async world
        -> setTimeouts
        -> Iteators
        -> Functions like once
        -> memoize
        -> Module design pattern etc.

*/

//Ex1
function counter() {
  let count = 0;
  return function () {
    count += 1;
    return count;
  };
}
const increment = counter();

console.log("counter", increment()); // 1
console.log("counter", increment()); // 2
console.log("counter", increment()); // 3

//Ex2
function multiply(multiplier) {
  return function (number) {
    return number * multiplier;
  };
}
const double = multiply(2);
const triple = multiply(3);

console.log("double:", double(5)); // 10
console.log("triple:", triple(5)); // 15

/*
    setTimeout & closures:
        -> In the below exmple, setTimeout doesn't wait for next line to execute.
        -> Instead, it takes callback function and attach timer to it and 
            once timer completes it executes the function.
        -> Here, setTimeout callback function creates closure holding the variable x reference.
*/

function func2() {
  var x = 10;
  setTimeout(function () {
    console.log("func2: " + x);
  }, 3000);
  console.log("func2 Hello JS!");
}
func2();
// func2 Hello JS!
// func2: 10 (after 3 - secs)

//Ex: Print 1,2,3.. for each second.
function func3() {
  for (var i = 1; i < 4; i++) {
    setTimeout(function () {
      console.log("func3: " + i);
    }, i * 1000);
  }
}
//func3();
// 4 4 4 - because function closure holds reference to its lexical environment and not value
// and so when the function executes after timer, it's value is 4 and so prints 4 every time.

//Ex: Print 1,2,3.. for each second.
function func4() {
  for (let i = 1; i < 4; i++) {
    setTimeout(function () {
      console.log(i);
    }, i * 1000);
  }
}
//func4();

//Ex: Print 1,2,3.. for each second.
function func5() {
  for (var i = 1; i < 4; i++) {
    function close(x) {
      setTimeout(function () {
        console.log("func5: ", x);
      }, x * 1000);
    }
    close(i);
  }
}
//func5();

//Ex: Print 1,2,3.. for each second.
function func6() {
  for (var i = 1; i < 4; i++) {
    setTimeout((i) => console.log("func6: ", i), i * 1000, i);
  }
}
func6();

//Ex: Print 1,2,3.. for each second.
function func7() {
  for (var i = 0; i < 4; i++) {
    setTimeout(function (i) {
      console.log("func3: " + i);
    }, i * 1000,i);
  }
}
func7()

/*
Garbage Collector: It's a process reponsible for freeing up the memory that is 
                   no longer needed for the application.

            -> It uses garbage collection alogorithms(like Mark-and-Sweep algorithm) to automatically 
                find and reclaim the memory used by objects that is no longer reachable or referenced.

            -> In closures, if any variables are not used or referred anywhere in the closure,
                those are smartly garbage collected.

Memory leaks:
            -> Unncesaary global variables are created and not cleaned up.
            -> Creating a lot of closures which hold the memory can cause memory leaks.
            -> Event listeners are not properly removed and those references can cause memory leaks.
               etc..
*/

/*
    Closures with eventListeners
*/
function buttonCount() {
  let count = 0;
  document.getElementById("myButton").addEventListener("click", function () {
    console.log("Button clicked!: ", count++);
  });
}
buttonCount();
