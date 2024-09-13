function getName() {
  var x = 77;
  getAddress();
  function getAddress() {
    console.log(x);
  }
}

getName();
console.log(x);
