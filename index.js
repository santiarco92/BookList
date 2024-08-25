
//IMPORT ALL DEPENDENCIES.
import express from "express";
import axios from "axios";
import pg from "pg";
import { credentials } from "./credential.js";

//PROVIDE THE LOGIN INFORMATION.
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
  
  
  let books = [];

  //leting it know it hsould use the style file on the public folder.
  app.use(express.static("public"));

  db.connect()
  .then(() => console.log('Conected to the database'))
  .catch(err => console.error('Could not conect to the database', err.stack));

  //allowing the user to view the index.ejs once it has loaded.
  app.get("/", async (req, res) => {
    try {

      //with this line of code I can acces the datbase and share the information stored
        const result = await db.query("SELECT * FROM booklist ORDER BY id ASC");
        books = result.rows;

        
        console.log(result.rows);
      
        res.render("index.ejs", {
            bookList: books,
        });
    }catch (err) {
        console.log(err);
      }
    
  });


  //Allowing the add button to take the user to the /add section.



  app.get("/add", async (req,res) => {
    res.render("add.ejs");
  })



  //Informs that the conection has been made
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  