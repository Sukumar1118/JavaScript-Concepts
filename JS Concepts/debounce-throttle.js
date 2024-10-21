/*
    Debounce: Debounce is technique used to limit the rate at which a function is executed.
        -> In debounce, the execution of the function is postponed for specific amount of time
            since the last time it was invoked.
        -> If the function is triggered again within that time frame, the timer resets and the function
            execution is further delayed.
        -> This is particularly useful for scenarios where a function is triggered frequently 
            but should only execute after a specific delay of inactivity, like in events such as 
            window resizing, scrolling, keypresses etc.
    Uses:
        -> It ensures that the function is not called too frequently in response to the events
            like scrolling, keypresses, resizing etc. which can be fired many times.
        -> It prevents unnecessary function calls. For example, when tracking user input in search bar
            if you want to wait until user has stopped typing before calling the function or API request,
            debouce is helpful.
*/

//Ex
let count = 0;
const getUserData = function () {
  console.log("User data fetched..", count);
  count++;
};

const searchObject = {
  searchTerm: "",
  fName: "Sukumar",
  handleSearch: function (event) {
    this.searchTerm = event.target.value;
    console.log("Updated search term:", this.searchTerm);
  },
};

const debounceFunc = function (func, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    let context = this;
    let args = arguments;
    timer = setTimeout(function () {
      func.apply(context, args);
    }, delay);
  };
};

//const debounce = debounceFunc(getUserData, 300);
const debounce = debounceFunc(searchObject.handleSearch, 300);
