# Fork-to-Finish
From start to finish - a boilerplate for an MVC style project in NodeJS!

Tired of hunting through a labrynthian server.js file looking for what you named your api routes?  Trying to make sure your business logic is properly applied to every database interaction? Check out 'fork to finish' -- a MERN stack starter kit designed to strongly separate concerns. This MVC layout is intended to make it easier for teams to zero in on the exact code they need to work on. 

## Installation Steps
1) Fork and clone this repository to your local machine
2) Ensure you have an instance of mongoDB running on your machine
3) In the 'config' directory, follow the example shown in 'config' to create your own local configuration object. (Make sure this file is in your .gitignore!)
    * ```hostname```: name of the host the server is running on
    * ```port```: which port to use
    * ```databaseRef```: mongo URI to your local db
4) Run the project using ```npm start```

## Diagram
![alt text](documentation/design-overview.png "Design Overview - Subject to Change")
