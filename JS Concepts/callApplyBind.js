/* 
    call(): call method calls the function with a given 'this' context/value and arguments are 
            provided individually.

    Use case: call method is used to invoke a function when you want to 
            specify the 'this' value explicitly. 
        -> Like when you are dealing with functions of one object and 
            you want to use them with another object or to use with multiple objects.
        -> Like you want to borrow a fuction from another object and use it with another object.
*/

const user1 = {
  firstName: "sukumar",
  lastName: "reddy",
  fullName: function (city, country) {
    return (
      this.firstName + " " + this.lastName + " from " + city + "," + country
    );
  },
};
console.log(user1.fullName("Andhra", "India")); //sukumar reddy from Andhra,India
console.log(user1.fullName.call(user1, "bangalore", "India")); //sukumar reddy from bangalore,India

const user2 = {
  firstName: "sachin",
  lastName: "Tendulkar",
};
console.log(user1.fullName.call(user2, "mumbai", "India")); //sachin Tendulkar from mumbai,India

/*
    apply(): apply method is same like call method only, it's just that
             the arguments are passed in array.

    Use Case: It is used to invoke funcions when you want to pass arguments as an array.
*/

const user3 = {
  firstName: "MS",
  lastName: "DHONI",
};
console.log(user1.fullName.apply(user3, ["Jharkand", "India"])); //MS DHONI from Jharkand,India

/*
    bind(): bind method returns a new function where the 'this' value is permanently set to the
        first argument passed to the bind function.

        -> Arguments can be passed while binding the function or again
            while invoking the function later.
        -> bind dosen't invoke immediately like call and apply.
        -> It creates a new function with the provided context.
        -> bind only works once, if we bind function multiple times, 
           it take the first bind 'this' value.

    Use Case: It is used, when you want to create a function with fixed this context.
*/

const user4 = {
  firstName: "Rohit",
  lastName: "Sharma",
};
const fullName = user1.fullName.bind(user4);
console.log(fullName("mumbai", "India")); //Rohit Sharma from mumbai,India

// We can preset/fix some arguments in bind function.
const fullName1 = user1.fullName.bind(user4, "Mumbai");
console.log(fullName1("India")); //Rohit Sharma from mumbai,India

/* 
    Polyfill for bind.
    SRC: https://www.javascripttutorial.net/javascript-bind/
*/
let user5 = {
  firstName: "Narendra",
  lastName: "Modi",
};

let printName = function (city, country) {
  return this.firstName + " " + this.lastName + " " + city + ", " + country;
};

Function.prototype.myBind = function (context, ...args) {
  let originalFunc = this;
  return function () {
    return originalFunc.apply(context, [...args, ...arguments]);
  };
};

const printDetails = printName.myBind(user5, "Gujarat");
console.log(printDetails("India")); //Narendra Modi Gujarat, India
