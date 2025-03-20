/*
    Promises: Promise is an object that represents eventual completion or failure
        of an asynchronous operation.

    -> Promises help to avoid callback hell and inversion of control.

    -> Promise is an object and it may be in one of any 3 - states.

        -> Pending: This is initial state and it is neither fulfilled nor rejected.

        -> Fulfilled: In this state, operation completed successfully and promise has the result.

        -> Rejected: In this state, operation has failed and promise has an error(or reason for an error).

            Once a promise is fulfilled or rejected, it becomes "Settled" and it's state cannot change.

    Consuming Promises: Promises can be consumed using two main methods.

            -> .then(): This mathod handles successful promise resoution.

            -> .catch(): This method handles  promise rejection(failure).

            -> .finally(): This method executes after the promise is settled, irrespective of 
                           either promise is resolved or rejected.
*/

const myPromise = new Promise((resolve, reject) => {
  let success = true;
  if (success) {
    resolve("Operation is success.");
  } else {
    reject("Operation failed.");
  }
});

myPromise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("Promise settled");
  });

/* 
    Promise Chaining: You can return a new promise from a .then() method and can
        handle subsequent asynchronous operations in a cleaner way.

        -> If the promise is rejected, the control goes to nearest catch block directly
            and doesn't execute subsequent .then() handlers before catch().

        -> It resolves callback hell and inversion of control problems,
            -> JS makes sure that the promise is resolved only once either rejected or fulfilled.

            -> We will have control over steps with .then(), .catch() and .finally() methods
                to execute subsequent async operations, since we define the flow of execution in
                the code and not handed to the external or third-party functions.

            -> With chaining, it makes the code clean, redable and easy to maintain.

        -> Error handling will be easier. We can catch errors at any point of time in the chain.
*/

//Ex-1:
myPromise
  .then((result) => {
    console.log(result);
    return result;
  })
  .then((result) => {
    console.log(result);
    return result + 1;
  })
  .then((result) => {
    console.log(result);
    return result + 1;
  });

//Ex-2:
const cart = ["shoes", "shirts", "kurtas", "T-shirts"];
createOrder(cart)
  .then((orderId) => proceedToPaymnet(orderId))
  .then((paymentInfo) => showOrderSummary(paymentInfo))
  .then((paymentInfo) => updateWallet(paymentInfo));

/* 
  Promise Object: It contains promiseState and promiseResult.

  {
    [[promiseState]]: "pending" | "fulfilled" | "rejected",
    [[promiseResult]]: undefined | <value> | <error>
  }

*/

/*
  Fetch(): fetch() is a promise based way to make network requests.
  
  -> It returns a promise and doesn't reject on HTTP errors(like 404).
    Only on network failures it rejects and we need to check and handle errors 
    with response.ok and response.status manually.

  -> You can handle the response in various formats like JSON, text etc.

        -> response.josn(): Converts response body in to Js object(Parse JSON).

        -> response.text(): Returns the reponse body as plain text.

  -> With fetch(), we can send requests with GET, POST etc HTTP methods, but default is GET.

  -> fetch() works with async/await to write clean and readable asynchronous code.

  -> fetch() returns a promise object and when resolved give response object.
      The response object contains body which is readable stream object.
      we can get the result data with response.josn() which is again a promise, 
      when resolved gives the result.

*/

//Ex-1:
fetch("http://api.example.com/users")
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  })
  .then((data) => console.log(data))
  .catch((error) => {
    console.error(error);
  });

//Ex-2:
const users = fetch("https://api.github.com/users");
const user = fetch("https://api.github.com/users/Sukumar1118");

user
  .then((data) => {
    return data.json();
  })
  .then((result) => {
    console.log(result);
  });

console.log(user);
