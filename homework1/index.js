const {MongoClient, ObjectId} = require("mongodb");
const http = require("http");
const config = require('config');
const uri = config.get('database.uri');
const client = new MongoClient(uri);

let conn;

async function run() {
    try {
        console.log("Trying to connect");
        conn = await client.connect();
        console.log("Connected");
    } catch (e) {
        console.error(e);
    }
}

run();

const database = client.db('HW1');
books = database.collection('booksDB');

const server = http.createServer(async (req, res) => {
    if (req.method === "POST") {
        switch (req.url) {
            case '/api/books/add': {
                let body = "";
                req.on("data", (chunk) => {
                    body += chunk.toString();
                });
                req.on("end", () => {
                    const data = JSON.parse(body);

                    if(data._id != null) {
                        books.findOne({
                            _id: new ObjectId(data._id)
                        }).then(book => {
                            if (!book) {
                                data._id = new ObjectId(data._id);
                                books.insertOne(data);
                                res.writeHead(201, {"Content-Type": "application/json"});
                                res.end(JSON.stringify(data));
                            } else {
                                res.writeHead(409, {"Content-Type": "text"});
                                res.end("Id already used");
                            }
                        });
                    }
                    else{
                        books.insertOne(data);
                        res.writeHead(201, {"Content-Type": "application/json"});
                        res.end(JSON.stringify(data));
                    }
                });
                break;
            }
            case '/api/books/add-list': {
                let body = "";
                req.on("data", (chunk) => {
                    body += chunk.toString();
                });
                req.on("end", () => {
                    const data = JSON.parse(body);

                    books.insertMany(data);

                    res.writeHead(201, {"Content-Type": "application/json"});
                    res.end(JSON.stringify(data));
                });
                break;
            }
            default: {
                res.writeHead(501, {"Content-Type": "text"});
                res.end('Not Implemented');
                break;
            }
        }
    } else if (req.method === "GET") {
        if (req.url === "/api/books") {
            const results = await books.find({}).toArray();
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(results));
        } else if (req.url.match(/api\/books\/[0-9a-fA-F]{24}$/)) {
            const id = req.url.split("\/")[3];

            books.findOne({
                _id: new ObjectId(id)
            }).then(book => {
                if (!book) {
                    res.writeHead(404, {"Content-Type": "text"});
                    res.end(`No book with id = ${id} was found`);
                } else {
                    res.writeHead(200, {"Content-Type": "application/json"});
                    res.end(JSON.stringify(book));
                }
            });

        } else {
            res.writeHead(501, {"Content-Type": "text"});
            res.end('Not Implemented');
        }
    } else if (req.method === "DELETE") {
        if (req.url === "/api/books/remove-all") {
            const result = await books.deleteMany({});
            res.writeHead(200, {"Content-Type": "text"});
            res.end("Deleted " + result.deletedCount + " books");
        } else if (req.url.match(/api\/books\/remove\/[0-9a-fA-F]{24}$/)) {
            const id = req.url.split("\/")[4];
            const result = await books.deleteOne({
                _id: new ObjectId(id)
            });

            if (result.deletedCount === 1) {
                res.writeHead(200, {"Content-Type": "text"});
                res.end(`Book with id = ${id} was deleted successfully`);
            } else {
                res.writeHead(404, {"Content-Type": "text"});
                res.end(`No book with id = ${id} was found`);
            }
        } else{
            res.writeHead(501, {"Content-Type": "text/html"});
            res.end('Not Implemented');
        }
    } else if(req.method === "PUT"){
        if(req.url.match(/api\/books\/update\/[0-9a-fA-F]{24}$/)){
            const id = req.url.split("\/")[4];
            let body = "";
            req.on("data", (chunk) => {
                body += chunk.toString();
            });
            req.on("end", async () => {
                const data = JSON.parse(body);
                await books.updateOne(
                    {_id: new ObjectId(id)},
                    {$set: {title: data.title, author: data.author, publicationYear: data.publicationYear, shortDescription: data.shortDescription, genre: data.genre}},
                    {upsert: true});
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(JSON.stringify(data));
            });
        } else if(req.url === "/api/books/update-all"){
            let body = "";
            req.on("data", (chunk) => {
                body += chunk.toString();
            });
            req.on("end", async () => {
                const data = JSON.parse(body);
                await books.updateMany(
                    {},
                    {$set: {title: data.title, author: data.author, publicationYear: data.publicationYear, shortDescription: data.shortDescription, genre: data.genre}},
                    {upsert: true});
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(JSON.stringify(data));
            });
        }
        else{
            res.writeHead(501, {"Content-Type": "text/html"});
            res.end('Not Implemented');
        }
    }
    else{
        res.writeHead(501, {"Content-Type": "text"});
        res.end('Not Implemented');
    }
});
server.listen(7777);
