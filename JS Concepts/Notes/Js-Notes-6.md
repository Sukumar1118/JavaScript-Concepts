I'll provide a comprehensive overview of String methods in JavaScript, covering both static methods (called on the String constructor) and instance methods (called on string objects). I'll include practical examples for each.

### Static String Methods
These are methods called directly on the `String` constructor.

1. **String.fromCharCode(...codes)**
   - Creates a string from Unicode values (character codes)
   ```javascript
   const str = String.fromCharCode(72, 101, 108, 108, 111);
   console.log(str); // "Hello"
   ```

2. **String.fromCodePoint(...codes)**
   - Creates a string from Unicode code points (handles extended characters better)
   ```javascript
   const emoji = String.fromCodePoint(128512); // 😀
   console.log(emoji); // "😀"
   ```

3. **String.raw()**
   - Creates a raw string from template literals, preserving escape sequences
   ```javascript
   const path = String.raw`C:\new\test`;
   console.log(path); // "C:\new\test" (no interpretation of \n)
   ```

### Instance String Methods
These are methods available on string instances/objects.

#### Searching & Matching
1. **charAt(index)**
   - Returns character at specified index
   ```javascript
   const str = "Hello";
   console.log(str.charAt(1)); // "e"
   ```

2. **charCodeAt(index)**
   - Returns Unicode value of character at index
   ```javascript
   const str = "Hello";
   console.log(str.charCodeAt(0)); // 72 (Unicode for "H")
   ```

3. **codePointAt(index)**
   - Returns Unicode code point at index (handles surrogate pairs)
   ```javascript
   const str = "😀";
   console.log(str.codePointAt(0)); // 128512
   ```

4. **includes(searchString, position)**
   - Checks if string contains substring
   ```javascript
   const str = "Hello World";
   console.log(str.includes("World")); // true
   console.log(str.includes("world", 6)); // false
   ```

5. **indexOf(searchString, position)**
   - Returns first index of substring (-1 if not found)
   ```javascript
   const str = "Hello Hello";
   console.log(str.indexOf("Hello")); // 0
   console.log(str.indexOf("Hello", 2)); // 6
   ```

6. **lastIndexOf(searchString, position)**
   - Returns last index of substring
   ```javascript
   const str = "Hello Hello";
   console.log(str.lastIndexOf("Hello")); // 6
   ```

7. **search(regexp)**
   - Returns index of first match with regular expression
   ```javascript
   const str = "Hello123World";
   console.log(str.search(/[0-9]/)); // 5
   ```

8. **match(regexp)**
   - Returns array of matches or null
   ```javascript
   const str = "The numbers are 123 and 456";
   console.log(str.match(/\d+/g)); // ["123", "456"]
   ```

9. **matchAll(regexp)**
   - Returns iterator of all matches with capture groups
   ```javascript
   const str = "test1 test2";
   const matches = [...str.matchAll(/test(\d)/g)];
   console.log(matches); // [[test1, 1], [test2, 2]]
   ```

#### Manipulation
10. **concat(...strings)**
    - Combines strings
    ```javascript
    const str = "Hello";
    console.log(str.concat(" ", "World")); // "Hello World"
    ```

11. **repeat(count)**
    - Repeats string n times
    ```javascript
    const str = "Hi ";
    console.log(str.repeat(3)); // "Hi Hi Hi "
    ```

12. **replace(searchValue, replaceValue)**
    - Replaces first match
    ```javascript
    const str = "Hello World";
    console.log(str.replace("World", "Everyone")); // "Hello Everyone"
    ```

13. **replaceAll(searchValue, replaceValue)**
    - Replaces all matches
    ```javascript
    const str = "cat cat dog";
    console.log(str.replaceAll("cat", "bird")); // "bird bird dog"
    ```

14. **slice(start, end)**
    - Extracts portion of string
    ```javascript
    const str = "Hello World";
    console.log(str.slice(6)); // "World"
    console.log(str.slice(0, 5)); // "Hello"
    ```

15. **substring(start, end)**
    - Extracts characters between two indices
    ```javascript
    const str = "Hello World";
    console.log(str.substring(6, 11)); // "World"
    ```

16. **substr(start, length)**
    - Extracts characters from start with length
    ```javascript
    const str = "Hello World";
    console.log(str.substr(6, 5)); // "World"
    ```

#### Case Conversion
17. **toLowerCase()**
    - Converts to lowercase
    ```javascript
    const str = "HELLO World";
    console.log(str.toLowerCase()); // "hello world"
    ```

18. **toUpperCase()**
    - Converts to uppercase
    ```javascript
    const str = "Hello World";
    console.log(str.toUpperCase()); // "HELLO WORLD"
    ```

#### Trimming
19. **trim()**
    - Removes whitespace from both ends
    ```javascript
    const str = "   Hello World   ";
    console.log(str.trim()); // "Hello World"
    ```

20. **trimStart()**
    - Removes whitespace from start
    ```javascript
    const str = "   Hello World";
    console.log(str.trimStart()); // "Hello World"
    ```

21. **trimEnd()**
    - Removes whitespace from end
    ```javascript
    const str = "Hello World   ";
    console.log(str.trimEnd()); // "Hello World"
    ```

#### Padding
22. **padStart(targetLength, padString)**
    - Pads start of string
    ```javascript
    const str = "5";
    console.log(str.padStart(3, "0")); // "005"
    ```

23. **padEnd(targetLength, padString)**
    - Pads end of string
    ```javascript
    const str = "5";
    console.log(str.padEnd(3, "0")); // "500"
    ```

#### Splitting
24. **split(separator, limit)**
    - Splits string into array
    ```javascript
    const str = "apple,banana,orange";
    console.log(str.split(",")); // ["apple", "banana", "orange"]
    console.log(str.split(",", 2)); // ["apple", "banana"]
    ```

#### Miscellaneous
25. **startsWith(searchString, position)**
    - Checks if string starts with substring
    ```javascript
    const str = "Hello World";
    console.log(str.startsWith("Hello")); // true
    ```

26. **endsWith(searchString, length)**
    - Checks if string ends with substring
    ```javascript
    const str = "Hello World";
    console.log(str.endsWith("World")); // true
    ```

27. **toString()**
    - Returns string representation
    ```javascript
    const str = new String("Hello");
    console.log(str.toString()); // "Hello"
    ```

28. **valueOf()**
    - Returns primitive value
    ```javascript
    const str = new String("Hello");
    console.log(str.valueOf()); // "Hello"
    ```

### Key Points
- Most methods don't modify the original string (strings are immutable in JS)
- Many methods accept regular expressions as parameters
- Some methods (like `substring` vs `slice`) have subtle differences in handling negative indices
- Modern methods like `includes`, `startsWith`, and `endsWith` are more readable alternatives to `indexOf`

These methods cover the majority of string manipulation needs in JavaScript.

=====================================================================================

Below is a summarized version of the conversation about JavaScript String methods, organized as concise notes for future reference. It includes all points and examples from the previous response, without duplication, structured clearly with static and instance methods, explanations, and code snippets.

---

# JavaScript String Methods - Comprehensive Notes

## Overview
- **Static Methods**: Called on the `String` constructor (e.g., `String.fromCharCode()`).
- **Instance Methods**: Called on string instances (e.g., `"hello".toLowerCase()`).
- Strings in JavaScript are immutable; methods return new strings, not modify originals.
- Many methods support regular expressions (regex).
- Current date (for context): March 26, 2025.

---

## Static String Methods

1. **`String.fromCharCode(...codes)`**
   - Creates a string from Unicode character codes.
   - Example:
     ```javascript
     const str = String.fromCharCode(72, 101, 108, 108, 111);
     console.log(str); // "Hello"
     ```

2. **`String.fromCodePoint(...codes)`**
   - Creates a string from Unicode code points (better for extended characters like emojis).
   - Example:
     ```javascript
     const emoji = String.fromCodePoint(128512);
     console.log(emoji); // "😀"
     ```

3. **`String.raw()`**
   - Creates a raw string from template literals, preserving escape sequences (e.g., `\n` stays literal).
   - Example:
     ```javascript
     const path = String.raw`C:\new\test`;
     console.log(path); // "C:\new\test"
     ```

---

## Instance String Methods

### Searching & Matching

1. **`charAt(index)`**
   - Returns character at specified index (0-based).
   - Example:
     ```javascript
     const str = "Hello";
     console.log(str.charAt(1)); // "e"
     ```

2. **`charCodeAt(index)`**
   - Returns Unicode value of character at index.
   - Example:
     ```javascript
     const str = "Hello";
     console.log(str.charCodeAt(0)); // 72 (Unicode for "H")
     ```

3. **`codePointAt(index)`**
   - Returns Unicode code point at index (handles surrogate pairs for extended characters).
   - Example:
     ```javascript
     const str = "😀";
     console.log(str.codePointAt(0)); // 128512
     ```

4. **`includes(searchString, position)`**
   - Checks if string contains substring, optionally starting from `position`.
   - Returns `true`/`false`.
   - Example:
     ```javascript
     const str = "Hello World";
     console.log(str.includes("World")); // true
     console.log(str.includes("world", 6)); // false
     ```

5. **`indexOf(searchString, position)`**
   - Returns first index of substring, or `-1` if not found, optionally starting from `position`.
   - Example:
     ```javascript
     const str = "Hello Hello";
     console.log(str.indexOf("Hello")); // 0
     console.log(str.indexOf("Hello", 2)); // 6
     ```

6. **`lastIndexOf(searchString, position)`**
   - Returns last index of substring, or `-1` if not found, optionally up to `position`.
   - Example:
     ```javascript
     const str = "Hello Hello";
     console.log(str.lastIndexOf("Hello")); // 6
     ```

7. **`search(regexp)`**
   - Returns index of first match with regex, or `-1` if not found.
   - Example:
     ```javascript
     const str = "Hello123World";
     console.log(str.search(/[0-9]/)); // 5
     ```

8. **`match(regexp)`**
   - Returns array of matches or `null` if no match; use `/g` flag for all matches.
   - Example:
     ```javascript
     const str = "The numbers are 123 and 456";
     console.log(str.match(/\d+/g)); // ["123", "456"]
     ```

9. **`matchAll(regexp)`**
   - Returns iterator of all matches with capture groups (requires `/g` flag).
   - Example:
     ```javascript
     const str = "test1 test2";
     const matches = [...str.matchAll(/test(\d)/g)];
     console.log(matches); // [[test1, 1], [test2, 2]]
     ```

### Manipulation

10. **`concat(...strings)`**
    - Combines multiple strings into one.
    - Example:
      ```javascript
      const str = "Hello";
      console.log(str.concat(" ", "World")); // "Hello World"
      ```

11. **`repeat(count)`**
    - Repeats string `count` times.
    - Example:
      ```javascript
      const str = "Hi ";
      console.log(str.repeat(3)); // "Hi Hi Hi "
      ```

12. **`replace(searchValue, replaceValue)`**
    - Replaces first occurrence of `searchValue` (string or regex) with `replaceValue`.
    - Example:
      ```javascript
      const str = "Hello World";
      console.log(str.replace("World", "Everyone")); // "Hello Everyone"
      ```

13. **`replaceAll(searchValue, replaceValue)`**
    - Replaces all occurrences of `searchValue` (string or regex with `/g`) with `replaceValue`.
    - Example:
      ```javascript
      const str = "cat cat dog";
      console.log(str.replaceAll("cat", "bird")); // "bird bird dog"
      ```

14. **`slice(start, end)`**
    - Extracts portion from `start` to `end` (exclusive); supports negative indices.
    - Example:
      ```javascript
      const str = "Hello World";
      console.log(str.slice(6)); // "World"
      console.log(str.slice(0, 5)); // "Hello"
      ```

15. **`substring(start, end)`**
    - Extracts characters between `start` and `end` (exclusive); negative indices treated as 0.
    - Example:
      ```javascript
      const str = "Hello World";
      console.log(str.substring(6, 11)); // "World"
      ```

16. **`substr(start, length)`**
    - Extracts `length` characters from `start`; negative `start` counts from end.
    - Example:
      ```javascript
      const str = "Hello World";
      console.log(str.substr(6, 5)); // "World"
      ```

### Case Conversion

17. **`toLowerCase()`**
    - Converts string to lowercase.
    - Example:
      ```javascript
      const str = "HELLO World";
      console.log(str.toLowerCase()); // "hello world"
      ```

18. **`toUpperCase()`**
    - Converts string to uppercase.
    - Example:
      ```javascript
      const str = "Hello World";
      console.log(str.toUpperCase()); // "HELLO WORLD"
      ```

### Trimming

19. **`trim()`**
    - Removes whitespace from both ends.
    - Example:
      ```javascript
      const str = "   Hello World   ";
      console.log(str.trim()); // "Hello World"
      ```

20. **`trimStart()`**
    - Removes whitespace from start.
    - Example:
      ```javascript
      const str = "   Hello World";
      console.log(str.trimStart()); // "Hello World"
      ```

21. **`trimEnd()`**
    - Removes whitespace from end.
    - Example:
      ```javascript
      const str = "Hello World   ";
      console.log(str.trimEnd()); // "Hello World"
      ```

### Padding

22. **`padStart(targetLength, padString)`**
    - Pads start of string with `padString` until `targetLength` is reached.
    - Example:
      ```javascript
      const str = "5";
      console.log(str.padStart(3, "0")); // "005"
      ```

23. **`padEnd(targetLength, padString)`**
    - Pads end of string with `padString` until `targetLength` is reached.
    - Example:
      ```javascript
      const str = "5";
      console.log(str.padEnd(3, "0")); // "500"
      ```

### Splitting

24. **`split(separator, limit)`**
    - Splits string into array using `separator`, optionally limited to `limit` elements.
    - Example:
      ```javascript
      const str = "apple,banana,orange";
      console.log(str.split(",")); // ["apple", "banana", "orange"]
      console.log(str.split(",", 2)); // ["apple", "banana"]
      ```

### Miscellaneous

25. **`startsWith(searchString, position)`**
    - Checks if string starts with `searchString`, optionally from `position`.
    - Returns `true`/`false`.
    - Example:
      ```javascript
      const str = "Hello World";
      console.log(str.startsWith("Hello")); // true
      ```

26. **`endsWith(searchString, length)`**
    - Checks if string ends with `searchString`, optionally considering only first `length` characters.
    - Returns `true`/`false`.
    - Example:
      ```javascript
      const str = "Hello World";
      console.log(str.endsWith("World")); // true
      ```

27. **`toString()`**
    - Returns string representation of String object.
    - Example:
      ```javascript
      const str = new String("Hello");
      console.log(str.toString()); // "Hello"
      ```

28. **`valueOf()`**
    - Returns primitive value of String object.
    - Example:
      ```javascript
      const str = new String("Hello");
      console.log(str.valueOf()); // "Hello"
      ```

---

## Key Notes
- **Immutability**: String methods return new strings; original remains unchanged.
- **Regular Expressions**: Supported by `search`, `match`, `matchAll`, `replace`, `replaceAll`.
- **Differences**:
  - `slice` vs `substring`: `slice` supports negative indices; `substring` treats them as 0.
  - `substring` vs `substr`: `substring` uses end index, `substr` uses length.
- **Modern Alternatives**: `includes`, `startsWith`, `endsWith` are more readable than `indexOf` for boolean checks.

=========================================================================================

