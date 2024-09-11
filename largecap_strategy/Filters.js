import { html } from "https://esm.sh/htm/preact/standalone";

const Filters = ({ strategyFilters }) => {
  // Log filters to the console
  console.log("Filters in Filters Component:", strategyFilters);

  return html`
    <div>
      <h4
        style=${{
          fontSize: "18px",
          color: "#444",
          marginTop: "20px",
          marginBottom: "10px",
        }}
      >
        Filters Area
      </h4>
      ${strategyFilters.length === 0
        ? html`<div>No filters available.</div>`
        : strategyFilters.map((filter, index) => renderFilter(filter, index))}
    </div>
  `;
};

function renderFilter(filter, index) {
  if (!Array.isArray(filter.options)) {
    console.error("Invalid filter options", filter);
    return html`<div key=${index}>
      No valid options available for this filter
    </div>`;
  }

  return html`
    <div key=${index} class="filter-group" style=${filterGroupStyle}>
      <h5 style=${{ fontSize: "16px", color: "#555", marginBottom: "10px" }}>
        ${filter.label}
      </h5>
      ${filter.options.map(
        (option, optionIndex) => html`
          <div
            key=${optionIndex}
            class="filter-option"
            style=${filterOptionStyle}
          >
            <label for="${option.property}" style=${filterOptionLabelStyle}>
              ${option.label}
            </label>
            ${renderInputField(option)}
          </div>
        `
      )}
    </div>
  `;
}

function renderInputField(option) {
  switch (option.type) {
    case "number":
      return html`
        <input
          type="number"
          id="${option.property}"
          name="${option.property}"
          class="form-input"
          placeholder="Enter ${option.label}"
          style=${inputStyle}
          value=${option.options[option.property] || ""}
        />
      `;
    case "calendar":
      return html`
        <select
          id="${option.property}"
          name="${option.property}"
          class="form-select"
          style=${selectStyle}
        >
          <option>Select Calendar</option>
          ${settings.calendars.map(
            (calendar) => html`
              <option
                value="${calendar}"
                selected=${option.options[option.property] === calendar}
              >
                ${calendar}
              </option>
            `
          )}
        </select>
      `;
    default:
      console.error(`Unknown input type: ${option.type}`);
      return html`
        <input
          type="text"
          id="${option.property}"
          name="${option.property}"
          class="form-input"
          placeholder="Enter ${option.label}"
          style=${inputStyle}
          value=${option.options[option.property] || ""}
        />
      `;
  }
}

const filterGroupStyle = {
  marginBottom: "15px",
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  background: "#f9f9f9",
};

const filterOptionStyle = {
  marginBottom: "10px",
};

const filterOptionLabelStyle = {
  display: "block",
  marginBottom: "5px",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

const selectStyle = {
  width: "100%",
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

export { Filters };
