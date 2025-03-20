/*
    Event bubbling & capturing(aka trickling):
        These are two phases of event propagation that determine how events are handled in 
        DOM hierarchy.

    Event bubbling(Default phase):
        -> In this, event starts from target element(triggered elelment)
            and propagates upwards through the ancestor elements unntil it reaches the root element.

    Event capturing:
        -> In this, event starts from root element and propagates downwards to the
            target element.

    Event propagation flow: Capture Phase -- Target phase -- Bubbling phase
        -> Capture Phase: Event travels from root to target.
        -> Target phase: Event hits the target element where it was triggered.
        -> Bubbling phase: Event travels back from target to root element.

    Stopping Event propagation:
        -> You can stop event propagation at any point of time using "event.stopPropagation()"
            to prevent further bubbling or capturing.

*/

/*Ex: bubbling 
    When clicked on button:
    Output: myButton clicked!
            child clicked!
            parent clicked!
            grandParent clicked!
*/
document.getElementById("grandParent").addEventListener("click", function () {
  console.log("grandParent clicked!");
});

document.getElementById("parent").addEventListener("click", function () {
  console.log("parent clicked!");
});

document.getElementById("child").addEventListener("click", function () {
  console.log("child clicked!");
});

document.getElementById("myButton").addEventListener("click", function () {
  console.log("myButton clicked!");
});

/*Ex: Capturing 
    When clicked on button:
    Output: grandParent clicked!
            parent clicked!
            child clicked!
            myButton clicked!
*/
document.getElementById("grandParent").addEventListener(
  "click",
  function () {
    console.log("grandParent clicked!");
  },
  true
);

document.getElementById("parent").addEventListener(
  "click",
  function () {
    console.log("parent clicked!");
  },
  true
);

document.getElementById("child").addEventListener(
  "click",
  function () {
    console.log("child clicked!");
  },
  true
);

document.getElementById("myButton").addEventListener(
  "click",
  function () {
    console.log("myButton clicked!");
  },
  true
);

/*Ex: Capturing and bubbling mix
    When clicked on button:
    Output: grandParent clicked!
            parent clicked!
            myButton clicked!
            child clicked!
*/
document.getElementById("grandParent").addEventListener(
  "click",
  function () {
    console.log("grandParent clicked!");
  },
  true
);

document.getElementById("parent").addEventListener(
  "click",
  function () {
    console.log("parent clicked!");
  },
  true
);

document.getElementById("child").addEventListener("click", function () {
  console.log("child clicked!");
});

document.getElementById("myButton").addEventListener(
  "click",
  function () {
    console.log("myButton clicked!");
  },
  true
);

/*Ex: stop propagation : 
    -> Event propagation stops at any point of time either in bubbling or capturing.
    When clicked on button, Output: 
            myButton clicked!
            child clicked!
            parent clicked!
*/
document.getElementById("grandParent").addEventListener("click", function () {
  console.log("grandParent clicked!");
});

document.getElementById("parent").addEventListener("click", function (e) {
  console.log("parent clicked!");
  e.stopPropagation();
});

document.getElementById("child").addEventListener("click", function () {
  console.log("child clicked!");
});

document.getElementById("myButton").addEventListener("click", function () {
  console.log("myButton clicked!");
});

/*
    Event delegation:
        -> Event delegation is a technique where you attach sigle event listener to a
            parent element to handle events triggered by it's child elements.
            It leverages event bubbling concept here.

    Uses: 
        -> Reduces memory - because instead of attaching many event listeners to all childs,
            we can attach only one parent listener and handle all child events.
        -> Performance also can be improved/optimized due to less memory.
        -> Reduces the code and makes it easy to handle events.

    Limitations:
        -> Some events like mouseenter, mouseleave, focus, blur may not bubble by default,
            you can't delegate them.
        -> And stopPropagation method is used by chance in any child elements, it will not
            bubble up and event delegation will not happen.
*/

//Ex:
document.getElementById("parentList").addEventListener("click", function (e) {
  //console.log(e);
  if (e.target.tagName === "LI") {
    console.log(e.target.textContent, "clicked!");
  }
});
