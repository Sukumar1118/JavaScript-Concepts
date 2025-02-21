### **Rest (`...`) vs. Spread (`...`) Operators in JavaScript**

Both the **rest** and **spread** operators use the `...` syntax in JavaScript, 
but they serve **different purposes**:  

- **Spread (`...`)** is used to **expand** elements (arrays, objects, or function arguments).  
- **Rest (`...`)** is used to **collect** multiple elements into an array.  

## **1. Spread Operator (`...`) – Expands Elements**
The **spread operator** takes an iterable (like an array or object) and **expands** its elements.  

### **🔹 Spread in Arrays**

#### **Expanding an Array**
```javascript
const numbers = [1, 2, 3];
console.log(...numbers); // Output: 1 2 3
```
- `...numbers` expands `[1, 2, 3]` into individual elements (`1, 2, 3`).


#### **Copying an Array**
```javascript
const original = [10, 20, 30];
const copy = [...original];

console.log(copy); // Output: [10, 20, 30]
console.log(copy === original); // Output: false (different references)
```
- Creates a **shallow copy** of an array.


#### **Merging Arrays**
```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];
const merged = [...arr1, ...arr2];

console.log(merged); // Output: [1, 2, 3, 4]
```
- Combines multiple arrays into one.
------------------------------------------------

### **🔹 Spread in Objects**
#### **Copying an Object**
```javascript
const person = { name: "Alice", age: 25 };
const copiedPerson = { ...person };

console.log(copiedPerson); // Output: { name: "Alice", age: 25 }
console.log(copiedPerson === person); // Output: false (different references)
```
- Creates a **shallow copy** of an object.

#### **Merging Objects**
```javascript
const user = { name: "Bob", age: 30 };
const extraInfo = { country: "USA", age: 35 };

const updatedUser = { ...user, ...extraInfo };
console.log(updatedUser); // Output: { name: "Bob", age: 35, country: "USA" }
```
- **Key Collision**: `age: 35` (from `extraInfo`) overwrites `age: 30` (from `user`).

---

### **🔹 Spread in Function Arguments**
```javascript
function sum(a, b, c) {
    return a + b + c;
}

const numbers = [1, 2, 3];
console.log(sum(...numbers)); // Output: 6
```
- Expands `numbers` array into individual arguments (`sum(1, 2, 3)`).

---

## **2. Rest Operator (`...`) – Collects Elements**
The **rest operator** does the opposite of the spread operator. It **collects multiple values into a single array**.

### **🔹 Rest in Function Parameters**
```javascript
function add(first, ...rest) {
    console.log(first); // Output: 1
    console.log(rest);  // Output: [2, 3, 4]
}

add(1, 2, 3, 4);
```
- `first` gets the first argument (`1`).
- `...rest` collects the remaining arguments (`[2, 3, 4]`).

---

### **🔹 Rest in Array Destructuring**
```javascript
const [first, second, ...remaining] = [10, 20, 30, 40, 50];

console.log(first);      // Output: 10
console.log(second);     // Output: 20
console.log(remaining);  // Output: [30, 40, 50]
```
- `first` and `second` take the first two elements.
- `...remaining` collects the rest into an array `[30, 40, 50]`.

---

### **🔹 Rest in Object Destructuring**
```javascript
const user = { name: "John", age: 25, country: "USA", profession: "Engineer" };

const { name, age, ...details } = user;

console.log(name);   // Output: John
console.log(age);    // Output: 25
console.log(details); // Output: { country: "USA", profession: "Engineer" }
```
- `name` and `age` are extracted.
- `...details` collects the remaining properties into an object.

---

## **3. Key Differences Between Rest and Spread**
| Feature           | **Spread (`...`)** | **Rest (`...`)** |
|------------------|------------------|-----------------|
| **Purpose**       | Expands elements | Collects elements |
| **Usage**         | Arrays, objects, function arguments | Function parameters, destructuring |
| **Function Example** | `sum(...[1,2,3])` (Expands array elements) | `function fn(a, ...rest) {}` (Collects remaining arguments) |
| **Array Example** | `[...arr1, ...arr2]` (Merging arrays) | `[first, ...rest] = [1,2,3]` (Rest collects extra values) |
| **Object Example** | `{...obj1, ...obj2}` (Copying/merging objects) | `const { a, ...rest } = obj;` (Rest collects remaining properties) |

---

## **4. Quick Summary**
- **Spread (`...`)** expands elements **out**.
- **Rest (`...`)** collects elements **in**.
- **Both use `...` but serve opposite purposes**.

---

## **5. Final Example Combining Both**
```javascript
function exampleFunction(first, ...rest) {
    console.log(first); // 10
    console.log(rest);  // [20, 30, 40]
}

const numbers = [10, 20, 30, 40];

exampleFunction(...numbers); // Spread used to pass arguments
```
- `...numbers` expands `[10, 20, 30, 40]` into function parameters.
- `...rest` collects `20, 30, 40` into an array.

---

### 🚀 **Conclusion**
✅ **Use spread (`...`)** when you need to **expand** elements in arrays, objects, or function arguments.  
✅ **Use rest (`...`)** when you need to **gather** multiple elements into an array in function parameters or destructuring.