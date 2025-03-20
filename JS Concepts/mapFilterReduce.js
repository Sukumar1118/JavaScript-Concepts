/*
    Array.prototype.map(): Array map method is used to create a new array by applying the
            provided function for each element of an existing array.
        -> Original array remains same and new array is created with the results.
        -> This is used mostly when we want to transform the each element of an array.
*/
//Ex: Basic usage
const numbersArr = [1, 6, 5, 3];
const double = numbersArr.map((num) => num * 2);
console.log("Double: ", double);

//Ex: Mapping to objects
const users = ["Sachin", "Dhoni", "Rohit"];
const userObj = users.map((user) => {
  return { userName: user };
});

//Ex: Using index
const numbers = [10, 20, 30];
const result1 = numbers.map((num, index, arr) => num * index);
console.log("Result with Index: ", result1);

/*
    Array.prototype.filter(): Array filter method is used to create a new array containing only
            elements of an original array that satisfies a condition.
        -> It is used to filter unwanted elements.
        -> Used to search specific elements based on some condition.    
*/
//Syntax:
// const newArr = array.filetr(callback(ele, index, arr));

//EX
const numbers1 = [10, 20, 33];
const evenNums = numbers1.filter((num) => num % 2 === 0);
console.log("Even numbers: ", evenNums); // [10, 20]

const oddNums = numbers1.filter((num) => num % 2);
console.log("Odd numbers: ", oddNums); // [33]

const users1 = [
  { name: "Alice", role: "admin" },
  { name: "Bob", role: "user" },
  { name: "Charlie", role: "admin" },
];
const result2 = users1.filter((user) => user.role === "admin");
console.log("Admins: ", result2);

/*
    Array.prototype.reduce(): Array reduce method executes the reducer function on each 
            element of an array and gives single output value.
        -> It is used to accumulate or transform data.
*/
/* Syntax:
   -------
    let result = array.reduce(
      callback(accumulator, currentValue, index, array),
      initialValue
    );
*/

//Ex: Sum of numbers
const numbers2 = [10, 20, 33];
const sum = numbers2.reduce((acc, num) => acc + num, 0);
console.log("Sum: ", sum); // 63

//Ex: Flattening an Array
const nestedArray = [[1, 2], [3, 4], [5]];
const flatArray = nestedArray.reduce((acc, arrEle) => acc.concat(arrEle), []);
console.log("FlatArray: ", flatArray); // [1, 2, 3, 4, 5]

//Ex: Counting occurrences
const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
const count = fruits.reduce((acc, ele) => {
  acc[ele] = (acc[ele] || 0) + 1;
  return acc;
}, {});
console.log("Count: ", count); // { "apple": 3, "banana": 2, "orange": 1 }

const count11 = fruits.reduce((acc, ele) => {
  if (acc[ele]) {
    acc[ele] = acc[ele] + 1;
  } else {
    acc[ele] = 1;
  }
  return acc;
}, {});
console.log("Count: ", count11);
