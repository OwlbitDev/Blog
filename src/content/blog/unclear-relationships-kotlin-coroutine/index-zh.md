---
title: "Kotlin协程-那些理不清乱不明的关系"
description: " Kotlin协程-那些理不清乱不明的关系"

date: 2021-03-26T18:50:29+08:00

author: "hongui"

categories:
 - 协程
tags:
 - Android
 - Kotlin
 - 协程

draft: false
---

> Kotlin的协程自推出以来，受到了越来越多Android开发者的追捧。另一方面由于它庞大的API，也将相当一部分开发者拒之门外。本篇试图从协程的几个重要概念入手，在复杂API中还原出它本来的面目，以全新的角度带读者走进Kotlin协程世界。

## 什么是协程
在很多有关协程的文章中，描述协程通常会用这样的一句描述——协程比线程更加轻量，是可取消的。这句话没有错，这两个都是协程的优点，但是并不是特点，它并没有解释协程是什么。那么什么是协程的特点呢，我觉得可以先用线程做个类比，***解释一个概念最好的办法就是类比。*** 我不打算使用科学严谨的描述，我想给线程一个我自己的定义——线程是一个可供CPU调度的执行单元，它有自己的执行块，可以独立地执行逻辑。我特意将线程的三个关键特征列举出来了：

- 线程由CPU调度
- 线程拥有自己的代码块
- 代码块需要才能调度执行

这是我对线程的直观感受，并且这些特点是能从代码上体现出来的。如Java中的`Thread`，它是线程的同时，也是一个实体对象，能通过API来认识它，使用它。而它的特别之处就是我上面列举的三点，这些都是线程特有的。我试着用相同的思路来给协程下一个自己的定义——协程是由线程调度执行的执行单元，它也有自己的执行块，可以独立或者协同执行逻辑。其实Kotlin中的协程也有自己对应实体和操作API，甚至和线程的还很像(如生命周期），但是由于Kotlin对协程的封装过于彻底，很多API没有暴露出来，以至于我对协程的认识一直处于盲人摸象的状态。另外，其实协程是有多种实现方式的，以下我的观点仅针对Kotlin的协程实现，可能与其他语言的实现不一致。

***Kotlin中的协程对象本质上来讲就是个可执行的代码块，*** 执行的代码就是创建协程传递进去的。除此之外它还有个最大的特点——协程是不和线程绑定的。它可以在某个时刻断开当前的线程，然后在其他时候，附着到其他线程上。也就是说，它像一个乒乓球，线程就好比是球拍，它可以在球拍间反复横跳。所以，结合这两个特点，官方给协程的定义是 ***一个可挂起的计算实体***。我觉得这个定义不算精确，它只体现了挂起这个概念，没有体现恢复的概念。我给它一个我自己的定义——***一个可被调度的计算实体***。

## 协程中几个关键概念
明白了协程是什么还不够，因为Kotlin的协程还涉及到很多方面，有几个关键概念需要理解。

### 挂起函数
提到Kotlin的协程就不得不提到挂起函数，这是Kotlin协程实现的最重要的概念之一。简单来说，***挂起函数是一种异步实现方案，它是一个普通函数的前提下，还具备挂起和恢复的特性。*** 它是解决耗时计算和结果传递的一种方案。那么它和我们常见的基于回调的方案相比，有什么不同呢。在基于回调的方案中，计算过程和结果没有关系，结果需要通过另一个对象，在计算完成后由计算过程手动传递，而这一过程是可能被反复嵌套的，从而导致，一些本该是串行化的代码，被割裂成几个部分，分散到不同的代码块中。如以下读写文件的代码
```kotlin
 // asynchronously read into `buf`, and when done run the lambda
 inChannel.read(buf) {
     // this lambda is executed when the reading completes
     bytesRead ->
     ...
     ...
     process(buf, bytesRead)
 
     // asynchronously write from `buf`, and when done run the lambda
    outChannel.write(buf) {
        // this lambda is executed when the writing completes
        ...
        ...
        outFile.close()          
    }
}
```
同样的逻辑，将`read`和`write`实现为挂起函数后，能写成什么样呢？
```kotlin
 launch {
     // suspend while asynchronously reading
     val bytesRead = inChannel.aRead(buf) 
     // we only get to this line when reading completes
     ...
     ...
     process(buf, bytesRead)
     // suspend while asynchronously writing   
     outChannel.aWrite(buf)
    // we only get to this line when writing completes  
    ...
    ...
    outFile.close()
}
```
这是Kotlin官方给的一个例子，可以看出挂起函数的实现非常符合直觉，是和思考过程保持一致的，同时还减少了大量的嵌套。

为了更好地解释挂起函数，我还需要引入了一个新的概念——挂起点。
挂起点是一个分界点，代表着从这个时刻之后，执行过程可能会转移到其他地方执行，然后在某个时刻，再从这个点恢复，继续往下执行。这个过程中，当前线程不会被阻塞。所以 ***挂起函数其实实现了异步非阻塞的通信模式。***

一句话总结，挂起函数是一种不阻塞当前线程，并能返回异步计算结果的函数。

### 协程创建者
前面提到的挂起函数虽然好，但是有个限制，普通方法是不能调用挂起函数的，只能通过挂起函数调用。那么就出现了先有鸡还是先有蛋的问题。解决这个问题的方法就是协程创建者。`launch`, `future`, `sequence`都是协程创建者。顾名思义，协程创建者是用来创建协程对象的，除此之外和普通函数没有区别。它们就是通往协程世界和挂起函数的大门。在这个大门里，我们可以尽情地使用挂起函数，简化我们的计算过程。当然，这些都不是固定不变的，这些函数都有多个配置参数，其中最重要的就是`CoroutineContext`。

### `CoroutineContext`
`CoroutineContext`的作用是提供协程的各种配置信息，***本质上就是保存非重复元素的容器(Set)***，里面的元素可以根据Key获取到（如调度器），称之为元素（Element）。这里，我忍不住想把它的接口定义放出来，因为实在是太美了。
```kotlin
 interface CoroutineContext {
     operator fun <E : Element> get(key: Key<E>): E?
     fun <R> fold(initial: R, operation: (R, Element) -> R): R
     operator fun plus(context: CoroutineContext): CoroutineContext
     fun minusKey(key: Key<*>): CoroutineContext
 
     interface Element : CoroutineContext {
         val key: Key<*>
     }

    interface Key<E : Element>
}
```
以上就是Kotlin中对`CoroutineContext`的定义，这些API每个都有其巧妙的用途，让人叹服

- `get`目的是根据Key获取对应的对象，这个方法的奇特之处就是查询参数。利用这个方法在执行某个操作之前判断`CoroutineContext`是否有某个配置对象，从而实现一种权限认证。

- `fold`其实就是一种迭代算法，可以对全部元素进行检查。

- `plus`这就很有意思了，它可以让两个对象合并起来，并且当`key`相同时使用右侧的对象覆盖左侧的对象。这在我们的协程使用中绝对是最灵活的API了。我们可以使用+替换调原本的调度器，使用我们给定的调度器，而且看起来是那么自然。

- `minusKey`返回不包含指定`key`的`context`，相当于一种取反操作，这在某些情境下非常有用。

我觉得这应该算得上是对抽象的极致体现了，这个接口用简单的API抽象了增删改查四个操作，并且保留了强大的扩展性。在最开始接触协程的时候，我常常对协程复杂的工作机制和简单的参数配置产生了深深的怀疑，直到我看到了这个定义，我才明白它真正的强大之处，它不仅可以用系统默认的工作配置完成工作，还允许用户实现自己的`CoroutineContext`来随时替换掉默认配置，完成自己定制化的任务。

### `Continuation`
`Continuation`不是Kotlin特有的概念，它在维基上的解释是一种控制状态的抽象表示。而在Kotlin中，它是对协程在挂起点的一个状态抽象，这可能不太好理解，我们可以通过具体的API来将这个概念具体化。
```kotlin
interface Continuation<in T> {
   val context: CoroutineContext
   fun resumeWith(result: Result<T>)
}
```
它有个关键的函数——resumeWith，它表示在挂起状态之后的某个时刻，通过这个状态对象从原来的位置恢复过来。这是挂起函数实现的关键。而这里面的控制状态就是由参数体现了，成功或者失败，所以它还有两个扩展方法：
```kotlin
fun <T> Continuation<T>.resume(value: T)
fun <T> Continuation<T>.resumeWithException(exception: Throwable)
```
## 总结
协程是一个可被调度的计算实体，可通过协程创建者创建，在协程的代码块里可以使用挂起函数，它能必要的时候挂起，然后在条件满足后恢复，完成异步代码的串行化编程。

以上就是理解协程的关键概念，在实际使用协程的过程中可能用不到很多，但是却会对我们理解其运作过程很有帮助，也是写出标准协程代码的关键。Kotlin协程并没有很多黑魔法，只是为了适用多种不同的使用场景，有了庞大的API，本篇文章就是对这些API的一个概括解释，后面将会针对各种场景再进行详细梳理，希望大家喜欢。

青山不改，绿水长流，咱们下期见！