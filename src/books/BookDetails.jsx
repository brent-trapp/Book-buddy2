import { useAuth } from "../auth/AuthContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { reserveBook } from "../api/books";
import { getBooks } from "../api/books";

export default function BookDetails() {
  const { id } = useParams();
  const { token } = useAuth();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}/books/${id}`)
      .then((res) => res.json())
      .then((json) => setBook(json))
      .catch((err) => console.error(err));
  }, [id]);

  const syncBooks = async () => {
    const data = await getBooks();
    console.log(data);
    setBook(data);
  };

  if (!book) return <p>...loading</p>;

  return (
    <section>
      <img src={book.coverimage} alt={`Cover image of ${book.title}`} />
      <div className="bookcard">
        <h2>{book.title}</h2>
        <p>{book.author}</p>
        <p>{book.description}</p>
        {token ? (
          <button
            disabled={!book.available}
            onClick={() => {
              reserveBook(token, id);
              syncBooks();
            }}
          >
            {book.available ? "Reserve book" : "Book is already reserved."}
          </button>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}
