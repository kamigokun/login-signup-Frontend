import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="card card-wide">
      <p className="eyebrow">Protected route</p>
      <h1>Dashboard</h1>
      <p className="subtitle">
        This page only renders because your JWT passed verification on the server.
      </p>

      <div className="stat-row">
        <div className="stat-box">
          <div className="stat-label">Name</div>
          <div className="stat-value">{user?.name || "—"}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Email</div>
          <div className="stat-value">{user?.email || "—"}</div>
        </div>
      </div>
      <div className="stat-row">
        <div className="stat-box">
          <div className="stat-label">Account ID</div>
          <div className="stat-value">{user?.id ?? "—"}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Joined</div>
          <div className="stat-value">
            {user?.createdAt ? new Date(user.createdAt).toLocaleString() : "—"}
          </div>
        </div>
      </div>
    </div>
  );
}
