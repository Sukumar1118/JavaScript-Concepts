## Link


Debouncing and throttling are two of the most commonly asked JavaScript interview topics because they solve a very common problem:

> **A browser can fire some events hundreds of times per second.**
>
> If your function runs every time, your application becomes slow.

Examples:

* User types in a search box (`input`)
* User scrolls a page (`scroll`)
* User resizes browser (`resize`)
* User moves mouse (`mousemove`)
* Window continuously fires events

Without controlling these events, your code may execute **100-500 times every second**, causing:

* unnecessary API calls
* UI lag
* battery drain
* high CPU usage
* poor user experience

This is exactly why **debounce** and **throttle** were introduced.

---

# Before understanding debounce/throttle

Suppose:

```js
window.addEventListener("scroll", () => {
    console.log("scroll");
});
```

If you scroll for just 2 seconds,

this may print

```
scroll
scroll
scroll
scroll
scroll
scroll
scroll
scroll
...
```

Possibly **200+ times**.

Imagine instead of console.log you do

```js
fetch("/products");
```

Now you've sent hundreds of API requests.

Not good.

Need a way to limit execution.

---

# Two solutions

There are two different requirements.

## Requirement 1

> Wait until user finishes.

Example

Search box

```
A
Ap
App
Appl
Apple
```

Should API run 5 times?

No.

Only once after user stops typing.

This is **Debounce.**

---

## Requirement 2

User scrolls continuously.

Should scroll handler execute 500 times?

No.

But should it execute only once after scrolling stops?

Also no.

We need updates while scrolling.

Maybe once every 200ms.

This is **Throttle.**

---

# Easy Definition

## Debounce

> Execute only after events stop for a specified time.

---

## Throttle

> Execute at most once every specified interval.

---

# Visual Timeline

User typing

```
A----p----p----l----e
```

Every keypress is 100ms apart.

Debounce (500ms)

```
keypress keypress keypress keypress keypress

(wait)

500ms

↓

API Call
```

Only one execution.

---

Throttle (500ms)

```
keypress keypress keypress keypress keypress

↓

Exec

(wait 500ms)

↓

Exec

(wait 500ms)

↓

Exec
```

Runs periodically.

---

# Real-world analogy

Imagine ringing a doorbell.

## Debounce

Every time someone presses,

timer restarts.

```
ding
ding
ding
ding
ding

(wait)

Door opens once
```

---

Throttle

Guard opens door every 5 minutes.

Even if 100 people ring,

door opens only once every 5 minutes.

---

# Debounce Example

Search Box

```html
<input id="search">
```

Without debounce

```js
search.addEventListener("input", (e) => {
    searchAPI(e.target.value);
});
```

Typing

```
Apple
```

makes

```
A
Ap
App
Appl
Apple
```

Five API calls.

---

With debounce

```js
function debounce(fn, delay) {

    let timer;

    return function (...args) {

        clearTimeout(timer);

        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);

    };

}
```

Usage

```js
const debouncedSearch = debounce(searchAPI, 500);

search.addEventListener("input", (e) => {
    debouncedSearch(e.target.value);
});
```

Now

Typing

```
Apple
```

results in

```
(wait 500ms)

searchAPI("Apple")
```

Only once.

---

# Step-by-step execution

Suppose

```js
const fn = debounce(searchAPI,500);
```

Inside debounce

```
timer = undefined
```

Returns new function.

---

User types

```
A
```

Calls

```
clearTimeout(undefined)
```

Nothing happens.

Creates timer1.

```
timer -> timer1
```

---

100ms later

```
Ap
```

Runs

```
clearTimeout(timer1)
```

timer1 removed.

Creates timer2.

```
timer -> timer2
```

---

Next key

```
App
```

timer2 cancelled

Creates timer3

---

Finally user stops typing

No more cancellation.

After 500ms

```
timer3 executes

↓

searchAPI("Apple")
```

---

# Why closure?

Notice

```js
let timer;
```

After debounce finishes,

how is timer remembered?

Because returned function closes over

```
timer
```

This is a perfect closure interview example.

---

# Throttle Example

Implementation

```js
function throttle(fn, delay) {

    let lastCall = 0;

    return function (...args) {

        const now = Date.now();

        if (now - lastCall >= delay) {

            lastCall = now;

            fn.apply(this, args);

        }

    };

}
```

Usage

```js
window.addEventListener(
    "scroll",
    throttle(updateNavbar, 200)
);
```

Now

Even if scroll fires

```
500 times
```

updateNavbar runs only every

```
200ms
```

---

# Timeline

Suppose

Delay

```
500ms
```

Events

```
0
100
200
300
400
500
600
700
800
```

Throttle executes

```
0

500

1000
```

Everything else ignored.

---

# Comparison

| Debounce                | Throttle              |
| ----------------------- | --------------------- |
| Waits until events stop | Executes continuously |
| Good for typing         | Good for scrolling    |
| Timer resets            | Timer doesn't reset   |
| Final value             | Intermediate updates  |

---

# Use Cases

## Debounce

Search autocomplete

```
Amazon Search
Google Search
YouTube Search
```

---

Window resize

```
User drags window

↓

After resize ends

↓

Recalculate layout
```

---

Form validation

Don't validate after every key.

Wait until user stops typing.

---

Autosave

Wait until typing stops.

---

# Throttle Use Cases

Infinite scrolling

```
scroll

↓

Load more items
```

---

Mouse movement

```
mousemove

↓

Update coordinates
```

---

Games

Limit rendering calculations.

---

Window scrolling

Sticky navbar

Parallax effects

---

Button click prevention

Allow one click every second.

---

# Internal Difference

Debounce

```
Event

↓

clearTimeout()

↓

setTimeout()
```

Every event restarts timer.

---

Throttle

```
Event

↓

Check time

↓

Enough time?

↓

Yes → Execute

No → Ignore
```

---

# Developer Confusions

## Confusion 1

Both reduce calls.

Yes.

But differently.

Debounce

```
Typing

ABCDE

↓

1 API call
```

Throttle

```
Typing

ABCDE

↓

Many calls

But limited.
```

---

## Confusion 2

Which one for search?

Debounce.

You care only about final text.

---

## Confusion 3

Which one for scroll?

Throttle.

User expects updates while scrolling.

---

## Confusion 4

Why not always debounce?

Imagine scroll.

Debounce means

```
Nothing happens

until scrolling stops.
```

Sticky navbar would lag.

---

## Confusion 5

Why not always throttle?

Search

```
A

Ap

App
```

Throttle still sends multiple API requests.

Wasteful.

---

## Confusion 6

Why use `clearTimeout()`?

Without it

```js
setTimeout(...500)
```

every keypress creates another timer.

All timers execute.

Not a debounce anymore.

---

## Confusion 7

Why `apply(this, args)`?

Instead of

```js
fn(args)
```

Because

* preserves `this`
* forwards all arguments

Example

```js
obj.search = debounce(obj.search,500);
```

Without `apply`

```
this === undefined
```

inside `search()`.

---

## Confusion 8

Why is timer outside returned function?

```js
let timer;
```

So every invocation shares the same timer.

If inside

```js
return function(){

   let timer;
}
```

Every call gets a new timer.

Nothing gets cancelled.

Debounce fails.

---

# Leading vs Trailing

Most implementations execute after delay.

Called **Trailing Edge**

```
Typing

↓

(wait)

↓

Execute
```

---

Leading Edge

Execute immediately.

Ignore rest.

```
First key

↓

Execute

↓

Ignore
```

Libraries like Lodash support both leading and trailing execution.

---

# Time Complexity

Both

```
O(1)
```

Space

```
O(1)
```

---

# Common Interview Questions

### 1. Explain debounce and throttle without definitions.

Answer using the search box and scroll examples. Interviewers often prefer real-world scenarios over memorized definitions.

---

### 2. Why does debounce require a closure?

Because the `timer` variable must persist across multiple invocations of the returned function so it can cancel the previous timeout before scheduling a new one.

---

### 3. Why is `clearTimeout()` necessary?

It cancels the previously scheduled execution. Without it, every call schedules a new timeout, so the function runs multiple times instead of only once after inactivity.

---

### 4. Can debounce be implemented without `setTimeout()`?

A traditional debounce relies on delaying execution, so `setTimeout()` (or an equivalent scheduling mechanism) is fundamental to its behavior.

---

### 5. Can throttle be implemented using `setTimeout()` instead of `Date.now()`?

Yes. There are two common approaches:

* **Timestamp-based throttle** (using `Date.now()`) executes immediately and then enforces a minimum interval.
* **Timer-based throttle** (using `setTimeout()`) schedules execution after the interval if one isn't already pending.

Each has slightly different leading/trailing behavior.

---

### 6. Why are debounce and throttle higher-order functions?

Because they take another function (`fn`) as input and return a new function with additional behavior (rate limiting).

---

### 7. What happens if you write:

```js
button.onclick = debounce(save(), 500);
```

`save()` executes immediately, and its return value is passed to `debounce`. The correct usage is:

```js
button.onclick = debounce(save, 500);
```

---

### 8. Does debounce create a new closure for every event?

No. A new closure is created **once** when you call `debounce(...)`:

```js
const debounced = debounce(fn, 500);
```

Every later event calls the **same returned function**, which shares the same closed-over `timer` variable.

---

### 9. Can multiple debounced functions interfere with each other?

No, if each is created separately:

```js
const searchDebounced = debounce(search, 500);
const saveDebounced = debounce(save, 500);
```

Each invocation of `debounce()` creates its own closure with its own independent `timer`.

---

### 10. Why does `debounce(fn, 500)` itself not delay execution?

Calling `debounce(fn, 500)` only **creates and returns** a wrapped function. The delay occurs later, when that returned function is actually invoked by an event or your code.

---

## Mental Model

Remember these two questions:

* **Do I care only about the user's final action?** → Use **Debounce**.

  * Search suggestions
  * Autosave
  * Form validation
  * Window resize

* **Do I need regular updates while the action continues?** → Use **Throttle**.

  * Scroll progress
  * Infinite scrolling
  * Mouse movement
  * Sticky headers

If you can clearly explain *why* one fits a scenario better than the other, along with how closures preserve the timer state, you'll be well prepared for most debounce/throttle interview questions.

