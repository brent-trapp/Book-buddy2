import { NavLink } from "react-router";
import { useAuth } from "../auth/AuthContext";

function Navbar() {
  const { token, logout } = useAuth();
  return (
    <header>
      <p>Book Buddy</p>
      <nav>
        <NavLink to="/books">Books</NavLink>
        {token ? (
          <>
            <NavLink to="/account">Account</NavLink>
            <NavLink onClick={() => logout()}>Log out</NavLink>
          </>
        ) : (
          <NavLink to="/login">Log in</NavLink>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
