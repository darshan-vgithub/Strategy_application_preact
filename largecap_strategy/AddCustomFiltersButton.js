// AddCustomFilterButton.js
import { html } from "https://esm.sh/htm/preact/standalone";

export function AddCustomFilterButton({ onClick }) {
  const buttonStyle = {
    marginTop: "20px",
    marginBottom: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "600",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    textDecoration: "none",
  };
  return html`
    <button onClick=${onClick} style=${buttonStyle}>Add Custom Filter</button>
  `;
}
