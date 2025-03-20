/* 
    Exception: Exception is an any abnormal situation or unexpected condition during the 
        execution of the program.

    Error: Error is an object with a specific type of problem in JS and it's a common form of exception.
        Errors are thown by JS engine or manually by the developer to indicate something went wrong in the program.

    -> Exceptions can throw(or includes) not only errors but also strings, numbers, custom values etc 
        for any other anomalies(unexpected behaviours).

    -> Exceptions and Errors are thrown to signal any problem in the code using throw statement.

    -> Exceptions and errors are handled using try...catch mechanism.
*/    

//Ex: erros thrown by JS engine.
try {
  console.log(x);
} catch (e) {
  console.log(e.message); // ReferenceError: x is not defined
  console.log(e.name);
  console.log(e.stack);
}

//Ex: errors thrown by developer/ user defined errors
try {
  const age = 16;
  if (age < 18) {
    throw new Error("Age should be greater than 18.");
  }
} catch (e) {
  console.log(e.message);
  console.log(e.name);
  console.log(e.stack);
}

//Ex: Exceptions thrown other than errors like strings etc.
try {
  const num = -2;
  if (num < 0) {
    throw "Number can't be nagtive";
  }
} catch (e) {
  console.log(e.message);
  console.log(e.name);
  console.log(e);
}

/*
      Types of erros in-built: -> Error: General errors
  
                               -> SyntaxError: any mistake in syntax.
  
                               -> ReferenceError: any non-existent variable is referred.
  
                               -> TypeError: any value is not of the expected type.
                                  
                                  etc...
  
      -> In JS "Error" is an object when instantiated and constructor function when invoked.
  */

//Ex: Error as constructor function.
const myError = new Error("Func: Something went wrong!");
console.log(myError);
console.log(myError.message);
console.log(myError.name);

//Ex: Error as an object.
const myErrorObj = Error("Obj: Something went wrong!");
console.log(myErrorObj);
console.log(myErrorObj.message);
console.log(myErrorObj.name);

/*
      throw: throw statement is used to explicitly(or manually) thow an user-defined exception.
  
      -> When Execution of the current function is stopped and control goes to the nearest(or first) 
          catch block or it propagates up the call stack until it is handled.
  
      -> If no catch block found among caller functions, and if it reaches the global scope 
          without being hadled the program will terminate.
  
      -> The statements after throw won't be executed.
  
      -> The "finally" block is executed reardless fo the eroor is thrown or not.
  
      -> The code after the try..catch block and code inside catch block will be executed if the error 
          is handled properly.
  
      -> If the error is handled in global scope: (Not guarenteed the below lines may be dependent on the 
          browser and environments: In chrome it's not executed and the program terminates in both cases
          after error is thrown)
  
          -> If it returns true, then the execution will continue from the next step in that 
              function(may oy may not be it depends).
  
          -> Otherwise, that function will not execute the remaining code inside the function 
              and will continue the execution of the code after that function(may oy may not be it depends).
      
      -> Only the finally block runs(or executes) if an Error is not handled properly.
  */

//Ex: For try..catch and finally blocks
try {
  throw new Error("An error occurred");
} catch (e) {
  console.log(e.message);
} finally {
  console.log("This will run always");
}

//Ex: For try..catch and execution of code at particular points.
try {
  throw new Error("An error occurred!!!");
  console.log("This line will not be executed.");
} catch (e) {
  console.log(e.message);
  console.log("This line will be executed.");
}
console.log("This line also will be executed.");

//Ex: For error is handled in global scope using onerror event
onerror = function (message) {
  console.log("Global Error handler: ", message);
  return true;
};

function handlingErrorInGlobalScope() {
  console.log("Before Error...");
  throw new Error("An error occurred in the function");
  console.log("After Error...");
}

handlingErrorInGlobalScope();
console.log("After Function...");
