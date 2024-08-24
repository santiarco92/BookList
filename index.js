
//IMPORT ALL DEPENDENCIES.
import express from "express";
import axios from "axios";
import pg from "pg";
import { credentials } from "./credential";

//PROVIDE THE LOGIN INFORMATION.
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Permalist",
    password: credentials,
    port: 5432,
  });
  
  // creating the necesary information to use Express.
  const app = express();
  const port = 3000;
  
  app.use(bodyParser.urlencoded({ extended: true }));

  //leting it know it hsould use the style file on the public folder.
  app.use(express.static("public"));



  //allowing the user to view the index.ejs once it has loaded.
  app.get("/", async (req, res) => {

    res.render("index.ejs");
  });



  //Informs that the conection has been made
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  