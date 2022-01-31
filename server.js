const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static('Develop/public'));
// Parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// Parse incoming JSON data
app.use(express.json());


app.post('/api/notes', (req, res) => {
    // req.body is where our incoming content will be
    console.log(req.body);
    fs.readFile('./Develop/db/db.json', (err, data) => {
        if (err) throw err;
        let notes = JSON.parse(data);
        notes.push(req.body);
        console.log(notes);

        fs.writeFile('./Develop/db/db.json', JSON.stringify(notes), (err) => {
            if (err) throw err;
            console.log('Added note!');
            res.json(req.body);
        });   
    });
    
});


app.get('/api/notes', (req, res) => {

    fs.readFile('./Develop/db/db.json', (err, data) => {
        if (err) throw err;
        let notes = JSON.parse(data);
        console.log(notes);
        res.json(notes);
    });
    
  });
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html'));   
});  
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/index.html'));
});        

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
    
});