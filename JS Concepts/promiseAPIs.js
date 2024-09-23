/*
    Promise APIs:
    ------------
    -> ALL Promise APIs take multiple promises as an iterable(or actually an array).

    Promise.all(): Once all promise are fulfilled, it gives all the promise results as an array.
        -> If any one of the promise is rejected, it will give an error immediately at that 
            point of timewith out waiting for other promises to be fulfilled.

    Sample1: [ 'allP1 success.', 'allP2 success.', 'allP3 success.' ].
    
    Sample2: allP1 failure.
*/

const allP1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("allP1 success."), 3000);
  //setTimeout(() => reject("allP1 failure."), 3000);
});

const allP2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("allP2 success."), 2000);
});

const allP3 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("allP3 success."), 5000);
});

const allPromises = Promise.all([allP1, allP2, allP3]);

allPromises
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

/*
    Promise.allSettled(): Once all the promises are settled(either fulfilled or rejected), 
        it gives all the results as an array of objects.

        Sample: [
                { status: 'rejected', reason: 'allSettledP1 failure.' },
                { status: 'fulfilled', value: 'allSettledP2 success.' },
                { status: 'fulfilled', value: 'allSettledP3 success.' }
            ]
*/

const allSettledP1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("allSettledP1 success."), 3000);
  //setTimeout(() => reject("allSettledP1 failure."), 3000);
});

const allSettledP2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("allSettledP2 success."), 2000);
});

const allSettledP3 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("allSettledP3 success."), 5000);
});

const allSettledPromises = Promise.allSettled([
  allSettledP1,
  allSettledP2,
  allSettledP3,
]);

allSettledPromises
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

/*
    Promise.race(): Whatever the first promise is settled(either fulfilled or rejected), 
            it gives that promise result.

    Sample1: raceP2 success.

    Sample2: raceP1 failure.
*/

const raceP1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("raceP1 success."), 3000);
  //setTimeout(() => reject("raceP1 failure."), 2000);
});

const raceP2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("raceP2 success."), 2000);
});

const raceP3 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("raceP3 success."), 5000);
});

const racePromises = Promise.race([raceP1, raceP2, raceP3]);

racePromises
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

/*
    Promise.any(): Whatever the promise is fulfilled first, it gives result of that promise.
        -> If all promises are rejected, it gives an aggregate error(an array of all promise errors).

        Sample1: anyP2 success.

        Sample2: AggregateError: All promises were rejected (console.log(err);)
                ['anyP1 failure.', 'anyP2 failure.', 'anyP3 failure.'] (console.log(err.errors);)
*/

const anyP1 = new Promise((resolve, reject) => {
  //setTimeout(() => resolve("anyP1 success."), 3000);
  setTimeout(() => reject("anyP1 failure."), 2000);
});

const anyP2 = new Promise((resolve, reject) => {
  //setTimeout(() => resolve("anyP2 success."), 2000);
  setTimeout(() => reject("anyP2 failure."), 2000);
});

const anyP3 = new Promise((resolve, reject) => {
  //setTimeout(() => resolve("anyP3 success."), 5000);
  setTimeout(() => reject("anyP3 failure."), 5000);
});

const anyPromises = Promise.any([anyP1, anyP2, anyP3]);

anyPromises
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
    console.log(err.errors);
  });

/*
    -> What if I have 3-promises and I want result of each promise immediately one by one 
      when it settled instead of waiting for all the promises to finish?
*/
const promises = [
  new Promise((resolve) => setTimeout(resolve, 2000, "First Promise")),
  new Promise((resolve) => setTimeout(resolve, 5000, "Second Promise")),
  new Promise((resolve, reject) =>
    setTimeout(reject, 10000, "Third Promise Failed")
  ),
];

async function processImmediately(promises) {
  const results = [];

  while (promises.length > 0) {
    const settledPromise = await Promise.race(
      promises.map((p, index) =>
        p
          .then((result) => ({ status: "fulfilled", result, index }))
          .catch((error) => ({ status: "rejected", error, index }))
      )
    );

    // Handle the result of the first settled promise
    if (settledPromise.status === "fulfilled") {
      console.log(
        `Promise ${settledPromise.index + 1} resolved with: ${
          settledPromise.result
        }`
      );
    } else {
      console.log(
        `Promise ${settledPromise.index + 1} rejected with: ${
          settledPromise.error
        }`
      );
    }

    // Remove the settled promise from the array
    promises.splice(settledPromise.index, 1);
  }
}

processImmediately(promises);
