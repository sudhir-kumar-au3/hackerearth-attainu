const express  =require("express");
const app = express();
const cors = require('cors');
require("dotenv").config();
const bodyParser = require('body-parser');
const csvtojson  =require("csvtojson");
const paginate =require('jw-paginate');
// db connection
const MongoClient = require("mongodb").MongoClient;
let url;
if(process.env.DB_URL) url = process.env.DB_URL;
else url ="mongodb://localhost:27017";

var db;
MongoClient.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) throw error;
    db = client.db("hacker-earth");
    initializeDb (db);
  }
);
// dumping CSV to database

let initializeDb = db => {
    let collection = db.collection('ted-data');
    collection.countDocuments()
    .then(res => {
        if(res == 0){
            csvtojson()
            .fromFile('./TED-22kData.csv')
            .then(data => {
                collection.insertMany(data, (error,result) =>{
                    if(error) throw error;
                    console.log(`Inserted ${result.insertedCount} rows`);
                })
            })
            .catch(error => console.error("csvToJSON error: ",error))
        }
        else{
            console.log(`data already dumped : data-count: ${res}`);
        }
    })
    .catch(error => console.error("error: ", error));
}
// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


// app routes
app.get('/', (req, res) => {
    db.collection('ted-data').find({}).toArray((error, result) => {
        if (error) throw error;
        // res.status(200).json(result)
        res.send('ok')
    })
});

app.get('/api/data', (req, res, next) => {
    db.collection('ted-data').find({}).toArray((error, result) => {
        if (error) throw error;
        const page = parseInt(req.query.page) || 1;
        const pager = paginate(result.length, page);
        const pageOfData = result.slice(pager.startIndex, pager.endIndex +1)
        console.log(pager)
        res.json({pager, pageOfData});
    })
});

// 404 handling
app.get('/*', (req, res) => {
	res.status(404).send("<h1 align='center'>Page Not Found</h1>")
});

// connection port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});