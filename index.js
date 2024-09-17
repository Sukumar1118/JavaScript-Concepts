// function getName() {
//   var x = 77;
//   getAddress();
//   function getAddress() {
//     console.log(x);
//   }
// }

// getName();
// console.log(x);

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
