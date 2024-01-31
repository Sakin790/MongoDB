const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mern-stack-crud', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the Mongoose schema and model for the books
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  publishedDate: Date,
  pageCount: Number,
});
const Book = mongoose.model('Book', bookSchema);

// API endpoints
app.get('/api/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

app.post('/api/books', async (req, res) => {
  const book = new Book(req.body);
  try {
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/books/:id', async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json({ message: 'Book deleted successfully' });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

//Frontend
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [pageCount, setPageCount] = useState('');
  const [id, setId] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books: ', error);
    }
  };

  const addBook = async (newBook) => {
    try {
      const response = await axios.post('http://localhost:5000/api/books', newBook);
      setBooks([...books, response.data]);
    } catch (error) {
      console.error('Error adding book: ', error);
    }
  };

  const updateBook = async (updatedBook) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/books/${id}`, updatedBook);
      setBooks(books.map((book) => (book._id === id ? response.data : book)));
    } catch (error) {
      console.error('Error updating book: ', error);
    }
  };

  const deleteBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${bookId}`);
      setBooks(books.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error('Error deleting book: ', error);
    }
  };

  return (
    <div className="App">
      <h1>Books</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        addBook({ title, author, publishedDate, pageCount });
        setTitle('');
        setAuthor('');
        setPublishedDate('');
        setPageCount('');
      }}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <input type="date" placeholder="Published Date" value={publishedDate} onChange={(e) => setPublishedDate(e.target.value)} />
        <input type="number" placeholder="Page Count" value={pageCount} onChange={(e) => setPageCount(e.target.value)} />
        <button type="submit">Add Book</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published Date</th>
            <th>Page Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publishedDate}</td>
              <td>{book.pageCount}</td>
              <td>
                <button onClick={() => {
                  setId(book._id);
                  setTitle(book.title);
                  setAuthor(book.author);
                  setPublishedDate(book.publishedDate);
                  setPageCount(book.pageCount);
                }}>Edit</button>
                <button onClick={() => deleteBook(book._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>