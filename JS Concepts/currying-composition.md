## Link
https://chatgpt.com/s/t_6a6f128152f081918e8a3bf939f768fb


# JavaScript Currying & Function Composition — Complete Summary

---

# 1. Why were Currying and Composition introduced?

Both come from **Functional Programming (FP)** and aim to make code:

* More reusable
* More modular
* Easier to read
* Easier to test
* Easier to compose into pipelines

They solve different problems:

| Currying                                    | Composition                          |
| ------------------------------------------- | ------------------------------------ |
| Breaks one function into multiple functions | Combines multiple functions into one |
| Deals with arguments                        | Deals with functions                 |
| Helps reuse configured functions            | Helps build processing pipelines     |

---

# 2. Function Currying

## Definition

Transforms

```js
f(a, b, c)
```

into

```js
f(a)(b)(c)
```

Each function accepts one argument and returns another function until all required arguments are collected.

---

## Normal Function

```js
function add(a, b) {
    return a + b;
}

add(2, 3);
```

---

## Curried Function

```js
function add(a) {
    return function (b) {
        return a + b;
    };
}

add(2)(3);
```

Output

```text
5
```

---

# 3. How Currying Works

Calling

```js
add(2)
```

returns

```js
function(b){
    return 2 + b;
}
```

The returned function remembers

```text
a = 2
```

through a **closure**.

Later

```js
(3)
```

returns

```text
5
```

---

# 4. Every Curried Function Uses Closures

The returned function keeps access to variables of the outer function.

```js
function multiply(a){
    return function(b){
        return a*b;
    }
}
```

The inner function remembers `a`.

---

# 5. Three Argument Example

```js
function multiply(a){
    return function(b){
        return function(c){
            return a*b*c;
        }
    }
}

multiply(2)(3)(4);
```

---

# 6. Why Currying?

Often some arguments remain constant.

Example

Instead of

```js
calculateTax(price,18);
calculateTax(price2,18);
calculateTax(price3,18);
```

Use

```js
function calculateTax(rate){

    return function(price){
        return price + price*rate/100;
    }

}

const gst18 = calculateTax(18);

gst18(1000);

gst18(500);
```

Configured once.

Reused many times.

---

# 7. Partial Application

Currying naturally supports partial application.

```js
const gst18 = calculateTax(18);
```

Creates a reusable function.

---

# 8. Real World Currying Examples

### Logger

```js
const info = log("INFO");

info("Started");
```

---

### React Event Handler

```js
const handleDelete =
id =>
event => {

}
```

Usage

```jsx
<button onClick={handleDelete(5)}>
```

---

# 9. Generic Curry Implementation

```js
function curry(fn){

    return function curried(...args){

        if(args.length >= fn.length){
            return fn(...args);
        }

        return function(...next){
            return curried(...args,...next);
        };

    };

}
```

Supports

```js
curriedAdd(1)(2)(3);

curriedAdd(1,2)(3);

curriedAdd(1)(2,3);

curriedAdd(1,2,3);
```

---

# 10. Why fn.length?

```js
function add(a,b,c){}
```

```js
add.length
```

returns

```text
3
```

Meaning

Original function expects three parameters.

---

# 11. Partial Application vs Currying

Partial Application

```js
const addFive = add.bind(null,5);
```

Remaining arguments can still be multiple.

Currying

```js
add(5)(2)(3);
```

Always returns another function until all arguments are supplied.

---

# 12. Advantages of Currying

* Reusable configured functions
* Partial application
* Functional programming
* Better event handlers
* Cleaner React callbacks
* Cleaner middleware

---

# 13. Drawbacks

* More nested functions
* Harder debugging
* Slight function call overhead

---

# 14. Function Composition

Composition combines multiple functions into one function.

Instead of

```js
capitalize(
    lower(
        trim(str)
    )
);
```

Create one reusable function.

---

# 15. Compose Order

Composition means

```text
compose(f,g,h)

↓

f(g(h(x)))
```

Execution starts from the **rightmost function**.

---

# 16. Generic compose()

```js
function compose(...functions){

    return function(value){

        return functions.reduceRight(

            (acc,fn)=>fn(acc),

            value

        );

    };

}
```

---

# 17. Example

Functions

```js
const trim = str => str.trim();

const lower = str => str.toLowerCase();

const capitalize =
str =>
str.charAt(0).toUpperCase() +
str.slice(1);
```

Create composed function

```js
const clean =
compose(
capitalize,
lower,
trim
);
```

Use

```js
clean(" HELLO ");
```

Returns

```text
Hello
```

---

# 18. What compose() Does Internally

Calling

```js
compose(
capitalize,
lower,
trim
)
```

Rest parameter collects

```js
functions =

[
capitalize,
lower,
trim
]
```

compose() returns

```js
function(value){

}
```

The returned function forms a **closure** and remembers

```js
[
capitalize,
lower,
trim
]
```

---

# 19. Calling clean()

```js
clean(" HELLO ");
```

becomes

```js
functions.reduceRight(

(acc,fn)=>fn(acc),

" HELLO "

);
```

---

# 20. reduceRight() Execution

Initial accumulator

```text
" HELLO "
```

---

Iteration 1

```text
trim
```

returns

```text
"HELLO"
```

Accumulator

```text
"HELLO"
```

---

Iteration 2

```text
lower
```

returns

```text
"hello"
```

Accumulator

```text
"hello"
```

---

Iteration 3

```text
capitalize
```

returns

```text
"Hello"
```

Accumulator

```text
"Hello"
```

Final result

```text
Hello
```

---

# 21. Visual Flow

```text
Input

" HELLO "

↓

trim

↓

"HELLO"

↓

lower

↓

"hello"

↓

capitalize

↓

"Hello"
```

---

# 22. Why reduceRight()?

Because composition is

```text
f(g(h(x)))
```

Execution order

```text
h

↓

g

↓

f
```

Right to Left.

---

# 23. Callback Explanation

Callback

```js
(acc,fn)=>fn(acc)
```

means

Take the current accumulator.

Pass it into the current function.

Return the result.

Equivalent to

```js
function(acc,fn){

    return fn(acc);

}
```

or

```js
(acc,fn)=>{

    const result = fn(acc);

    return result;

}
```

---

# 24. Why Pass value as Initial Accumulator?

```js
reduceRight(callback,value)
```

Initial accumulator becomes

```text
" HELLO "
```

Without it

JavaScript would use

```text
trim
```

(the last array element)

as the accumulator.

Then

```js
lower(trim)
```

would execute.

Wrong because

`trim` is a function, not a string.

Providing

```js
value
```

avoids this problem.

---

# 25. compose() Ultimately Builds

```js
compose(
capitalize,
lower,
trim
)(" HELLO ");
```

is equivalent to

```js
capitalize(
    lower(
        trim(" HELLO ")
    )
);
```

---

# 26. Pipe

Pipe is opposite of compose.

Compose

```text
Right

↓

Left
```

Pipe

```text
Left

↓

Right
```

Implementation

```js
function pipe(...functions){

    return function(value){

        return functions.reduce(

            (acc,fn)=>fn(acc),

            value

        );

    };

}
```

Usage

```js
pipe(
trim,
lower,
capitalize
)(" HELLO ");
```

---

# 27. Composition in Real World

### React

```text
<App>

↓

Layout

↓

Navbar

↓

Button
```

---

### Promise Chains

```js
fetch()

.then(parse)

.then(validate)

.then(save)
```

---

### Express Middleware

```text
authenticate

↓

authorize

↓

controller
```

---

### Array Methods

```js
array

.filter()

.map()

.sort()

.reduce()
```

Each step transforms data for the next.

---

# 28. Currying + Composition Together

```js
const multiply =
a =>
b =>
a*b;

const double = multiply(2);

const increment =
x =>
x+1;

const process =
pipe(
double,
increment
);

process(5);
```

Execution

```text
5

↓

double

↓

10

↓

increment

↓

11
```

---

# 29. Tricky Interview Questions Covered

* What is currying?
* What is function composition?
* Why were they introduced?
* How do closures enable currying?
* Does currying improve performance?
* Difference between currying and closures?
* Difference between currying and partial application?
* Why use `fn.length` in generic curry?
* Why `reduceRight()` for compose?
* Difference between compose and pipe?
* Can arrow functions be curried?
* Can async functions be composed?
* Is method chaining the same as composition?
* Why pass the initial accumulator to `reduceRight()`?
* What happens if the initial accumulator is omitted?
* How does `compose()` create and use a closure?

---

# Key Takeaways

* **Currying** transforms a function that takes multiple arguments into a sequence of single-argument functions. It relies on **closures** to remember previously supplied arguments and is useful for partial application and reusable, preconfigured functions.
* **Function Composition** combines multiple small functions into one pipeline. `compose()` executes **right-to-left** using `reduceRight()`, while `pipe()` executes **left-to-right** using `reduce()`.
* The `compose()` implementation does **not** execute functions when it is created. It returns a new function that **closes over** the array of functions. Only when that returned function is called with a value does `reduceRight()` execute each function in sequence, passing each result as the input (accumulator) to the next.
