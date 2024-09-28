/*
    Refer Images: JS Concepts\assets\images\JsEngine_1.PNG
                  JS Concepts\assets\images\V8Engine.PNG
                  JS Concepts\assets\images\eventLoopsDesign.PNG

    JS Runtime Environment: The environment which provides all the necessary components to run the
                Javascript code.
        Components includes:
        -> JS Engine
        -> Call Stack & Menory Heap(Part of JS Engine)
        -> Web APIs
        -> Callback Queue
        -> Microtask Queue
        -> Event Loop
    
    Ex: Browser runtime, Node.js(server-side) runtime etc.

    JS Engine: JS Engine is a program and the core component of JS runtime environment which executes
            javascript code and converts into machine code.
            -> JS Engine is piece of code(like any other software).
                It's not an hardware machine(something else like that).
    
    Ex: V8 engine             - developed by Google    - used in Google chrome, Node.js etc.
        SpiderMonkey          - developed by Mozilla   - used in Firefox browser.
        JavaScriptCore(Nitro) - developed by Apple     - used in Safari browser.
        Chakra(Now V8 engine) - developed by Microsoft - used in Microsoft Edge browser.
     
    -> First JS Engine - SpiderMonkey - developed by Brendan Eich(in 1995) - for Netscape navigator browser.
    -> Brendan Eich: created JS programming language - cofounded Mozilla - later Brave software(browser).

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

        -> Browser exposes all Web APIS in global object(window). JS running in browser can
            access all web APIs directly through window object.
    
    Callback queue(Task queue aka Message queue): All the callback functions from async operations 
            like setTimeout, event listeners are moved to the callback queue.

    Microtask queue: All the promise callbacks and Mutation Observer callbacks are moved to 
            the microtask queue.

    Event loop: Event loop is continuously checking call stack and callbcak queue, when the call stack 
            is empty it pick the first task from callback queue(or microtask queue which has higher priority)
            and pushes it to the call stack for execution.

    Priority: Microtask queue has high priority than callback queue. Once all the CBs in mirotask
        queue are completed then only callback queue CBs are moved to call stack and executed.

    Starvation: If Microtask queue has many number of tasks and callback queue is waiting for long time
            to get chance for execution, then it is called starvation.

    Mutation Observers: Mutation observer is an API used for monitoring the changes in the DOM 
            (Document Object Model) and respond with callback function when certain types of modifications 
            occur like adding or removing nodes, changing attributes, or modifying text content etc.
            -> It is an async operation and should be handled by developer manually.

    I/O Operations: I/O Operations are task that involves communication to external resources like
            network requests, timers, read/write files, user inputs lile keyboard and mosue events etc.
            These are async in nature and doesn't block execution of code in main therad and instead
            uses callbacks, promises etc to handle th result when I/O operation completes.
        
*/

/*
    JS Engine: JS Code -> Parsing -> Compilation -> Execution -> Garbage collecttion

        JS Code: The raw JS code written by developers.

        Parsing: (Preparser + Full Parser in V8 Engine)
            -> In this phase JS code is parsed and generates a "token stream" which is
                further converted in to Abstract Syntax Tree(AST) which is tree-like form.

                Ex: https://astexplorer.net/ - to check about AST samples.

        Compilation: (Ignition interpreter & TurboFan compiler JIT compiler in V8 Engine)
            -> In this phase, Interpreter converts the AST to Byte code.
            -> Profiler: Profiler monitors the code for "hot"(frequently used code)
                areas/paths.
            -> JIT compiler(Just-In-Time compilation): JIT compiler compiles these portions of 
                code into optimized machine code for faster execution.

            -> (In V8 engine): It uses optimization techniques like Inline caching, Hidden classes, 
                type specialization, De-optimization etc.
                
        Execution: In this phase, byte code or optimized machine code is executed.
            -> Byte code(platform independent) is executed by the JS engine interpreter.
            -> Machine code(platform specific and low-level code) is directly executed by CPU.

        Garbage collection: GC automatically manages memory and frees up the memory that is 
                no longer needed(For ex, if any objects are no longer refrenced).

                -> (In V8 engine) : It uses technique like "Mark-and-sweep"& "Generational garbage collection"
                    algorithms to reclaim memory.

    Steps Overview for JS Engine:
    ----------------------------
                    JavaScript Source Code
                    ⬇️
                    Parser (Lexer + AST Generation)
                    ⬇️
                    Bytecode Generation by the Interpreter
                    ⬇️
                    Profiler identifies "hot" code paths
                    ⬇️
                    JIT Compiler converts hot bytecode into optimized machine code
                    ⬇️
                    Execution of machine code
                    ⬇️
                    Garbage Collector manages memory



    V8 Engine(Chrome):
    -----------------
                +--------------------------+   +------------------------+
                |   JavaScript Source Code  | → |      Parser (AST)       |
                +--------------------------+   +------------------------+
                                                        |
                                                        v
                                        +-----------------------------+
                                        |     Ignition (Interpreter)   |
                                        |    Bytecode Generation       |
                                        +-----------------------------+
                                                        |
                                                        v
                    +-----------------------------------------------------------+
                    |                          Profiler                         |
                    |    (Identifies Hot Paths for Optimization)                |
                    +-----------------------------------------------------------+
                                                        |
                                                        v
                                +-----------------------------------+
                                |     TurboFan (JIT Compiler)       |
                                | Optimized Machine Code Generation |
                                +-----------------------------------+
                                                        |
                                                        v
                                        +-----------------------------+
                                        |    Machine Code Execution    |
                                        +-----------------------------+
                                                        |
                                                        v
                                        +-----------------------------+
                                        |   Garbage Collector (GC)     |
                                        |  (Automatic Memory Management)|
                                        +-----------------------------+
                                                        |
                                                        v
                                +---------------------------------------+
                                | Deoptimization (Fallback to Bytecode) |
                                +---------------------------------------+
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

