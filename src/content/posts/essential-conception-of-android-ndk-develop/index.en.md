---
title: "Essential Concepts of Android NDK Development"
description: "An introduction to the essential concepts of Android NDK development."

date: 2022-03-21T20:50:30+08:00

author: "hongui"

categories:
 - NDK
tags:
 - Android
 - JNI
 - C++
 - NDK

draft: false
---
In Android development, sometimes it is necessary to use libraries written in C/C++ for security, performance, and code reuse considerations. Although modern toolchains have significantly reduced the complexity of this process, beginners often encounter unpredictable issues. This guide aims to provide a simple introduction to help those who are just starting to write C/C++ libraries. To minimize cognitive gaps, we will start with the simplest functionality and gradually add tools until the final feature is implemented.

## Objective
The goal of this article is straightforward: to call a C/C++ function from an Android application that takes two integer values as input and returns their sum. We will name this function `plus`.

## Starting with a C++ Source File
To begin with something familiar, let's start with a basic C++ source file without using complex tools. Open your preferred text editor—VS Code, Notepad++, or even Notepad—and create a new text file named `math.cpp`. Next, you can write the following code in this file:

```cpp
int plus(int left,int right)
{
    return left + right;
}
```
Our source file is now complete. However, having only the source file is insufficient because it is human-readable but not machine-executable. Therefore, we need a compiler to translate human-readable code into machine-executable binary code.

## Compiler
A compiler is a complex system but serves two fundamental functions:
1. Understanding the content of the source file (human-readable)—detecting syntax errors.
2. Understanding binary content (machine-readable)—generating machine code.

Based on these two basic functions, compilers have evolved into various types. Common examples include VS on Windows, G++ on Linux, and Clang on Apple platforms. For Android, the situation is slightly different because these compilers typically run on specific systems and generate programs that can only run on those systems. In my case, I am writing C++ code on Deepin, but our target is to run the code on an Android phone, which are two different platforms. More pessimistically, there is no compiler that can run directly on mobile devices yet. However, this does not mean we cannot run C++ code on mobile devices due to cross-compilation.

Cross-compilation is a technique that compiles code on one platform to produce executable objects for another platform. The main difference from regular compilation lies in the linking stage. Regular linking can find suitable library files directly from the system libraries, while cross-compilation cannot because the current platform is not the final execution platform. Therefore, cross-compilation requires common libraries for the target platform. Fortunately, Google has prepared all of this for us, known as the NDK.

## NDK
NDK stands for Native Development Kit, which includes many tools such as compilers, linkers, standard libraries, and shared libraries. These are essential components for cross-compilation. To understand it better, let's look at its directory structure. On my machine, the NDK is located at `/home/Andy/Android/Sdk/ndk/21.4.7075529` (on Windows, the default location is `c:\Users\xxx\AppData\Local\Android\Sdk\`). The NDK is stored under the Sdk directory, named `ndk`, and versioned by its version number, such as `21.4.7075529` in this example. This path is also the value of the environment variable `ANDROID_NDK`.

Understanding its storage location, let's look at two important directories:


- `build/cmake/`，which we will discuss later.
- `toolchains/llvm/prebuild/linux-x86_64`，where the last part (`linux-x86_64`) varies by platform. Here you will find the desired compilers, linkers, libraries, and header files. For example, the compiler resides in the `bin` directory under this path, ending with `clang` or `clang++`, such as `aarch64-linux-android21-clang++`.

1. `aarch64`indicates that this compiler can generate binaries for `arm64` architecture machines. Other architectures include `armv7a`, `x86_64`, etc. Different platforms require matching compilers.
2. `linux`represents the host platform where the compilation occurs.
3. `android21` specifies the target Android API level.
4. `clang++`indicates a C++ compiler, while `clang` is for C. 

For Android, different hosts, instruction sets, and Android versions correspond to different compilers. Now, let's try compiling our C++ file.

## Compilation

By running `aarch64-linux-android21-clang++ --help`you can see many parameters and options. Since we only want to check for syntax errors in our C++ source file, we can simply compile it with `aarch64-linux-android21-clang++ -c math.cpp`

If everything goes smoothly, an object file`math.o` will be generated in the same directory as `math.cpp`indicating that our source code has no syntax errors and can proceed to the next step of linking.

However, before proceeding, let's pause. Typically, projects contain multiple source files and third-party libraries, making manual compilation and linking inefficient and error-prone. With mature tools available, we should focus on business logic rather than repetitive tasks. CMake is such a tool.

## CMake

CMake is a cross-platform build tool. When writing C++ code, you may need to reference header files from other directories, but the compiler doesn't know where to find them during compilation. Configuration is required to inform the compiler of the header file locations. Similarly, source files distributed across different directories need to be packaged into libraries based on certain requirements. Projects may also reference third-party libraries, requiring configuration to tell the linker where to find them. These configurations vary across different systems and IDEs. Visual Studio, for instance, requires configuration in project properties. While this isn't a big issue when developers use the same tools, collaboration becomes cumbersome when dealing with multiple platforms and IDEs. CMake addresses these challenges by providing a unified configuration mechanism.

CMake configurations are stored in a file named `CMakeLists.txt`. Configurations like header file references, source dependencies, and library dependencies are specified once in `CmakeLists.txt` and work seamlessly across Windows, MacOS, and Linux platforms. For example, if I create a CMake project in Visual Studio on Windows and configure dependencies, my colleague using MacOS can immediately compile, package, and test the project without any modifications. This is the power of CMake—simplicity, efficiency, and flexibility.

## Managing Projects with CMake
### Creating a CMake Project
We already have `math.cpp`，and CMake. Let's integrate them. Creating a CMake project involves three steps:

1. Create a folder. Let's name it`math`.
2. Inside the new folder, create a `CMakeLists.txt`file. Note that the filename must remain unchanged. 
3. Configure project information in the newly created `CMakeLists.txt`.

A minimal CMake project requires at least three configurations:

- Minimum supported CMake version

```cmake
cmake_minimum_required(VERSION 3.18.1)
```
- Project name
```cmake
project(math)
```

- Output—whether it's an executable or a library. Since we aim to generate an Android library, the output is a shared library.

```cmake
add_library(${PROJECT_NAME} SHARED math.cpp)
```
After these steps, the CMake project is set up. Next, let's try compiling the project using CMake.

### Compiling a CMake Project
Before actual compilation, CMake has a preparation phase where it collects necessary information to generate a build system. What information is necessary? CMake tries to guess some information to simplify the process.

On Windows, CMake defaults to the Windows platform and generates Visual Studio projects, making it almost zero-config for building Windows libraries.

1.  Create a `build` directory inside the `math` directory and switch to it.

```shell
cd build
cmake ..
```

After executing the command, you'll find Visual Studio projects in the build directory, ready to open and compile without errors. Alternatively, you can use CMake for faster compilation.

2.  Compile using CMake

```shell
cmake --build .
```

Note that `..` refers to the parent directory containing `CMakeLists.txt`, while `.` refers to the current `build` directory. If both commands execute successfully, you'll find a library file in the `build` directory. On Windows, it might be `math.dll`, while on Linux, it could be `math.so`, both being dynamic libraries.

From the above flow, CMake's workflow seems straightforward. However, we used default configurations, meaning the resulting library is only usable on the build platform. To compile an Android library using CMake, we need to manually specify some configurations instead of letting CMake guess.
## Cross-Compilation with CMake
### Where Do Configuration Parameters Come From?
Although we don't know the minimum configuration for cross-compilation, we can make educated guesses.

First, to compile the source code, we need a compiler and linker. As we know, Android has dedicated compilers and linkers, so one configuration should specify which compiler and linker to use.

Second, the Android system version and architecture are essential, as they are crucial for Android applications.

Google has provided a solution—the`CMAKE——TOOLCHAIIIN_FILE` option. This option allows CMake to use a configuration file to replace its guessed parameters. The configuration file is located in the previously mentioned `build/camke`directory, specifically `android.toolchain.cmake`。

### Google's CMake Configuration File

`android.toolchain.cmake`  acts as a wrapper, configuring CMake based on provided parameters and default settings. It's also a great resource for learning CMake techniques. Let's explore the available parameters listed at the beginning of the file:

```cmake
ANDROID_TOOLCHAIN
ANDROID_ABI
ANDROID_PLATFORM
ANDROID_STL
ANDROID_PIE
ANDROID_CPP_FEATURES
ANDROID_ALLOW_UNDEFINED_SYMBOLS
ANDROID_ARM_MODE
ANDROID_ARM_NEON
ANDROID_DISABLE_FORMAT_STRING_CHECKS
ANDROID_CCACHE
```
These parameters aren't direct CMake parameters but are converted into CMake parameters during execution. You can specify their values to achieve different build requirements. If unspecified, default values are used, which may vary between NDK versions.
Let's focus on `ANDROID_ABI` and `ANDROID_PLATFORM`。The former specifies the CPU instruction set, with options like `arneabi-v7a`,`arn64-v8a`,`x86`,`x86_64`,`mips`,`mips64`.The latter specifies the Android version, either as `android-[version]` or `latest`.

To determine valid parameter values, search for the parameter in the file and look for `set` and `if` statements.

### Using the Configuration File for Cross-Compilation
With `CMakelists.txt`,`math.cpp`, and the Android configuration file `android.toolchin.cmake`, how do we combine them?

Previously, we used

```shell
cmake ..
```
to generate the build system. However, it can accept parameters. CMake parameters start with `-D` and are key-value pairs separated by spaces. Most parameters start with `CMAKE`. For example, specifying the `toolchain` file:
```shell
cmake -DCMAKE_TOOLCHAIN_FILE=/home/Andy/Android/Sdk/ndk/21.4.7075529/build/cmake/android.toolchain.cmake
```
This parameter tells CMake to use the specified file for configuration.
However, for cross-compilation, we still need the `-G` option. This option is essential for cross-compilation because CMake doesn't know what type of project to generate. One option is the traditional Makefiles format, specified as

```shell
cmake -G "Unix Makefiles"
```
This format is based on Unix platform Makefiles and uses `make` as the build tool. Another recommended method by Google is  `Ninja`, which is simpler as it doesn't require specifying the `Ninja` path separately since it's installed alongside CMake. `Ninja` focuses on speed, so let's use it here.
```shell
cmake -G Ninja
```
Combining these parameters, the final command becomes

```shell
cmake -GNinja -DCMAKE_TOOLCHAIN_FILE=/home/Andy/Android/Sdk/ndk/21.4.7075529/build/cmake/android.toolchain.cmake ..
```
After generating the project files, execute the build:
```shell
cmake --build .
```
This yields a dynamic library that can run on Android.Using my NDK version, the generated dynamic library supports Android version 21 and the armeabi-v7a architecture. Based on the previous description, we can specify parameters for different builds, such as building an `x86` library for the latest Android version:
cmake -GNinja -DCMAKE_TOOLCHAIN_FILE=/home/Andy/Android/Sdk/ndk/21.4.7075529/build/cmake/android.toolchain.cmake -DANDROID_PLATFORM=latest -DANDROID_ABI=x86 ..
```
This approach can be applied to third-party libraries managed by CMake when no build instructions are provided.
## JNI
With CMake's help, we've obtained the `libmath.so`dynamic library, but it still can't be directly used by Android applications. Android apps are developed in Java (or Kotlin), which run on the JVM. To use this library, we need a way to load it into the JVM and access it. This capability is provided by JNI.
### Basic Idea of JNI
JNI enables bidirectional access between Java and C/C++. Both directions involve the JVM, which plays a crucial role. Understanding JNI requires thinking from the JVM's perspective.

The JVM acts like a distribution center where goods (methods/functions) are first collected and then distributed to their destinations. Unlike ordinary shipping, these goods don't know their destination and rely on the center to find it. To ensure uniqueness, goods must self-identify uniquely.

Java has mechanisms to ensure uniqueness:
1. Package names ensure class uniqueness.
2. Class names ensure uniqueness within packages.
3. Method names ensure uniqueness within classes.
4. Overloaded methods are distinguished by parameter types and counts.

For C/C++, lacking package and class names, method names and parameters alone aren't sufficient for uniqueness. Adding package and class names as constraints resolves this issue.

There are two ways to add these constraints: one is straightforward, directly incorporating the package and class names into the function name. This way, the JVM doesn’t need to look at anything else; it can simply match the package name, class name, function name, and parameters to determine the corresponding method. This method is called static registration. It’s similar to static registration of broadcasts in Android: static broadcast registration is done directly in the `AndroidManifest`  file without needing configuration in the code, making it effective immediately. Corresponding to static registration, there is also dynamic registration. Dynamic registration involves using code to inform the JVM about the correspondence between functions rather than letting it search during function calls. Clearly, this approach offers faster invocation speeds because only one registration is needed, allowing direct access to the counterpart in subsequent calls without additional searches. However, like dynamic registration of broadcasts in Android, dynamic registration is more complex and requires careful timing to avoid invocation failures. We will continue with our previous example of `libmath.so`.

### Using Native Libraries in Java
Accessing C/C++ functions from Java is simple and involves three steps:

1. Call the `System.loadLibrary()` method in Java to load the library.

```java
System.loadlibrary("math.so");
```

Note that the dynamic library generated by CMake is named `libmath.so`,but here only `math.so` is used, meaning the `lib` prefix is not required. After executing this step, the JVM knows about the `plus` function.

2. Declare a `native`  method in Java that corresponds to the C++ function. The parameter list and return type should match, but the method name does not have to be the same.

```java
public native int nativePlus(int left,int right);
```

Typically, it is customary to prefix `native` methods with.

3. Call this `native` method wherever needed. The invocation is the same as calling regular Java methods, passing matching parameters and receiving the return value with a matching type.

Combining these steps into a single class looks like this:
```java
package hongui.me;

import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import hongui.me.databinding.ActivityMainBinding;

public class MainActivity extends AppCompatActivity {

    static {
        System.loadLibrary("me");
    }

    ActivityMainBinding binding;

    private native int nativePlus(int left,int right);

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        // Example of a call to a native method
        binding.sampleText.setText("1 + 1 = "+nativePlus(1,1));
    }
}
```

### Introducing JNI in C/C++
JNI essentially serves as an adapter layer for C/C++, primarily handling function conversion without implementing specific functionality. Therefore, we typically create a new source file dedicated to handling JNI-related issues, with the main focus being on method registration.

#### Static Registration
The basic idea of static registration is to write a C/C++ function signature that matches the existing Java `native` method. Specifically, this involves four steps:

1. Write a function signature identical to the Java `native`function.


```c
int nativePlus(int left,int right)
```

2. Prepend the package and class names to the function name. Since package names in Java use `.`  as separators, which can cause compilation errors in C/C++, replace `.` with `_`.
```c
hongui_me_MainActivity_nativePlus(int left,int right)
```

3. Convert the function parameters. All operations are based on the JVM environment in Java, but C/C++ lacks this environment. To provide it, add two parameters at the beginning of the parameter list. The smallest environment in Java is the thread, so the first parameter represents the thread environment object `JNIEnv`, which is the only channel for C/C++ to access Java. The second parameter represents the calling object or class, with the type `jobjet`. From the third parameter onward, the parameter list matches the Java side, but some types do not exist in C/C++. For our current example, the `int` type in Java corresponds to `jint`. This step is critical; any parameter conversion failure may cause the program to crash.
```c
hongui_me_MainActivity_nativePlus(
        JNIEnv* env,
        jobject /* this */,
        jint left,
        jint right)
```

4. Add necessary prefixes. This step is easily overlooked because it is not intuitive. First, add the prefix `Java` to the function name, resulting in `Java_hongui_me_MainActivity_nativePlus`. Next, add `JNIEXPORT` and `JNICALL` around the return type. Here, the return type is `jint`, so after adding these macros, it becomes `JNIEXPORT jint JNICALL`Finally, add the `extern "C"` compatibility directive at the beginning. Readers interested in why this is necessary can learn more; in brief, it adheres to JNI specifications.

After these four steps, the final C/C++ function signature for static method lookup becomes:

```c
#include "math.h"

extern "C" JNIEXPORT jint JNICALL
Java_hongui_me_MainActivity_nativePlus(
        JNIEnv* env,
        jobject /* this */,
        jint left,
        jint right){
           return plus(left,right);
        }
```
Notice that I changed `math.cpp` to `math.h`and called this function in the JNI adapter file (named `native_jni.cpp`). So now we have two source files and need to update `CMakeList.txt`.
```cmake
cmake_minimum_required(VERSION 3.18。1)

project(math)

add_library(${PROJECT_NAME} SHARED native_jni.cpp)
```
We only changed the filename in the last line because the directory containing `CMakeLists.txt`  is also the `include` search path, so no separate settings are needed. If you need to add header files from other locations, use `include_directories(dir)`.

Now recompile using CMake to generate the dynamic library, and this time Java can run without errors.
#### Dynamic Registration
As mentioned earlier, dynamic registration requires attention to the registration timing. What constitutes good timing? In the section on using native libraries in Java, we learned that to use a library, it must be loaded first, and after successful loading, JNI methods can be called. Therefore, dynamic registration must occur after loading and before usage. JNI conveniently provides the `jint JNI_OnLoad(JavaVM *vm, void *reserved)`function, which is called immediately after the library is loaded. This method provides a key `JavaVM` object, making it the ideal entry point for dynamic registration. Note that dynamic and static registration are two ways to implement JNI functions in C/C++; generally, only one method is used for a given function. So, the following steps are parallel to static registration, not sequential.

Dynamic registration involves six steps:

1. Create a `native_jni.cpp` file and the implementation of the `JNI_OnLoad()` function.

```c
extern "C" JNIEXPORT jint JNICALL
JNI_OnLoad(JavaVM *vm, void *reserved) {

   return JNI_VERSION_1_6;
}
```

This is the standard form and implementation of this function. The key points are the function name, parameters, and return value. To have this function automatically called after library loading, the function name must be this, and the parameter format cannot change. The return value informs the JVM of the current JNI version. Essentially, these are templates that can be copied directly.


2. Obtain the `JNIEnv` object.

As mentioned earlier, all JNI-related operations are performed through the `JNIEnv` object, but currently, we only have a  `JavaVM` object. The secret lies in the `JavaVM` object.
Use its `GetEnv` method to obtain the `JNIEnv` object.
```c
JNIEnv *env = nullptr;
vm->GetEnv(env, JNI_VERSION_1_6);
```
3. Find the target class.

As previously stated, both static and dynamic registration require package and class names for constraints, just in different formats. For dynamic registration, replace `_` with `.`. So the final class format is `hongui/me/MainActivity`. This is a string format. How do we convert it to the `jclass` type in JNI? This is where the `JNIEnv` object comes in.

```c
jclass cls=env->FindClass("hongui/me/MainActivity");
```

this `cls` object corresponds one-to-one with the `MainActivity` in Java. With the class object, the next step is to handle the method.

4. Generate an array of JNI function objects.

Since dynamic registration can register multiple methods of a class simultaneously, the registration parameter is an array of type `JNINativeMethod`. This type links the Java-side native method with the JNI method. Its structure is as follows:

```c
typedef struct {
const char* name;
const char* signature;
void* fnPtr;
} JNINativeMethod;
```

- `name` corresponds to the name of the `native` method on the Java side, so this value should be `nativePlus`。
- `signature` corresponds to the parameter list and return type signature of this  `native` methoid.

What is a signature? It is a shorthand for types. In Java, there are eight primitive types, methods, objects, classes, arrays, etc., each with a corresponding string representation. For example, `jint` is the actual JNI type, and its signature is `I`, the uppercase first letter of `int`.

Functions also have their own signatures `(paramType)returnType`,when `paramType` and `returnType` are JNI type signatures without any delimiters.

Thus, the signature for `nativePlus` is `(II)I`: two integer parameters returning another integer.

- `fnPtr` is indeed a function pointer, pointing to the actual implementation of  `nativePlus` (here we assume it is   `jni_plus`).


In summary, the final function object array should look like this:

```c
 JNINativeMethod methods[] = {
    {"nativePlus","(II)I",reinterpret_cast<void *>(jni_plus)}
 };
```
5. Register the methods.

With the `jclass` and `JNINativeMethod` array ready, we can register the methods using the `RegisterNatives` function of the `JNIEnv` object.

```c
env->RegisterNatives(cls,methods,sizeof(methods)/sizeof(methods[0]));
```
这里第三个参数是代表方法的个数，我们使用了`sizeof`操作法得出了所有的`methods`的大小，再用`sizeof`得出第一个元素的大小，就可以得到`methods`的个数。当然，这里直接手动填入1也是可以的。

6. 实现JNI函数
在第4步，我们用了个`jni_plus`来代表`nativePlus`的本地实现，但是这个函数实际上还没有创建，我们需要在源文件中定义。现在这个函数名就可以随便起了，不用像静态注册那样那么长还不能随便命名，只要保持最终的函数名和注册时用的那个名字一致就可以了。但是这里还是要加上`extern "C"`的前缀，避免编译器对函数名进行特殊处理。参数列表和静态注册完全一致。所以，我们最终的函数实现如下。

```c
#include "math.h"

extern "C" jint jni_plus(
        JNIEnv* env,
        jobject /* this */,
        jint left,
        jint right){
           return plus(left,right);
        }
```

Well, the implementation form of dynamic registration is also complete. After CMake compilation, you will find that the result is exactly the same as static registration. Therefore, the choice between these two registration methods depends entirely on personal preference and requirements. When `native` methods need to be called frequently, I believe dynamic registration has an advantage. However, if the call frequency is low, static registration can be used directly, as the lookup overhead is negligible.
## One more thing
The seamless and smooth configuration with Gradle. Under the `android` build block, you can directly configure the path and version information of `CMakeLists.txt`.

```groovy
externalNativeBuild {
        cmake {
            path file('src/main/cpp/CMakeLists.txt')
            version '3.20.5'
        }
    }
```
Similarly, whether you modify C/C++ code or Java code later, you can simply click run. Gradle will compile the corresponding libraries and copy them to the final directory for you, eliminating the need to manually compile and copy library files. Of course, if you are not satisfied with its default behavior, you can configure the default behavior via `defaultConfig`. Its configuration might look something like this:
```groovy
android {
    compileSdkVersion 29

    defaultConfig {
        minSdkVersion 21
        targetSdkVersion 29

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
        consumerProguardFiles 'consumer-rules.pro'

        externalNativeBuild {
            cmake {
                cppFlags += "-std=c++1z"
                arguments '-DANDROID_STL=c++_shared'
                abiFilters 'armeabi-v7a', 'arm64-v8a'
            }
        }
    }
}
```
Here, `cppFlags` is used to specify C++ related parameters, and there is a corresponding `cFlags` for specifying C-related parameters. `arguments` are used to specify CMake compilation parameters. The last one refers to the number of architecture packages the library will ultimately be compiled into; in our case, we are only generating two.

With these configurations, developing NDK in Android Studio feels just like developing Java. You get intelligent code suggestions, instant compilation, and immediate execution, providing a seamless and smooth development experience.

## Summary
NDK development can actually be divided into two parts: C++ development and JNI development.

C++ development is identical to C++ development on a PC. You can use standard libraries and reference third-party libraries. As the project scales, CMake is introduced to manage the project, which offers significant advantages for cross-platform projects and seamlessly integrates with Gradle.

JNI development, on the other hand, focuses more on the correspondence between the C/C++ side and the Java side. Each `native` method in Java must have a corresponding C/C++ function. JNI provides two methods for this: static registration and dynamic registration. Both methods ensure uniqueness using the package name, class name, function name, and parameter list. Static registration embeds the package and class names in the function name, while dynamic registration uses class objects, native method objects, and `JNIENV` registration methods to achieve uniqueness.

The NDK acts as the big boss behind the scenes, providing tools like compilers and linkers for cross-compilation, as well as system libraries such as `log`, `z`, and `opengl` for direct use.