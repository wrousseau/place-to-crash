place-to-crash
==============

PlaceToCrash web application, powered by sails.js.
It aims at providing a web interface for the application, as well as a RESTful API available to the mobile applications.

Application Description
-----------------------
PlaceToCrash will provide a way to easily spot places where your close friends live at the moment. It should thus allow you to planify road trips, by hopefully visiting several friends while on the road. It could also provide you for a place to crash when on a business trip, when you're far from home, or when you'd just rather not spend a fortune on a hotel.

Technical Details
-----------------
The project is only getting started, but the friendship relations shall be managed by the Graph Database Neo4J, and the application eventually will be launched on Heroku.

Prerequisites
-------------
PlaceToCrash requires [node.js](http://nodejs.org/) and npm, its package manager. 

For front-end package management, PlaceToCrash relies on Bower and Grunt tasks. For the back-end, PlaceToCrash relies on the Sails.js framework. To use these, install them globally (try sudo if you're getting an error) :

    npm install -g grunt-cli
    npm install -g bower
    npm install -g sails

Finally, PlaceToCrash's Graph Database is Neo4j, which requires to be installed and launched on your local machine (requires Java JDK). For all platforms, instructions are available on their [official website](http://www.neo4j.org/download). For MacOS X using Homebrew, simply run :

    brew update
    brew install neo4j
    neo4j start

Installation and Configuration
------------------------------

    npm install && grunt bower

should install all the needed packages and handle front-end packages, including sails itself and 

The setup for giving your credentiels should be made in config/adapters.js for a production setup and in config/local.js for a development setting. 

Because this file is included in the .gitignore by default, we have added a config/.local.js which you can copy (then edit to reflect your configuration) using 

    cp config/.local.js config/local.js

Current values should be relevant is you followed the default neo4j installation.

Running
-------

    sails lift

Should launch the server on the port specified in config/local.js (if added)

Licence
-------
PlaceToCrash is licence under the Apache v.2 (commercial friendly basically).

