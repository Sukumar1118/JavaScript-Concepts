/*
    Async: async is a keyword used before a function to ctare async function.
        -> async function always returns a promise. 
        -> You can return a promise in async function and it will return that promise as it is.
        -> If don't return any promise and return any value, it will wrap the value inside promise
            and returns the promise.
*/

//Ex: async with out returning promise or default promise.
async function getData() {
  return "Promise Wapped";
}

const dataWappedPromise = getData();
dataWappedPromise.then((res) => {
  console.log(res);
});

//Ex: async with returning actual promise.
async function getUserData() {
  return userPromise;
}

const userPromise = new Promise(function (resolve, reject) {
  resolve("User data fetched.");
});

const userDataPromise = getUserData();
userDataPromise.then((res) => {
  console.log(res);
});

function regularPromise() {
  //JS engine will not wait for the promise to be reolved here.
  userDataPromise.then((res) => console.log("regularPromise: ", res));
  console.log("JS will not wait for promise to be resolved");
}
regularPromise();

/*
Await: await is a keyword used before the promise.
    -> await can only be used inside async function.
    -> async and await is used to handle promises.
    -> await will wait for the promise to be resolved and then executes the next line.
    -> In regular, .then() handlers JS will not wait for the promise to be resolved
        and executes the next line.

*/

const pr = new Promise(function (resolve, reject) {
  resolve("Await promise resolved.");
});
async function getDetails() {
  console.log("Before  await.");
  const val = await pr;
  console.log("After await.");
  console.log("Await Promise: ", val);
}
getDetails();

/*
    -> If two awaits are there how promises behave:

        -> If the promise is wrapped inside the function, then the promise will start the timer 
            exactly when the await comes and waits for the given setTimeout() and then resolves.

        -> If the promise is declared in a variable, the timer will start immediately even before await 
            and the promise will be fulfilled. When it reaches the await, the promise will resolve 
            immediately with out waiting for given setTimeout().

        -> The code before setTimeout() inside the promise will be executed even before await.
            
        -> The code inside setTimeout also will be executed after the timer completes the given time
            for the variable declaration promises even before await.

        -> The code inside setTimeout will be executed after the timer completes the given time
            for the promises inside function after await.
*/

//Ex:
const p1 = new Promise(function (resolve, reject) {
  console.log("p1 console");
  setTimeout(function () {
    console.log("p1 setTimeout console");
    resolve("p1 resolved");
  }, 2000);
});

const p2 = new Promise(function (resolve, reject) {
  console.log("p2 console");
  setTimeout(function () {
    console.log("p2 setTimeout console");
    resolve("p2 resolved");
  }, 5000);
});

function promise1() {
  //Both code snippets works as expected.

  /*
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve("functionPromise resolved");
        }, 5000);
      });
   */
  console.log("functionP1 console 1");
  const functionP1 = new Promise(function (resolve, reject) {
    console.log("functionP1 console 2");
    setTimeout(function () {
      console.log("functionP1 setTimeout console");
      resolve("functionP1 resolved");
    }, 10000);
  });

  return functionP1;
}

function promise2() {
  //Both code snippets works as expected.

  /*
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve("p1 resolved");
        }, 10000);
      });
    */

  const functionP2 = new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log("functionP2 setTimeout console");
      resolve("functionP2 resolved");
    }, 10000);
  });

  return functionP2;
}

async function checkAwaitBehaviour() {
  const firstFunctionPromise = await promise1();
  console.log("firstFunctionPromise: ", firstFunctionPromise);

  const secondFunctionPromise = await promise2();
  console.log("secondFunctionPromise: ", secondFunctionPromise);

  const firstPromise = await p1;
  console.log("firstPromise: ", firstPromise);

  const secondoPromise = await p2;
  console.log("secondoPromise: ", secondoPromise);

  // const thirdPromise = await Promise.resolve("P3 resolved...");
  // console.log("thirdPromise: ", thirdPromise);
}

checkAwaitBehaviour();
console.log("After Async lines..");

const test = async (sec) => {
  await new Promise((resolve) =>
    setTimeout(() => {
      console.log("First: timeout");
      resolve("First: timeout");
    }, sec * 1000)
  );
  console.log("First: ", sec);
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve("Second: timeout");
    }, sec * 1000)
  );
  console.log("Second: ", sec);
};

// test(5);

/*
    Error handling in async functions:
        -> we can use try..catch blocks to handle errors or asyncFunction.catch() also.

    Promises Vs Async..await:
        -> Async..await is just syntactical sugar than traditional way of handling promises.
        -> Error handling is done using try..catch blocks or syncFunction.catch() also.
        -> Chaining of promises will be avoided using await in async functions and code will be 
           more clean and consice.

*/
const API_URL = "https://api.github.com/users/Sukumar1118";
const API_URL_NOT_VALID = "https://api.github.co/users/Sukumar1118";

async function getUsers() {
  try {
    const users = await fetch(API_URL);
    const res = await users.json();
    console.log(res);
    const users1 = await fetch(API_URL_NOT_VALID);
    const res1 = await users1.json();
    console.log(res1);
  } catch (error) {
    console.log(error);
  }
}
getUsers();

/* 
//Without try..catch

getUsers()
  .then(function (res) {
    console.log(res);
  })
  .catch(function (err) {
    console.log(err);
  });
*/
