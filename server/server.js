const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const Issue = require('./issue');

const app = express();
let db;

app.use(express.static('static'));

app.get('/api/issues', (req,res) =>{
    db.collection('issues').find().toArray()
    .then(issues =>{
        const metadata = {total_count: issues.length};
        res.json({_metadata: metadata, records: issues})
    }).catch(err =>{
        console.log('ERROR', err);
        res.status(500).json({message:`Internal Server Error: ${err}`});
    })
});

app.post('/api/issues', (req,res) =>{
    const newissue = req.body;
    console.log(newissue);
    newissue.date = new Date();
    
    const err = Issue.validate(newissue);
    if(err){
        res.status(422).json({message: `Error: ${err}`});
        return;
    }

    db.collection('issues').insertOne(newissue).then(insertedId => {
        db.collection('issues').find({_id:insertedId}).limit(1).next();
        return;
    }).then(insertedIssue => {
        res.json(insertedIssue);
    }).catch(error => {
        console.log(error);
        res.status(500).json({message:`Internal server error ${error}`});
    })

})


MongoClient.connect('mongodb://localhost:27017',{useNewUrlParser:true}).then(client => {
    db = client.db('mern');
    app.listen(3000,()=>{
        console.log('App started in port 3000')
    })
}
).catch(err => {
    console.log('ERROR',err);
})