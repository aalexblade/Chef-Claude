import React from "react";

export default function RecipeHistory({ history, onRestore, onDelete }) {
  if (!history.length) return null;
  return (
    <section style={{ marginTop: "32px" }}>
      <h3>Recipe history</h3>
      <ul style={{ paddingLeft: 0 }}>
        {history.map((rec, idx) => (
          <li
            key={idx}
            style={{
              marginBottom: "12px",
              listStyle: "none",
              borderBottom: "1px solid #eee",
              paddingBottom: "8px",
            }}
          >
            <div
              style={{
                whiteSpace: "pre-line",
                maxHeight: "80px",
                overflow: "auto",
                fontSize: "0.95rem",
              }}
            >
              {rec.slice(0, 200)}
              {rec.length > 200 ? "..." : ""}
            </div>
            <button
              onClick={() => onRestore(idx)}
              className="btn restore-recipe-btn"
              style={{ marginRight: "8px" }}
              title="Restore recipe"
            >
              Restore
            </button>
            <button
              onClick={() => onDelete(idx)}
              className="btn delete-history-btn"
              title="Delete from history"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
