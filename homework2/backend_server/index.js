const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const jsonParser = bodyParser.json()
const http = require('http');
const cors = require("cors");
const {response} = require("express");
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

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
            res.send(booksArray);
        });
    });

    request.on('error', (error) => {
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
            console.log(myBook.author)
            res.send(myBook);
        });

    });

    request.on('error', (error) => {
        console.error(error);
    });

    request.end();
});

app.post('/books/add', jsonParser, async (req, res) => {
    console.log(req.body);

    let result = await fetch("http://localhost:7777/api/books/add", {
        method: "POST",
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(req.body)
    }).then((response) => response.json())
        .then((json) => console.log(json));

    res.status(201).json("Item inserted successfully");
});

app.delete('/books/remove/:id', async (req, res) => {
    const id = req.params.id;

    await fetch(`http://localhost:7777/api/books/remove/${id}`, {
        method: "DELETE",
    }).then((response) =>
        res.status(response.status)
    )
    res.end();
    //console.log(response.status));
});

app.put('/books/update/:id', jsonParser, async (req, res) => {
    const id = req.params.id;
    console.log(id);
    console.log(req.body);

    await fetch(`http://localhost:7777/api/books/update/${id}`, {
        method: "PUT",
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(req.body)
    }).then((response) =>
        console.log(response.status),
       // res.status(response.status)
    )



    res.end()
});

app.listen(7000, () => {
    console.log('Node server is running!')
})