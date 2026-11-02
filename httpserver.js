
import express from "express";

const app = express();

app.use(express.json());

let books = [
    {
        id: 1,
        title: "book 1",
        author: "author 1",
        issued: false
    },
    {
        id: 2,
        title: "book 2",
        author: "author 2",
        issued: true
    },
    {
        id: 3,
        title: "book 3",
        author: "author 3",
        issued: false
    }
];

app.get("/books", (req, res) => {

    res.status(200).json(books);

});

app.get("/books/:id", (req, res) => {

    const id = Number(req.params.id);

    const book = books.find((b) => b.id === id);

    if (!book) {
        return res.status(404).send("Book not found");
    }

    res.json(book);

});


app.post("/create", (req, res) => {

    const newbook = req.body;

    if (!newbook.title || !newbook.author) {
        return res.status(400).send("Enter title and author");
    }

    newbook.id = books.length > 0
        ? Math.max(...books.map(b => b.id)) + 1
        : 1;

    newbook.issued = false;

    books.push(newbook);

    res.status(201).json(newbook);

});


app.put("/books/:id", (req, res) => {

    const id = Number(req.params.id);

    const book = books.find((b) => b.id === id);

    if (!book) {
        return res.status(404).send("Book not found");
    }

    const { title, author } = req.body;

    if (title) book.title = title;
    if (author) book.author = author;

    res.status(200).json(book);

});


app.delete("/delete/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = books.findIndex((b) => b.id === id);

    if (index === -1) {
        return res.status(404).send("Book not found");
    }

    books.splice(index, 1);

    res.send("Book deleted successfully");

});


app.get("/search", (req, res) => {

    const search = req.query.q;

    const result = books.filter((b) =>
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase())
    );

    res.json(result);

});


app.put("/issue/:id", (req, res) => {

    const id = Number(req.params.id);

    const book = books.find((b) => b.id === id);

    if (!book) {
        return res.status(404).send("Book not found");
    }

    if (book.issued) {
        return res.send("Book already issued");
    }

    book.issued = true;

    res.send("Book issued successfully");

});


app.put("/return/:id", (req, res) => {

    const id = Number(req.params.id);

    const book = books.find((b) => b.id === id);

    if (!book) {
        return res.status(404).send("Book not found");
    }

    book.issued = false;

    res.send("Book returned successfully");

});


app.listen(3000, () => {

    console.log("Server is running on port 3000");

});
