---
title: "Android开发中的线程模型和解决思路"
description: "Android开发中使用C++线程，Java线程，JNI线程可能遇到的问题模型和解决思路"
cover: "cover.webp"

date: 2024-12-28T13:14:00+08:00

author: "hongui"

categories:
 - JNI
tags:
 - Android
 - JNI
 - 线程

draft: false
---

>在Android开发中，线程扮演着重要的角色，虽然随着协程技术的普及，纯应用层开发中，线程的使用已经不是问题，但是对于JNI开发，至少有一半的崩溃是线程相关问题引起的。所以本文将用实战的方式，逐步向读者揭示JNI开发中使用线程可能遇到的问题，并提供自己的解决思路。