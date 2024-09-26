/*
    callback: callback is a function which is passed as an argument to another function 
              and it is executed after some operation or an event has occurred.
    -> Callbacks allows you to specify what should happen after a task 
        is completed and making the code flexible and asynchronous.
*/

console.log("Start");

function sayHello(callback) {
  console.log("Hello!");
  callback();
}

function callback1() {
  console.log("callback1");
}

sayHello(callback1);

console.log("End");

/*
    -> JavaScript is a synchronous, single-threded language that means,
        it executes only one task at a time.
    -> Callbacks are essential for handling tasks like fetching data from server,
        timers etc. without blocking the execution of other code.
    -> Without callbacks, JS waits for long-running tasks and blocks the UI 
        to move to another task.
    -> Callbacks are heavily used to handle events.
        For Ex: When you clcik a button, you define a calback function to handle 
        that event.
*/

console.log("Start 1");

/* SetTimeout delays the execution of callback function without blocking the 
    execition of remaining code.
*/
setTimeout(function () {
  console.log("Time out");
}, 2000);

console.log("End 1");

document.getElementById("myButton").addEventListener("click", function () {
  console.log("Button clicked!");
});

/*
    Callback problems:
    -----------------
    Callback Hell: callback hell is like where multiple nested callbacks are used,
        usually in asynchronous operations, where code becomes difficult to read, 
        maintain and debug.

    Inversion of control: Ioc is like delegating the control of exection flow to the 
        callbcak functions, instead of managing by yourself.
        -> You provide the code, but something else decides when to execute it.
        -> Functions might be written by different people and we can't rely on them.
        -> It may run multiple times or any other problems.
*/

const cart = ["sandals", "headphones", "T-shirts"];

createOrder(cart, function (res1) {
  goToPayments(res1, function (res2) {
    showOrderSummary(res2, function (res3) {
      updateWallet(res3, function (res4) {
        console.log("Final Result: ", res4);
      });
    });
  });
});

// Modularize callbacks
function handleTask1(res1) {
  goToPayments(res1, handleTask2);
}

function handleTask2(res2) {
  showOrderSummary(res2, handleTask3);
}

function handleTask3(res3) {
  updateWallet(res3, handleFinalTask);
}

createOrder(cart, handleTask1);

//Using Promises
createOrder()
  .then((res1) => goToPayments(res1))
  .then((res2) => showOrderSummary(res2))
  .then((res3) => updateWallet(res3))
  .then((res4) => console.log(res4))
  .catch((error) => comsole.log(error));

// Using async/await
async function runTasks() {
  try {
    const res1 = await createOrder(cart);
    const res2 = await goToPayments(res1);
    const res3 = await showOrderSummary(res2);
    const res4 = await showOrderSummary(res3);
    console.log(res4);
  } catch (error) {
    console.log(error);
  }
}
runTasks();
