import { useAuth } from "../auth/AuthContext";
import { useParams } from "react-router";
import { getUser } from "../api/account";
import { useState, useEffect } from "react";
import { Link } from "react-router";

const API = import.meta.env.VITE_API;

export default function AccountPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const [user, setUser] = useState(null);

  async function returnBook(bookId) {
    try {
      const response = await fetch(API + "/reservations/" + bookId, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error("Failed to return book");
      }
    } catch (e) {
      console.error(e);
    }
  }

  const syncUser = async () => {
    const data = await getUser(token);
    console.log(data);
    setUser(data);
  };

  useEffect(() => {
    syncUser();
  }, [token]);

  if (!user) return <p>...loading</p>;

  return (
    <>
      <h1>Welcome, {user.firstname}</h1>
      <p>Your email on file with us is {user.email}</p>
      <h2>Your reservations:</h2>
      {user.reservations ? (
        user.reservations.map((book) => (
          <section key={book.id}>
            <Link to={`/books/${book.id}`}>{book.name}</Link>
            <p>{book.author}</p>
            <button
              onClick={() => {
                returnBook(book.id);
                syncUser();
              }}
            >
              Return book
            </button>
          </section>
        ))
      ) : (
        <p>
          You have not reserved any books yet. Browse{" "}
          <Link to="/books">our catalog</Link>!
        </p>
      )}
    </>
  );
}
