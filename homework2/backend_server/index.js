const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");
const app = express();
const jsonParser = bodyParser.json()
const http = require('http');
const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

const config = require('config');
const apiKey = config.get('api.key');

app.use(cors(corsOptions))

app.get('/books', (req, res) => {
    let books = '';
    const request = http.request('http://localhost:7777/api/books', (response) => {
        response.setEncoding('utf8');

        response.on('data', (chunk) => {
            books += chunk;
        });

        response.on('end', () => {
            let booksArray = JSON.parse(books);
            res.status(200).send(booksArray);
        });
    });

    request.on('error', (error) => {
        res.status(500).send();
        console.error(error);
    });

    request.end();
});

app.get('/books/:id', (req, res) => {
    const id = req.params.id;

    let book = '';

    const request = http.request(`http://localhost:7777/api/books/${id}`, (response) => {
        response.setEncoding('utf8');

        response.on('data', (chunk) => {
            book += chunk;
        });

        response.on('end', () => {
            let myBook = JSON.parse(book);
            res.send(myBook);
        });

    });

    request.on('error', (error) => {
        res.status(500).send();
        console.error(error);
    });

    request.end();
});

app.post('/books/add', jsonParser, async (req, res) => {

    let result = await fetch("http://localhost:7777/api/books/add", {
        method: "POST",
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(req.body)
    });

    if(result.status === 201){
        res.status(201).send();
    } else{
        res.status(500).send();
    }
});

app.delete('/books/remove/:id', async (req, res) => {
    const id = req.params.id;

    let result = await fetch(`http://localhost:7777/api/books/remove/${id}`, {
        method: "DELETE",
    });

    if(result.status === 200){
        res.status(200).send();
    } else{
        res.status(500).send();
    }
});

app.put('/books/update/:id', jsonParser, async (req, res) => {
    const id = req.params.id;

    let result = await fetch(`http://localhost:7777/api/books/update/${id}`, {
        method: "PUT",
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(req.body)
    });

    if(result.status === 200){
        res.status(200).send();
    } else{
        res.status(500).send();
    }
});

app.get('/define/:word', async (req, res) => {
    const word = req.params.word;

    //console.log(word);

    const options = {
        method: 'GET',
        url: `https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`,
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        if (response.status === 200) {
            res.status(200).send(response.data.definitions);
        }
    }).catch(function (error) {
        console.error(error);
        res.status(400).send();
    });
});

app.get('/number-fact/:number', (req, res) => {
    const number = req.params.number;
   // console.log(number);

    const options = {
        method: 'GET',
        url: `https://numbersapi.p.rapidapi.com/${number}/math`,
        params: {fragment: 'true', json: 'true'},
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'numbersapi.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        res.status(200).send(response.data);
    }).catch(function (error) {
        res.status(500).send();
        console.error(error);
    });
})

app.listen(7000, () => {
    console.log('Node server is running!')
})