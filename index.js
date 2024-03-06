import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const API_URL = "http://www.omdbapi.com/";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res)=>{
    res.render("index.ejs");
});

app.post("/search", async (req, res)=>{
    try{
        const movieName = req.body.movieName;
        if(movieName.trim() === ""){
            res.redirect("/");
        }
        const responce = await axios.get(API_URL, {
            params: {
                apikey: "f563417b",
                t: movieName,
            }
        });
        res.render("index.ejs", { content: responce.data });
    } catch(error){
        res.status(404).send(error.message);
    }
});

app.listen(port, ()=>{
    console.log(`App started at port ${port}`);
});