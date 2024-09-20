import { html, useState } from "https://esm.sh/htm/preact/standalone";

export function FilterForm({ form, handleFilterInputChange, handleDelete }) {
  const [selectedFilter, setSelectedFilter] = useState(form.filter.class || "");

  const handleFilterSelect = (e) => {
    const filterClass = e.target.value;
    setSelectedFilter(filterClass);
    handleFilterInputChange(form.id, "class", filterClass);
  };

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

  return html`
    <div style=${formContainerStyle}>
      <div style=${formGroupStyle}>
        <label for="filter_type_${form.id}" style=${filterOptionLabelStyle}>
          Select Filter:
        </label>
        <select
          id="filter_type_${form.id}"
          name="filter_type"
          class="form-select"
          style=${selectStyle}
          value=${selectedFilter}
          onChange=${handleFilterSelect}
        >
          <option value="">Select Filter</option>
          <option value="market_cap">Market Cap Filter</option>
          <option value="generic_momentum">Generic Momentum Filter</option>
          <option value="positive_movement">Positive Movement Filter</option>
        </select>
      </div>

      ${selectedFilter === "market_cap" &&
      html`
        <div>
          <h4 style=${filterOptionLabelStyle}>Market Cap Filter</h4>
          <div style=${formGroupStyle}>
            <label
              for="min_market_cap_${form.id}"
              style=${filterOptionLabelStyle}
            >
              Minimum Cap:
            </label>
            <input
              type="number"
              id="min_market_cap_${form.id}"
              name="min_market_cap"
              class="form-input"
              style=${inputStyle}
              value=${form.filter.min_market_cap || ""}
              onInput=${(e) =>
                handleFilterInputChange(
                  form.id,
                  "min_market_cap",
                  e.target.value
                )}
            />
          </div>
        </div>
      `}
      ${selectedFilter === "generic_momentum" &&
      html`
        <div>
          <h4 style=${filterOptionLabelStyle}>Generic Momentum Filter</h4>
          <div style=${formGroupStyle}>
            <label
              for="calendar_generic_${form.id}"
              style=${filterOptionLabelStyle}
            >
              Calendar:
            </label>
            <select
              id="calendar_generic_${form.id}"
              name="calendar_generic"
              class="form-select"
              style=${selectStyle}
              value=${form.filter.calendar_generic || ""}
              onChange=${(e) =>
                handleFilterInputChange(
                  form.id,
                  "calendar_generic",
                  e.target.value
                )}
            >
              <option value="">Select Calendar</option>
              <option value="XNSE">XNSE</option>
              <option value="BCME">BCME</option>
            </select>
          </div>
          <div style=${formGroupStyle}>
            <label
              for="lookup_window_generic_${form.id}"
              style=${filterOptionLabelStyle}
            >
              Look up window:
            </label>
            <input
              type="number"
              id="lookup_window_generic_${form.id}"
              name="lookup_window_generic"
              class="form-input"
              style=${inputStyle}
              value=${form.filter.lookup_window_generic || ""}
              onInput=${(e) =>
                handleFilterInputChange(
                  form.id,
                  "lookup_window_generic",
                  e.target.value
                )}
            />
          </div>
          <div style=${formGroupStyle}>
            <label
              for="return_size_generic_${form.id}"
              style=${filterOptionLabelStyle}
            >
              Return Size:
            </label>
            <input
              type="number"
              id="return_size_generic_${form.id}"
              name="return_size_generic"
              class="form-input"
              style=${inputStyle}
              value=${form.filter.return_size_generic || ""}
              onInput=${(e) =>
                handleFilterInputChange(
                  form.id,
                  "return_size_generic",
                  e.target.value
                )}
            />
          </div>
        </div>
      `}
      ${selectedFilter === "positive_movement" &&
      html`
        <div>
          <h4 style=${filterOptionLabelStyle}>Positive Movement Filter</h4>
          <div style=${formGroupStyle}>
            <label
              for="calendar_positive_${form.id}"
              style=${filterOptionLabelStyle}
            >
              Calendar:
            </label>
            <select
              id="calendar_positive_${form.id}"
              name="calendar_positive"
              class="form-select"
              style=${selectStyle}
              value=${form.filter.calendar_positive || ""}
              onChange=${(e) =>
                handleFilterInputChange(
                  form.id,
                  "calendar_positive",
                  e.target.value
                )}
            >
              <option value="">Select Calendar</option>
              <option value="XNSE">XNSE</option>
              <option value="BCME">BCME</option>
            </select>
          </div>
          <div style=${formGroupStyle}>
            <label
              for="lookup_window_positive_${form.id}"
              style=${filterOptionLabelStyle}
            >
              Look up window:
            </label>
            <input
              type="number"
              id="lookup_window_positive_${form.id}"
              name="lookup_window_positive"
              class="form-input"
              style=${inputStyle}
              value=${form.filter.lookup_window_positive || ""}
              onInput=${(e) =>
                handleFilterInputChange(
                  form.id,
                  "lookup_window_positive",
                  e.target.value
                )}
            />
          </div>
          <div style=${formGroupStyle}>
            <label
              for="positive_return_size_${form.id}"
              style=${filterOptionLabelStyle}
            >
              Positive Return Size:
            </label>
            <input
              type="number"
              id="positive_return_size_${form.id}"
              name="positive_return_size"
              class="form-input"
              style=${inputStyle}
              value=${form.filter.positive_return_size || ""}
              onInput=${(e) =>
                handleFilterInputChange(
                  form.id,
                  "positive_return_size",
                  e.target.value
                )}
            />
          </div>
        </div>
      `}

      <button
        onClick=${() => handleDelete(form.id)}
        style="background-color: #d9534f; color: white; border: none; padding: 10px 15px; border-radius: 4px; cursor: pointer; font-size: 16px; font-weight: 600; margin-top: 20px;"
      >
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `;
}
