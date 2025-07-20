import { useEffect, useState } from "react";
import "./Programok.css";
import My_Footer from "../components/My_Footter";

export default function Programok() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/programs")
      .then((res) => res.json())
      .then((data) => {
        setPrograms(data);
        setLoading(false);
        if (data.length > 0) {
          setSelectedDate(data[0].date);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="loading">Loading programs…</p>;
  }

  if (!programs.length) {
    return <p className="no-programs">No programs yet.</p>;
  }

  const dates = [...new Set(programs.map(p => p.date))];

  const filtered = programs
    .filter(p => p.date === selectedDate)
    .sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="programok-container">
      

      <div className="date-buttons">
        {dates.map(date => (
          <button
            key={date}
            onClick={() => setSelectedDate(date)}
            className={`date-button ${date === selectedDate ? "active" : ""}`}
          >
            {date}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="no-programs">No programs for {selectedDate}.</p>
      ) : (
        <div className="program-grid">
          {filtered.map(p => (
            <div key={p._id} className="program-card">
                <div className="program-details">
                    <h2>{p.title}</h2>
                    
                    <p>{p.description}</p>
                    
                    <p><strong>Időpont:</strong> {p.time}</p>
                    
                </div>
                <div className="program-image-wrapper">
                    <img src={p.imageUrl || "/program_default_pic.png"} alt={p.title} className="program-image" />
                </div>
            </div>
          ))}
        </div>
      )}

        <My_Footer />  
    </div>
    
  );
}
