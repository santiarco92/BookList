the following project is part of a boot camp intended to teach their students about web development, allowing them to become full-stack developers. As a project for this boot camp, we are required to create a project following these instructions: 

**Objectives**

Revise how to integrate public APIs into web projects.
Gain more experience using Express/Node.js for server-side programming.
Demonstrate ability to Create Read Update and Delete data in a PostgreSQL Database to persist data.

**Example Ideas**

Use the Open Library Covers API to fetch book covers.
Create a database to store books you have read.
Have a way to add new data about books, update previous reviews, and delete entries.
Display this information from your database on a website like https://sive.rs/book
Be able to sort your book entries by rating and recency.


**Project information:**

this project uses HTML 5, CSS, bootstrap, JavaScript, node.js, express.js, Axios, SQL, and Postgres to create a booktraker. in this repository you will find the following:


- a folder named public where you will find the Style.css file
- a folder named views where you will find all of the EJS files for this project
- an index.js that handles all of the server requests and information shared with the user
- and a package Jason with all of the project's dependencies.


to access this project you will need to follow these steps:

1 - clone this repository to your local repository
2 - and install all of the dependencies using the command npm i
3 - adjust the Postgres credentials with your password in the index.js file
4 - create your database on Postgres using the following command: 

“CREATE TABLE booklist (
	id SERIAL UNIQUE PRIMARY KEY,
	bookname VARCHAR(150),
	author VARCHAR(150),
	isbn BIGINT,
	genre VARCHAR(60),
	yearread INT,
rating INT,
description VARCHAR(600)
);

5 - After the table is created, you can open your Vscode, run nodemon on your index.js, and start adding your books. 
