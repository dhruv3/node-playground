# Node.js Language Fundamentals
* Its fast as it has Chrome V8(it helps executing threads faster).
* Its single thread and there is a smart event loop to handle multiple client requests.
* Single thread good as scaling multi threaded app is cumbersome.
* Async and event driven.
* Supports caching.
* Thread and Event pool: The responsibility of the event pool is to build event queues and then process the events one at a time. The responsibility of the thread pool is to ensure that the requests are received and managed by a single thread and then pass them on to the event loop.
* Node binding is used to facilitate communications with external systems. For example, if we want to communicate with HTTP servers, we can use HTTP binding. 
## Node Execution Model
* Based on JS event model. It uses JS callback mechanism.
<img width="1042" alt="Screen Shot 2019-03-28 at 1 48 23 PM" src="https://user-images.githubusercontent.com/13077629/55184540-68e41880-5160-11e9-971f-b18efae07f38.png">
