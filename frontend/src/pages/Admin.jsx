import { useState } from "react";

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [data, setData] = useState(null);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [programForm, setProgramForm] = useState({
    date: "",
    time: "",
    title: "",
    description: "",
    image: null
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          localStorage.setItem("token", data.token);
        } else {
          alert("Login failed");
        }
      });
  };

  const fetchAdminData = () => {
    fetch("/api/admin-data", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch(() => alert("Unauthorized or session expired"));
  };

  const handleProgramChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setProgramForm({ ...programForm, image: files[0] });
    } else {
      setProgramForm({ ...programForm, [name]: value });
    }
  };

  const handleProgramSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.keys(programForm).forEach(key => formData.append(key, programForm[key]));

    try {
      const res = await fetch("/api/programs", {
        method: "POST",
        body: formData
      });
      const json = await res.json();
      setLoading(false);

      if (json.program) {
        alert("✅ Program uploaded!");
        setProgramForm({
          date: "",
          time: "",
          title: "",
          description: "",
          image: null
        });
      } else {
        alert("❌ Failed to upload");
      }
    } catch (err) {
      setLoading(false);
      alert("❌ Error: " + err.message);
    }
  };

  if (!token) {
    return (
      <div>
        <h1>Admin Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <button onClick={fetchAdminData}>Fetch Secret Data</button>
      {data && (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}

      <hr />

      <h2>Upload Festival Program</h2>
      <form onSubmit={handleProgramSubmit} style={{ maxWidth: "400px" }}>
        <input type="date" name="date" value={programForm.date} onChange={handleProgramChange} required />
        <br />
        <input type="time" name="time" value={programForm.time} onChange={handleProgramChange} required />
        <br />
        <input type="text" name="title" placeholder="Title" value={programForm.title} onChange={handleProgramChange} required />
        <br />
        <textarea name="description" placeholder="Short description" value={programForm.description} onChange={handleProgramChange} required></textarea>
        <br />
        <input type="file" name="image" accept="image/*" onChange={handleProgramChange} required />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Uploading…" : "Upload Program"}
        </button>
      </form>

      <button
        onClick={() => {
          setToken("");
          localStorage.removeItem("token");
        }}
      >
        Logout
      </button>
    </div>
  );
}