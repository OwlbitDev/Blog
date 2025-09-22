---
title: "How to get the app package name on Android"
description: "Various ways to get Android application package names, including Android Studio, adb shell pm list package, adb shell top, adb shell dumpsys window"

date: 2025-03-06T19:50:00+08:00

author: "hongui"

category:
 - adb
draft: false
---

## Get package via Android Studio
If we can get the Apk file, then drag the Apk directly into Android Studio, Android Studio will automatically parse the file, and after successful parsing it will open a new tab, and at the top of the tab you can see the package name
![Android Studio resolve package](./android-studio.png)

## Get package via pm list packages
If we can get the Apk file, then drag the Apk directly into Android Studio, Android Studio will automatically parse the file, and after successful parsing it will open a new tab, and at the top of the tab you can see the package name
```bash
adb shell pm list packages | grep com.example.app
```
![adb shell pm list packages](./pm-list-packages.png)

## Get package via adb shell top
If we don't know anything about the application, then we have to run the application. A running application takes up resources and can be located by looking at the output of `top` and further determining the package name from the `ARGS` column. If the output is truncated, you can enter the `shell` environment before executing the `top` command.
![adb shell top](./top.png)

## Get package adb shell dumpsys window
Actually the above two commands are still too slow for locating the application, the fastest way is to use `dumpsys window` directly. Again we run the application, but this time instead of looking at the resource usage of the application, we locate the application based on the current window focus, and the window related one is definitely looking for `dumpsys window`. The output may be different for different versions of the system, but the same is true, in one of the output lines there will be something like the following output
```bash
mFocusedApp=ActivityRecord{1970a93 u0 com.tencent.mm/.plugin.account.ui.WelcomeActivity t77}
```
Start with `mFocusedApp`, after `u0` and before `/` is the package name, after `/` is the name of the `Activity`.
![adb shell dumpsys window](./windows.png)