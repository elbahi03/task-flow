import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState(null); // pagination info
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`/users`, {
        params: { page, per_page: 15 },
      });
      const data = res.data;

      setUsers(data.data || data);
      setMeta({
        current_page: data.current_page,
        last_page: data.last_page,
        total: data.total,
      });
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div>Loading users…</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>All Users</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>ID</th>
            <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>Name</th>
            <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>Email</th>
            <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td style={{ padding: "8px 4px" }}>{u.id}</td>
              <td style={{ padding: "8px 4px" }}>{u.name}</td>
              <td style={{ padding: "8px 4px" }}>{u.email}</td>
              <td style={{ padding: "8px 4px" }}>
                {new Date(u.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {meta && (
        <div style={{ marginTop: 12 }}>
          Page {meta.current_page} of {meta.last_page} — Total: {meta.total}
          <div style={{ marginTop: 8 }}>
            <button
              onClick={() => fetchUsers(meta.current_page - 1)}
              disabled={meta.current_page <= 1}
            >
              Prev
            </button>
            <button
              onClick={() => fetchUsers(meta.current_page + 1)}
              disabled={meta.current_page >= meta.last_page}
              style={{ marginLeft: 8 }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
