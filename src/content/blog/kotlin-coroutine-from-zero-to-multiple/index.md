---
title: "A introduction to Kotlin cotoutine-from zero to multiple"
description: "A introduction to Kotlin cotoutine-from zero to multiple"

date: 2021-03-30T19:10:30+08:00

author: "hongui"

categories:
 - Coroutine
tags:
 - Android
 - Kotlin
 - Coroutine

draft: false
---

> In the last post, I introduced the creation, use, and collaboration of Kotlin coroutines. This post will introduce more usage scenarios and continue to take you into the world of coroutines.

## 使用协程处理异步数据流
Common programming languages have built-in representations of datasets of different objects of the same type, often called container classes. Different container classes are suitable for different usage scenarios, and Kotlin's `Flow` was introduced to represent asynchronous data flow in the context of asynchronous computing.

### Flow
Asynchronous data flow is basically about getting asynchronous data in some way, and Kotlin provides many ways to do this, the more common ones being the `asFlow` extension of the Kotlin coroutine package and the `flow` constructor. The former is a `Flow`-ized encapsulation of a common dataset, nothing more, so let's focus on the latter.

The main goal of the `flow` constructor is to generate an asynchronous data flow, which is a generic function that takes a pending function as its argument and a `FlowCollector` as an extension function. This interface has only one `emit` method, which is to provide asynchronously computed data to the created `Flow`, and because it's a pending function, we can use other pending functions inside it to compute asynchronous values, and then send the values out via the `emit` method, and so on to provide a constant stream of data for downstream operations.

That's not all. The above steps only specify how the data is created, they don't actually execute it, i.e., the road is built, but there's no car on the road yet. So how do we get the car on the road, looking at the `Flow` interface you will see that it provides the `collect` method to process the data. `collect` receives a pending function as processing logic, but at the same time, the `collect` method itself is also a pending function, so the method can only be run in a pending function. With this knowledge, we can write the simplest asynchronous data flow.
```kotlin
 1uspend fun compute():Int{
             delay(123)
             return 1024
 }
 
 viewModelScope.launch {
     val flow=flow<Int> {
         emit(9527)
         emit(compute())
        delay(256)
        emit(256)
    }
    flow.collect {
        println(it)
    }
}
```
Feel free to do all sorts of operations inside the `flow` constructor, just pass the result when necessary, but note that the `emit` method can only run in the same coroutine. At first glance, there's no fundamental difference between writing them separately and writing them together, but `Flow` can do a lot more.

## It's time to change Flow's working environment
In the previous section, our simple example, if we replaced the data fetch method in the constructor with a network request, the application would be dead in the water. This is because they are running in the main thread. At this point, those of you who have read the previous article will immediately react by using the `withContext` method to switch threads inside the constructor. The idea is correct, because the default configuration of `Flow` is that the constructor and the `collect` method work in the same thread, and since the main thread is not allowed to run now, then we can just switch the thread of the constructor. But that's not the case. The code you write this way won't run at all. This is because there is a unique `flowOn` method to switch the thread of execution of the constructor. It's as simple as configuring the `flowOn` method once on the created `Flow` object.
```kotlin
val flow=["1.jpg","2.jpg"].asFlow()
flow.map { decode(it) }
        .flowOn(Dispatchers.IO)
viewModelScope.launch {
    flow.collect{
        adapter.add(it)
    }
```
## Some intermediate processing logic

Those of you who are familiar with RxJava may be wondering, these operations can be done by RxJava, and there are even more operators to support intermediate state processing, so can asynchronous data streaming do all this. Undoubtedly, it can. Ordinary datasets have `map`,`filter` and other methods that work just as well for asynchronous data streams. And all of these methods take pending functions as arguments, which can perform asynchronous operations. And it also has a more flexible `transform` method, this method can be customized with its own operators to achieve more flexible data manipulation.

Of course, all of the above operators can only be implemented for a single asynchronous stream, and it is equally well suited to support multiple streams. `zip` can combine two data sources, and the length of the combined stream is the length of the shortest of the two streams. Unlike `zip`, `combine` takes as input the most recent send of the two streams, i.e., if you have a piece of one slow stream, the elements of the slow stream may be fetched more than once, so that the final stream is longer than the shortest one.
```kotlin
val flow = flowOf(1, 2).delayEach(10)
val flow2 = flowOf("a", "b", "c").delayEach(15)
flow.combine(flow2) { i, s -> i.toString() + s }.collect {
     println(it) // Will print "1a 2a 2b 2c"
}
```
## End State Tracking
As mentioned in the previous section, since the data source and the processing logic are not in the same place, it is difficult to determine the size of the final data stream, and thus not know when the data stream is finished processing. Also, intermediate operations may change the size of the data stream, which makes it even more difficult to determine when the data processing is finished. But there are times when we need to do something after the data has been processed, so what should we do? This is where the `onCompletion` method comes in. This method takes a null `Throwable` parameter, which obviously indicates both results, success or failure, and passes in the exception if it fails.

## Multiple Coroutines Working Together
In many cases, it's impossible to avoid having multiple coroutines working together. For coroutines that return a single value, as we mentioned in the previous article, you can pass `Deferred`, the return object of the `async` constructor, but the limitation is that you can only pass one value to this object. Kotlin provides a `Channel` solution to the multi-value passing case. A `Channel` is similar to a blocking queue, where data is sent out via the `send` method and received in another place using the `receive` method. With this approach, we can provide great efficiency in working with coroutines. It is easy to implement the producer and consumer model using it.
```kotlin
 val chanel=Channel<Int>()
 viewModelScope.launch(Dispatchers.IO) {
     for (i in 1..5){
         delay(1000)
         chanel.send(i)
     }
 }
 viewModelScope.launch { 
     for (i in chanel){
        println("Handle ${i}")
    }
}
```
Of course, this is just the simplest usage, and more producers can be added, or eliminated when the data is no longer needed, and there is even a specialized `product` constructor to directly get coroutines that return multiple values.

## Summary
Kotlin coroutines have a lot of useful APIs which cover most of the asynchronous usage scenarios. So when using coroutines, we first need to clarify the use of scenarios, and then according to the use of scenarios to determine the use of which set of APIs, which can make us avoid falling into API phobia. To this end, I have organized a scenario table based on the content of these two articles, you can refer to the use of the actual development.
Kotlin coroutine constructor

| API	| Usage |
| ---   | ---     |
| launch |	Performs time-consuming operations with no return value |
| async	| Need to get a single return value for time-consuming operations |
| produce	| Need to get multiple return values for time-consuming operations |

Kotlin Coroutine Collaboration Tool

| API	| Usage |
| ---   | ---     |
| Flow |	Manipulating Asynchronous Data Streams |
| Channel |	Coroutines communicate with each other |