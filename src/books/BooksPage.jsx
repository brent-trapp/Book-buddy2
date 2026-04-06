import { useState, useEffect } from "react";
import { getBooks } from "../api/books";
import BooksList from "./BooksList";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  const syncBooks = async () => {
    const data = await getBooks();
    console.log(data);
    setBooks(data);
  };

  useEffect(() => {
    syncBooks();
  }, []);

  function setSearch(formdata) {
    const search = formdata.get("search");
    setSearchTerm(search);
  }

  return (
    <>
      <h1>Catalog</h1>
      <>
        <form action={setSearch}>
          <label>
            <input
              type="text"
              placeholder="Search for a book..."
              name="search"
            />
          </label>
          <button>Search</button>
        </form>
        {error && <p role="alert">{error}</p>}
      </>
      <BooksList books={books} syncBooks={syncBooks} searchTerm={searchTerm} />
    </>
  );
}
