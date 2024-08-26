
//import all dependencies
import express from "express";
import axios from "axios";
import pg from "pg";
import { credentials } from "./credential.js";


//provide the login information foor pgadmin
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "BookList",
    password: credentials,
    port: 5432,
  });
  


  // creating the necesary information to use Express.
  const app = express();
  const port = 3000;
  


  // created an empty aray to be filled by the database
  let books = [];



  //leting it know it hsould use the style file on the public folder.
  app.use(express.static("public"));


//conects to the data base
  db.connect()
  .then(() => console.log('Conected to the database'))
  .catch(err => console.error('Could not conect to the database', err.stack));




  //allowing the user to view the index.ejs once it has loaded.
  app.get("/", async (req, res) => {
    try {

      //with this line of code I can acces the datbase and share the information stored
        const result = await db.query("SELECT * FROM booklist ORDER BY id ASC");
        books = result.rows;

        
        // console.log(result.rows);
      
        //renders index.ejs as a response
        res.render("index.ejs", {
            bookList: books,
        });
    }catch (err) {
        console.log(err);
      }
    
  });


//allows the user to go to the add a new book section
  app.get("/add", async (req,res) => {
    res.render("add.ejs");
  })


// allows to analyze data from the form
  app.use(express.urlencoded({ extended: true })); 

  //allows us to use the information on the json
  app.use(express.json());  

app.post("/add", async (req,res) => {

  //captures each individual value to add to the database
  const nameOfBook = req.body.bookName;
  const author = req.body.author;
  const genre = req.body.genre;
  const isbn = req.body.isbn;
  const yearRead = req.body.yearread;
  const rating = req.body.rating;
  const description = req.body.description;

  //verify each value
  console.log("Name of the Book: " + nameOfBook);
  console.log("Author: " + author);
  console.log("Genre: " + genre);
  console.log("ISBN: " + isbn);
  console.log("Year the Book was Read: " + yearRead);
  console.log("Rating: " + rating);
  console.log("Description: " + description);


  //adds the information capture to the database
  try {
    await db.query("INSERT INTO booklist (bookname, author, genre, isbn, yearread, rating, description) VALUES ($1, $2, $3, $4, $5, $6, $7)", 
      [nameOfBook, author,genre,isbn, yearRead, rating, description]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});



//this takes the user to the book edition/delete section
app.get("/edit", async (req,res) => {
  res.render("edit.ejs");
})


// allows the user to edit a existing book within the data base
app.post("/edit", async (req,res) => {

  // provide each individual variable their corresponding value
  var isbn = req.body.isbn;
  var bookName = req.body.bookName;
  var author = req.body.author;
  var genre = req.body.genre;
  var yearRead = req.body.yearread;
  var rating = req.body.rating;
  var description = req.body.description;


  // console.log("this is isbn; " + isbn + " and this is the value of bookName: " + bookName);

// updates the information provided by the user
  try {
    await db.query("UPDATE booklist SET bookname = $1, author = $2, genre = $3, yearread = $4, rating = $5, description = $6 WHERE isbn = $7", 
      [bookName, author, genre, yearRead, rating, description, isbn ]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }

});


//delets a book form the data base
app.post("/delete", async (req, res) => {
//captures the desires book to be deleted ISBN
  const bookIsbn = req.body.isbn;

  // console.log( "this is the value of bookIsbn: " + bookIsbn);

  // sends the comand to the data base to delete the desired book
  try {
    await db.query("DELETE FROM booklist WHERE isbn=$1", [bookIsbn]);
    res.redirect("/");
  }catch (err) {
    console.log(err);
  }
});



  //Informs that the conection has been made
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  