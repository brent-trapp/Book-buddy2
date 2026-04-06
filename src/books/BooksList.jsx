import { Link } from "react-router";
import { useState } from "react";

export default function BooksList({ books, searchTerm }) {
  const newBookArr = [];

  books.filter((book) => {
    if (book.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      newBookArr.push(book);
    }
  });

  return (
    <ul>
      {newBookArr
        ? newBookArr.map((book) => <BooksListItem key={book.id} book={book} />)
        : books.map((book) => <BooksListItem key={book.id} book={book} />)}
    </ul>
  );
}

function BooksListItem({ book }) {
  const [error, setError] = useState(null);
  return (
    <li>
      <img src={book.coverimage} alt={"Cover image of " + book.title} />
      <div className="bookcard">
        <h2>
          <Link to={`/books/${book.id}`}>{book.title}</Link>
        </h2>
        <h3>{book.author}</h3>
        <p>{book.description}</p>
      </div>
      {error && <p role="alert">{error}</p>}
    </li>
  );
}
