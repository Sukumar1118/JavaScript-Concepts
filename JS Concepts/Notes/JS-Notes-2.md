1. Find the number of occurrences, number of single ocuurrences in an array. EX: [1,2,3,4,1,6,6,8,2,2];
ANs: const arr1 = [1, 2, 3, 4, 1, 6, 6, 8, 2, 2];
    let countMap = {};
    arr1.forEach((ele)=>{
        countMap[ele] = (countMap[ele] || 0) + 1;
    })
    console.log("countMap1: ", countMap);
    
    let singleMap1 = {};
    Object.entries(countMap).forEach(([key, value])=>{
        if(value === 1){
            singleMap1[key] = 1;
        }
    })
    console.log("singleMap1: ", singleMap1);
    
    let singleMap2 = {};
    for(let key in countMap){
        if(countMap[key] === 1) {
            singleMap2[key] = 1;
        }
    }
    console.log("singleMap2: ", singleMap2);
    
    let singleMap3 = {};
    for(const [key, value] of Object.entries(countMap)){
        if(countMap[key] === 1) {
            singleMap3[key] = 1;
        }
    }
    console.log("singleMap3: ", singleMap3);
    
    let singleMap4 = Object.keys(countMap).filter(key=> countMap[key] === 1).reduce((acc, key)=>{
                     acc[key] = 1;
                     return acc;
                }, {});
    console.log("singleMap4: ", singleMap4)
    
    let singleMap5 = Object.keys(countMap).reduce((acc, [key, value])=>{
                        if(countMap[key] === 1){
                            acc[key] = 1;
                        }
                     return acc;
                }, {});
    console.log("singleMap5: ", singleMap5)
    
    let singleMap6 = {};
    arr1.forEach((currEle, index) => {
        let isSingle = arr1.indexOf(currEle) === index && arr1.lastIndexOf(currEle) === index;
        if(isSingle){
            singleMap6[currEle] = 1;
        }
    })
    console.log("singleMap6: ", singleMap6);
=======================================================================
2. Difference between Micro task & Macro task in JavaScript?
ANS: -> Macro tasks are the async operations like Timers(setTomeOut, setInterval etc),DOM events(click handlers) etc.
	 -> Micro tasks are the async operations like Promise resolutions(then, catch, finally callbacks), Mutation Obseever callbacks etc.
	 
	 These tasks are handled by the event loop during execution of javascript. 
	 -> It checks for Micro tasks first, then if all Micro tasks are done, then it executes Macro tasks ooce the callstack is empty.
	 -> First priority is for Micro tasks.
===========================================================================
3. What is Box model in CSS?
ANS: -> CSS box model describes, how elements are structured and rendered in a web page.
	 -> It represents every HTML element as rectangular box with specific properties that define it's space, size & boundaries.
	 -> The box model consists of different layerys:
			1. Content: The inner most part of the box which is the actual content.
			2. Padding: The space between the content & border.
			3. Border: A layer surrounding the padding & content.
			4. Margin: The outermost layer, representing the space outside the border.		
	-> We can see the visual representation of box model of any element in browser dev tools, how content, padding, border & margin 
		contibutes to the size of the HTML element. 
	-> When we inspect the element under Elements -> styles we can se that.
					
	Visual Representation:
		-> Padding, Border & Margin will come on all 4-sides.
	
						-------
						Margin
						-------
						Border
						-------
						Padding
						-------
						content
						-------
						
	Total Size Calculation: 
		-> By default, the total width and height of an element are calculated as:

		Total Width = width + padding-left + padding-right + border-left + border-right + margin-left + margin-right
		Total Height = height + padding-top + padding-bottom + border-top + border-bottom + margin-top + margin-bottom
		
	box-sizing Property:
		content-box: 
			-> Default-behaviour. 
			-> It includes only content in the width & height.
			-> Padding & border added to the total-size.
			-> Margin also adds as extra in the total size.
			
		border-box: 
			-> It includes content, padding & border in the width & height.
			-> But, no margin is added, it still adds as extra in the total size.
==============================================================================================		
4. Difference between Block & Inline-Block elements?
ANS: -> These are 2-display types how the elements are laid out on a web page.
	 -> They differ in their behaviour regarding flow, sizing & spacing.
	 
	Block Elements:
		-> Block level elements takes full width of their parent container.
		-> It has line-break before & after and so it appears in its own line.
		-> Display valueis: display: block;
		Ex: <div>, <p>, <section> <h1>-<h6> etc.
		-> Box model is fully applied.
		-> Vertical margins may collapse if in normal flow.
			(Not normal flow: e.g., float, position: absolute, display: flex)
			
		How It Works:
			-> If the bottom margin of the first element is 20px and the top margin of the second element is 30px, 
			   the space between them will be 30px (the larger value), not 20px + 30px = 50px.
			-> The smaller margin "collapses" into the larger one.
		
		Use case: Useful for structural elements like sections, paragraphs or containers.
		
	Inline-Block Elements:
		-> Inline-block elements doesn't take full width automatically & is determined by it's content or explicitly set.
		-> Inline-block elements flow horizontally like inline elements side by side.
		-> Display value is: display: inline-block;
		Ex: <img>(default or naturally inline-block), 
			Any other elements styled with display: inline-block like '<span>', '<div>' etc.
		-> Box model is fully applied.
		-> Vertical margins will not collapse.
			
		Use case: Useful for creating layouts where elements sit side by side but need specific sizes.
				  Ex: buttons, navigation items etc.
				  
	Inline Elements:
		-> Inline elements doesn't take full width & determined by it's content.
		-> It flows in the same line.
		-> Wdith/Height will not apply.
		-> Padding & border applies but vertically it overlaps with surrounding content.
		-> Margins will be applied but vertically no effect.
		Ex: <span>, <a> etc.
		-> Box model is applied with limitations.
===================================================================================================	
5. How can you strike through an image?
ANS: 	<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<title>Image with Red Strikethrough</title>
			<style>
				.image-container {
					position: relative;
					display: inline-block;
				}

				.image-container::after {
					content: '*';
					position: absolute;
					top: 50%;
					left: 0;
					width: 100%;
					height: 2px;
					background-color: red;
				}
			</style>
		</head>
		<body>
			<h1>Image with Strikethrough</h1>
			<div class="image-container">
				<img width="200" height="200" 
				src="https://media.istockphoto.com/id/1973365581/vector/sample-ink-rubber-stamp.jpg?s=2048x2048&w=is&k=20&c=-nRicEMFco-wjZrqf2MTWa5dlmVM312tNFy7Mw3Rj4I=" 
				alt="Sample Image">
			</div>
		</body>
		</html>
=============================================================================================================================
6. Responsive layout with boxes & same space b't them.
ANS: <!DOCTYPE html>
	<html lang="en">
		<head>
		  <meta charset="UTF-8" />
		  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
		  <link rel="stylesheet" href="style.css" />
		  <title>Browser</title>
		  <style>
			/* Container styling */
			  .container {
				  display: flex;
				  justify-content: space-evenly;
			  }

			  /* Box styling */
			  .box {
				  width: 50px;
				  height: 50px;
				  background-color: #f0f0f0;
				  border: 1px solid #ccc;
			  }
		  </style>
		</head>
		
		<body>
		   <div class="container">
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
		</div>
		</body>
	</html>
==========================================================================
7. Why we use iframes in a web page?
ANS: They allow to embed content from external souce or from same site in to an separate HTMl document.
	-> Embedding external content like youtube videos or google maps from other sites 
		Ex: <iframe src="youtube.com/video"> shows a video on your page.
		
	-> Embedded content like adds separate from your web page with out messing the original web page styles etc.
		Ex: An ad in <iframe src="ad.com"> won’t turn your site pink.
		
	-> Load independent sections like whether, live updates etc. & refresh or update the with out touching the main page.
		Ex: <iframe src="news.com/ticker">
		
	-> Legacy support like loading old forms with out rebuilding them.
==================================================================================
8. How can you reduce reduntant API calls from different components making same API calls?
ANS: Here’s a concise summary of our conversation, covering your questions about reducing redundant API calls in React, 
	handling dynamic data, and detecting server changes automatically, along with the solutions discussed:

---

### 1. Reducing Redundant API Calls in React
- **Problem**: Multiple components making the same API calls in a React app.
- **Solutions**:
  - **Context API**: Centralize fetching and share data via context, checking if data exists before fetching.
  - **Custom Hook**: Cache results (e.g., in an object) and reuse across components.
  - **Redux**: Store data in a global store, fetching only if not present, with thunks for async logic.
  - **React Query/SWR**: Libraries that deduplicate requests using unique keys, caching data automatically.
  - **Memoization**: Use `useCallback` to prevent unnecessary refetches in parent components.
- **Redux Relevance**: Useful for large apps with complex state, but overkill for simple cases compared to React Query/SWR.

---

### 2. Handling Dynamic Data (Cache Invalidation)
- **Problem**: Cached data becomes stale when the server updates.
- **Solutions**:
  - **Timestamps**: Track when data was fetched (e.g., `lastFetched`) and refetch if older than a threshold (e.g., 5 minutes).
    - Example: Custom hook or Redux with a `maxAge` check.
  - **Manual Triggers**: Invalidate cache and refetch on user action (e.g., button click) or app events (e.g., POST request).
    - Example: `invalidateCache` in Redux, `refetch` in React Query.
  - **Combination**: Use timestamps for auto-refreshes and manual triggers for immediate updates.
    - Example: React Query with `staleTime` and `invalidateQueries`.

---

### 3. React Query and SWR
- **React Query**:
  - Part of TanStack Query ecosystem, for server-state management in React.
  - Features: Caching, deduplication (`queryKey`), stale-while-revalidate (`staleTime`), mutations (`useMutation`).
  - Setup: Requires `QueryClientProvider`.
- **SWR**:
  - Lightweight library from Vercel, based on stale-while-revalidate.
  - Features: Simple API (`useSWR`), deduplication by key, auto-revalidation (e.g., on focus).
  - Setup: No provider needed.
- **Comparison**: React Query is feature-rich and scalable; SWR is simpler and lighter.

---

### 4. TanStack Query Ecosystem
- **Overview**: Evolved from React Query, now a framework-agnostic suite under TanStack (Tanner Linsley’s projects).
- **Components**:
  - `@tanstack/react-query`: React-specific library.
  - `@tanstack/query-core`: Core logic for any framework.
  - Adapters: Vue, Solid, Svelte versions.
  - Devtools: Debugging UI for queries.
- **Purpose**: Unified, efficient server-state management across JavaScript ecosystems.

---

### 5. Detecting Server Changes Automatically
- **Limitation**: Timestamps and manual triggers don’t detect server changes in real time.
- **Push-Based Solutions**:
  - **WebSockets**: Bidirectional, server pushes updates via a persistent connection.
    - Example: React with WebSocket updates to state or React Query cache.
  - **Server-Sent Events (SSE)**: Unidirectional, server streams events over HTTP.
    - Example: SSE with SWR’s `mutate` to update cache.
  - **Long Polling**: Client holds request open until server responds with changes, then re-requests.
    - Example: Recursive fetch in React.
- **Integration**: Combine with React Query (`setQueryData`) or SWR (`mutate`) for seamless cache updates.

---

### 6. Optimized Polling (Alternative)
- **Problem**: Push isn’t available; naive polling is inefficient.
- **Solution**: Poll with shorter intervals (e.g., 10 seconds) and use HTTP headers to avoid redundant data:
  - **ETags**: Client sends `If-None-Match`, server returns `304 Not Modified` if unchanged.
    - Example: React Query with ETag tracking.
  - **Last-Modified**: Client sends `If-Modified-Since`, server returns `304` if not modified.
    - Example: SWR with timestamp updates.
- **How It Works**: Server only sends full data when changed, reducing bandwidth; client updates only on new data.

---

### Key Takeaways
- **Redundant Calls**: Use caching (React Query, SWR, Redux) to share data across components.
- **Dynamic Data**: Invalidate caches with timestamps or manual triggers; React Query/SWR simplify this.
- **Server Changes**: Push (WebSockets, SSE, long polling) detects changes instantly; optimized polling (ETags, Last-Modified) is a fallback when push isn’t an option.
- **Best Tool**: React Query for scalability, SWR for simplicity, custom solutions for small apps, polling for constrained servers.

===============================================================================================================

