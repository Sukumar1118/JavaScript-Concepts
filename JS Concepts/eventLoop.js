/*
    Refer Image: JS Concepts\assets\images\eventLoopsDesign.PNG

    Call stack: Call stack is a mechanism which is used to keep track of function calls.
        -> When ever a function is invoked(or called), it is added to the 
            top of the call stack.
        -> If a function calls another function, the second function is added to the top 
            of the stack and so on.
        -> Initially, GEC(Global Execution Context) is placed in the call stack.
        -> Once a function compltes the execution, it is removed or popped off from the 
            call stack and returns to the previous function.
        -> call stack handles only synchronous operations.
        -> Asynchronous operations are not directly placed in call stack. Instead, they are
            placed in callback queue and are handled by the event loop once stack is cleared.

    Web APIs: Web APIs provide a way to interact with browser and allows to perform complex
            operations that are not part of core Java script language.
        -> setTimeOut()
        -> fetch()
        -> console
        -> DOM APIs
        -> localStorage
        -> location
           etc...

        -> Browser exposes all Web APIS in global object(window).JS running in browser can
            access all web APIs directly through window object.
    
    Callback queue(Task queue aka Message queue): All the callback functions from async operations like setTimeout,
            event listeners are moved to the callback queue.

    Microtask queue: All the promise callbacks and MutationObserver callbacks are moved to 
            the microtask queue.

    Priority: Microtask queue has high priority than callback queue. Once all the CBs in mirotask
            queue are completed then only callback queue CBs are moved to call stack and executed.

    Event loop: Event loop is continuously checking call stack and callbcak queue, when the call stack 
            is empty it pick the first task from callback queue(or microtask queue which has higher priority)
            and pushes it to the call stack for execution.

    Starvation: If Microtask queue has many number of tasks and callback queue is waiting for long time
            to get chance for execution, then it is called starvation.
        
*/

/*
    Visualizing the Stack:
        Stack state at the beginning: [ ]
        After calling firstFunction(): [ firstFunction ]
        After calling secondFunction(): [ firstFunction, secondFunction ]
        After calling thirdFunction(): [ firstFunction, secondFunction, thirdFunction ]
        After thirdFunction finishes: [ firstFunction, secondFunction ]
        After secondFunction finishes: [ firstFunction ]
        After firstFunction finishes: [ ]
*/