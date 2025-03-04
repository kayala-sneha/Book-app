import React from "react";
import BookList from "./Booklist";
import AddBook from "./Addbook";

function App() {
  return (
    <div className="App">
      <h1>Welcome to the Book Store</h1>
      <AddBook />
      <BookList />
    </div>
  );
}

export default App;
