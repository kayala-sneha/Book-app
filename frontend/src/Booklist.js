import React, { useState, useEffect } from "react";
import axios from "axios";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBook, setEditingBook] = useState(null); // State to handle editing a book
  const [formData, setFormData] = useState({ title: "", author: "", price: "" }); // Form data for creating/updating a book

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/book2")
      .then((response) => {
        console.log(response.data); // Check the response data
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setError("Failed to load books");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/book2/${id}`)
      .then(() => {
        setBooks(books.filter((book) => book._id !== id)); // Remove deleted book from the state
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
      });
  };

  const handleEdit = (book) => {
    setEditingBook(book); // Set the book to be edited
    setFormData({
      title: book.title,
      author: book.author,
      price: book.price,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const { title, author, price } = formData;
    axios
      .put(`http://localhost:5000/api/book2/${editingBook._id}`, { title, author, price })
      .then((response) => {
        const updatedBooks = books.map((book) =>
          book._id === editingBook._id ? response.data : book
        );
        setBooks(updatedBooks); // Update the book in the state
        setEditingBook(null); // Close the editing mode
      })
      .catch((error) => {
        console.error("Error updating book:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Book Store</h1>
      
      {editingBook ? (
        <div>
          <h2>Edit Book</h2>
          <form onSubmit={handleUpdate}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Author:</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Price:</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit">Update Book</button>
            <button type="button" onClick={() => setEditingBook(null)}>Cancel</button>
          </form>
        </div>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Price: ${book.price}</p>
              <button onClick={() => handleEdit(book)}>Edit</button>
              <button onClick={() => handleDelete(book._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
