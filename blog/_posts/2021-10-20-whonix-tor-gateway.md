---
title: "Whonix: Software That Can Anonymize Everything You Do Online"
published: true
date: 2021-10-20 00:00:01
tags: [Whonix, Privacy, Anonymity, Tor, Linux, Advanced]
image: /blog/assets/whonix-logo.png
description: "What is Whonix Tor gateway and how to use it?"
---

![](/blog/assets/whonix-logo.png)

<br>
### Whonix[^1] Tor Gateway
* * *
You can anonymize all of your web requests by using Whonix Tor Gateway[^2]. You download and use a Whonix VirtualBox VM which is a hardened Linux distro and this VM can act as your Tor gateway for all of your web requests, it is great because it prevents possible DNS and IP leaks which can happen with most of VPNs and it also uses Tor network.

<br>
### Using Whonix Tor Gateway with your VMware Workstation VMs
* * *
Whonix Tor gateway VM is a VirtualBox VM, you can use it with other VirtualBox VMs without any configuration but in order to use it with your VMware VMs you must set up your Whonix VM network and VMware network like the following:

First set up the necessary Whonix VM network adapters:

Don't change this default network adapter:

![](/blog/assets/whonix1.png)

Add a secondary network adapter or edit it like this if it already exists:

![](/blog/assets/whonix2.png)

Next step is to be able to use this network in VMware workstation:

Go to Edit -> Virtual Network Editor... and add a new network like the selected one in the picture:

![](/blog/assets/vmware1.png)

Now you can use Whonix Tor Gateway in your VMware VMs. Just do the network config necessary to connect to this network in each of your VMs that you want to use this Tor gateway. You must set IP,Netmask and Gateway according the network that is set in your Whonix, Your Gateway address is the Whonix Tor Gateway IP, and also set your DNS settings according to Whonix Tor gateway.

After connection, use: WhatIsMyIPAddress[^3] and DNSLeakTest[^4] to make sure that you are using Tor gateway and there's no info leak.

<br>
### Tips
* * *
1. You must pay attention that this does not prevent browser leak and user mistakes that may happen while using web.

2. Read every Whonix Document that you can! They are great and feel like the best possible classroom for anyone in any level of knowledge! Besides Whonix setup itself, they can teach you a lot about different technical aspects of digital privacy and anonymity and related risks that exist. Most of them are highly technical and only suitable for advanced users.

3. There are many ways to set up Whonix. Use Whonix Documentation[^5] for more info.  

<br>
### _References_
* * *
[^1]: [Whonix Website](https://www.whonix.org/)
[^2]: [Whonix Tor Gateway Download](https://www.whonix.org/wiki/Download)
[^3]: [WhatIsMyIPAddress Website](https://whatismyipaddress.com/)
[^4]: [DNSLeakTest Website](https://dnsleaktest.com/)
[^5]: [Whonix Documentation](https://www.whonix.org/wiki/Documentation)
