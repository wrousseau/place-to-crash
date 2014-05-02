place-to-crash
==============

PlaceToCrash web application, powered by sails.js.
It aims at providing a web interface for the application, as well as a RESTful API available to the mobile applications.

Application Description
-----------------------
PlaceToCrash will provide a way to easily spot places where your close friends live at the moment. It should allow you to easily planify road trips, by hopefully visiting several friends while on the road. It could also easily provide you for a place to crash when on a business trip or when you're far from home, when you'd rather not spend a fortune on a hotel.

Technical Details
-----------------
The project is only getting started, but the friendship relations shall be managed by the Graph Database Neo4J, and the application shall eventually be launched on Heroku.

Prerequisites
-------------
PlaceToCrash requires [node.js](http://nodejs.org/) and npm, its package manager. Running 

    npm install

should install all the needed packages, including sails itself.

PlaceToCrash's Graph Database uses Neo4j, which requires to be installed and launched on your local machine (requires Java JDK). For all platforms, instructions are available on their [official website](http://www.neo4j.org/download). For MacOS X using Homebrew, simply use :

    brew update
    brew install neo4j
    neo4j start

The setup for giving your credentiels should be made in config/adapters.js for a production setup and in config/local.js for a development setting. Default values should be relevant if you followed the basic neo4j installation.

Licence
-------
PlaceToCrash is licence under the Apache v.2 (commercial friendly basically).

