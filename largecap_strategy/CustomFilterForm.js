/** @jsxImportSource @emotion/react */
import { html } from "https://esm.sh/htm/preact/standalone";

const CustomFilterForm = ({ filter, onRemove }) => {
  return html`
    <div style=${formContainerStyle}>
      <div style=${formGroupStyle}>
        <label style=${filterOptionLabelStyle}>Filter Name</label>
        <input
          type="text"
          value=${filter.name}
          placeholder="Enter filter name"
          style=${inputStyle}
          onInput=${(e) =>
            /* Handle input change */ console.log(e.target.value)}
        />
      </div>

      <div style=${formGroupStyle}>
        <label style=${filterOptionLabelStyle}>Calendar</label>
        <input
          type="text"
          value=${filter.calendar}
          placeholder="Enter calendar"
          style=${inputStyle}
          onInput=${(e) =>
            /* Handle input change */ console.log(e.target.value)}
        />
      </div>

      <div style=${filterGroupStyle}>
        <label style=${filterOptionLabelStyle}>Lookup Window</label>
        <input
          type="text"
          value=${filter.lookUpWindow}
          placeholder="Enter lookup window"
          style=${inputStyle}
          onInput=${(e) =>
            /* Handle input change */ console.log(e.target.value)}
        />
      </div>

      <div style=${filterGroupStyle}>
        <label style=${filterOptionLabelStyle}>Return Size</label>
        <input
          type="text"
          value=${filter.returnSize}
          placeholder="Enter return size"
          style=${inputStyle}
          onInput=${(e) =>
            /* Handle input change */ console.log(e.target.value)}
        />
      </div>

      <button
        style=${{
          padding: "8px 12px",
          backgroundColor: "#f44336",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick=${onRemove}
      >
        Remove
      </button>
    </div>
  `;
};

// Apply styles here
const formContainerStyle = {
  maxWidth: "800px",
  margin: "0 auto",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
};

const formGroupStyle = {
  marginBottom: "16px",
};

const filterOptionStyle = {
  marginBottom: "12px",
};

const filterOptionLabelStyle = {
  display: "block",
  marginBottom: "6px",
  fontWeight: "bold",
  color: "#333",
};

const selectStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  fontSize: "16px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  fontSize: "16px",
};

const filterGroupStyle = {
  marginBottom: "24px",
};

const filterTitleStyle = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#333",
  marginBottom: "12px",
};

export { CustomFilterForm };
