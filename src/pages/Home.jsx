import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="hero">
      <span className="brand-mark" style={{ display: "inline-block" }} />
      <h1>One key. Every room.</h1>
      <p>
        Keystone is a minimal reference implementation of email/password
        authentication — hashed passwords, signed JWTs, and a protected
        dashboard route.
      </p>
      <div className="hero-actions">
        {isAuthenticated ? (
          <Link to="/dashboard" className="btn-fill">
            Go to dashboard
          </Link>
        ) : (
          <>
            <Link to="/signup" className="btn-fill">
              Create an account
            </Link>
            <Link to="/login" className="btn-outline">
              Log in
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
