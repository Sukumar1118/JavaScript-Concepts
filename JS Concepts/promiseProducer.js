/*
    Create a Promise: 
        -> create a promise using promise constructor function.

        -> It takes function as argument with resolve and reject function parameters.

        -> You can Resolve or Reject the promise as per your choice based on the result.

        -> After catch(), remain .then() functions will execute and chain will not break.

        -> .then() fucntions after the error(or rejection) and before catch will not 
            be executed and skipped.

        -> catch() can be added for some .then() functions in the middle of 
            the chain to handle errors for that portion of functions and you can add 
            catch() at the end for remaining functions.
*/

const cart = ["books", "shoes", "t-shirts"];

// const promise = createOrder(cart);

createOrder(cart)
  .then(function (orderId) {
    console.log("Order created:", orderId);
  })
  .catch(function (err) {
    console.log(err.message);
  })
  .then(function (orderId) {
    return proceedToPayment(orderId);
  })
  .then(function (paymentinfo) {
    console.log(paymentinfo);
  })
  .catch(function (err) {
    console.log(err.message);
  });

function createOrder(cart) {
  const pr = new Promise(function (resolve, reject) {
    //validate order
    const isCartValid = false;
    //create order
    const orderId = "123456";

    if (!isCartValid) {
      const err = new Error("Cart is not valid!");
      reject(err);
    }

    if (orderId) {
      setTimeout(function () {
        resolve(orderId);
      }, 3000);
    }
  });
  return pr;
}

function proceedToPayment(orderId) {
  return new Promise(function (resolve, reject) {
    resolve("Payment Successful.");
  });
}
