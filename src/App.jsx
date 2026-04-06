import { Routes, Route } from "react-router";
import Layout from "./layout/Layout";
import BooksPage from "./books/BooksPage";
import BooksDetails from "./books/BookDetails";
import Login from "./auth/Login";
import Register from "./auth/Register";
import AccountPage from "./account/AccountPage";
import Error404 from "./Error404";
import ProtectedPage from "./layout/ProtectedPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<BooksPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/books/:id" element={<BooksDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedPage />}>
          <Route path="/account" element={<AccountPage />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
