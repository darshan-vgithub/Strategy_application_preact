import { html } from "https://esm.sh/htm/preact/standalone";

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

export function CustomFilterForm({ filter, onRemove, onFilterChange }) {
  return html`
    <div style=${formContainerStyle}>
      <div style=${formGroupStyle}>
        <label style=${filterOptionLabelStyle}>Custom Filter Name:</label>
        <input
          type="text"
          class="custom-filter-name"
          placeholder="Filter Name"
          style=${inputStyle}
          value=${filter.name}
          onInput=${(e) => onFilterChange(e, "name")}
        />
      </div>

      <div style=${formGroupStyle}>
        <label style=${filterOptionLabelStyle}>Calendar:</label>
        <select
          class="custom-calendar-select"
          style=${selectStyle}
          value=${filter.calendar}
          onChange=${(e) => onFilterChange(e, "calendar")}
        >
          <option value="">Select Calendar</option>
          <option value="XNSE">XNSE</option>
          <option value="BCME">BCME</option>
        </select>
      </div>

      <div style=${formGroupStyle}>
        <label style=${filterOptionLabelStyle}>Look up window:</label>
        <input
          type="number"
          class="custom-look-up-window"
          placeholder="Look up window"
          style=${inputStyle}
          value=${filter.lookUpWindow}
          onInput=${(e) => onFilterChange(e, "lookUpWindow")}
        />
      </div>

      <div style=${formGroupStyle}>
        <label style=${filterOptionLabelStyle}>Return size:</label>
        <input
          type="number"
          class="custom-return-size"
          placeholder="Return size"
          style=${inputStyle}
          value=${filter.returnSize}
          onInput=${(e) => onFilterChange(e, "returnSize")}
        />
      </div>

      <button
        class="remove-custom-filter"
        style="margin-top: 10px; padding: 8px 12px; background-color: #f44336; color: #fff; border: none; border-radius: 4px; cursor: pointer;"
        onClick=${onRemove}
      >
        Remove
      </button>
    </div>
  `;
}
