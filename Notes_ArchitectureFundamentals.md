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