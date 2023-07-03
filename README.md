
# Movies-Library - 1.0.0

**Author Name**: Farah Elaydi

## WRRC
![wrrcImage](./img/wrrc.png)
![3rdParty](./img/3rd.jpg)
![DB](./img/DB.png)
![DB14](./img/DB14.png)


## Overview

## Getting Started
END POINT : 
> 1-  Localhost:3000/
> 2-  Localhost:3000/favorite/
> 3-  Localhost:3000/trending
> 4-  Localhost:3000/search/title=
> 5-  Localhost:3000/personList
> 6-  Localhost:3000/popularSeries
> 7- Localhost:3000/addMovies
> 8- Localhost:3000/getMovies
> 9- Localhost:3000/update/id
> 10- Localhost:3000/delete/id
> 11- Localhost:3000/getOneMovie/id

ERROR : 
> 1-  Localhost:3000/anyEndPoint  ----> **Error404 Page Not Found**
> 2- Localhost:3000/error    ---->  **Error 500 Sorry, something went wrong**

## Project Features
First, we begin by initiating the server and establishing a connection between the server and another entity such as a client, application, or another server. To prevent unnecessary files from being pushed to Git, we utilize the .gitignore file. When downloading the Movies-Library Repository, all you need to do is execute the command "npm install" The package.json file contains all the necessary packages in the dependencies section, so there is no need to install each package individually.

- In today's lab, we learned about using middleware in our server by utilizing the use method. This allows us to incorporate additional functionality and processing for incoming requests. We also explored how to access data from a third-party server by utilizing the axios package. This package enables us to send HTTP requests from our server to the third-party server and retrieve the response. To handle asynchronous operations and avoid blocking the JavaScript code, we made use of async and await. This allows us to wait for a time-consuming function to complete before proceeding with a simpler function, ensuring smooth execution of our code.

-In Lab 13, we began working with databases using the "pg" package and employed the PostgreSQL database management system (DBMS) to create our database. We learned how to create a database and create tables within it. Additionally, we explored CRUD operations (CREATE, READ, UPDATE, DELETE) to interact with the data stored in our tables. We gained the ability to retrieve data, update existing data, and delete data from the tables we created.


- In Lab 14, we performed data updates in the database based on a unique column, which is the 'id' column. We updated specific data depending on the id number of the row. Additionally, we implemented data deletion based on the id number, allowing us to remove specific rows. Furthermore, we utilized the 'params' feature to access specific rows by their id. Overall, Lab 14 focused on manipulating and interacting with data in the database using the id column as a key