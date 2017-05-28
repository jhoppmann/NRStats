INSTALLATION

Note: Minimal experience with setting up a webserver and a database server is required (or knowing how to use Google).

1. Install a webserver with support for PHP 5.4 or greater
2. Put the contents of the WebContent folder somewhere on your server, like a nrstats folder
3. Install a database server that is supported by PHP (like MySQL or MariaDB)
4. Create a user and a database for NRStats
5. Enter your database connection info into config_empty.inc.php
6. Rename config_empty.inc.php to config.inc.php
7. Point your browser to (your installation folder)/scripts/install.php
8. If install.php showed no errors, delete it
9. Point your browser to where you installed NRStats
10. Enjoy!

LICENSE AND COPYRIGHT
NRStats © 2017 Jan Hoppmann
NRStats is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
What this means is that you can use NRStats as long as you don't make any money off it, and built your own versions on top of it as long as you use the same license (and don't charge money).
Also, you are required mention that it is my work you're using.
The whole of the license can be found here: https://creativecommons.org/licenses/by-nc-sa/4.0/ 

In addition to that, you use this software at your own risk. If your database gets fried, someone abuses the provided interfaces or some kind of eldritch horror eats off your face because you dare to use NRStats, I'm not liable.

ADDITIONAL INFO
Security: 
NRStats doesn't come with any security features. Try using .htaccess or similar protection. Or use it in your home intranet (Raspberry Pis work great for that).
There are, however, provisions so that the page is not indexed on search engines (a robots.txt and a meta tag).

Software Stacks:
If you want to set up an environment to run this, but are not sure what to get, there are packages containing all the software you need.
You can use XAMPP on Windows, Linux and Mac, and it comes with a webserver (Apache), a PHP interpreter and a database (MariaDB). You can get XAMPP here: https://www.apachefriends.org/index.html

Compatibility:
NRStats was tested in Konqueror 4.14.25 and Google Chrome 54.0.2840.59 (64-bit). It should also work in most other modern browsers, but I don't guarantee that it will.

DONATIONS
I don't want to charge money for using NRStats (because I'm a fan of free software), but if you want to donate money, there's a PayPal donation button when you click on "ABOUT NRSTATS" in the footer.

NETRUNNER
Netrunner is a trademark and copyrighted by Fantasy Flight Games and / or Wizards of the Coast.
This software is not produced, endorsed, supported or affiliated with Fantasy Flight Games and / or Wizards of the Coast.
