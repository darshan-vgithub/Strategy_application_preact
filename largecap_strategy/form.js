import { html, useState } from "https://esm.sh/htm/preact/standalone";
import { showToast } from "./Toast.js";
import { AddFilterButton } from "./AddFilterButton.js";
import { Toast } from "./Toast.js";

const settings = {
  classes: ["CruiseMomentum"],
  universes: [
    "Mcap_500",
    "Nifty_Finance",
    "Nifty_Healthcare",
    "Mcap_100",
    "Dynamic_Focussed_Asset_ETF",
    "Risk_Tuned_Adaptive_ETF",
    "Sector_Rotation_ETF",
    "Commodities_ETF",
    "Intl_ETF",
    "Factor_ETF",
    "Technology_Sector",
    "Financial_Sector",
    "Agricultural_Sector",
    "Energy_Sector",
    "Automotive_Sector",
  ],
  calendars: ["XNSE", "BCME"],
  filters: [
    {
      label: "Market Cap Filter",
      class: "McapFilter",
      options: [
        { label: "Minimum Cap", property: "min_market_cap", type: "number" },
      ],
    },
    {
      label: "Generic Momentum Filter",
      class: "AbsoluteReturnFilter",
      options: [
        { label: "Calendar", property: "calendar", type: "calendar" },
        { label: "Look up window", property: "lookup_window", type: "number" },
        { label: "Return size", property: "return_size", type: "number" },
      ],
    },
    {
      label: "Positive Movement Filter",
      class: "PositiveMovementFilter",
      options: [
        { label: "Calendar", property: "calendar", type: "calendar" },
        { label: "Look up window", property: "lookup_window", type: "number" },
        {
          label: "Positive return size",
          property: "positive_return_size",
          type: "number",
        },
      ],
    },
  ],
};

const Form = (props) => {
  const { label, class_name, universe, onStateChange } = props;
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [activeFilters, setActiveFilters] = useState([]);

  const onStrategyNameInput = (e) => {
    const name = e.target.value;
    onStateChange(e);
    if (name) {
      setActiveFilters(
        settings.filters.map((filter) => ({
          ...filter,
          options: filter.options.map((option) => ({ ...option, value: "" })), // Initialize with empty values
        }))
      );
    } else {
      setActiveFilters([]);
    }
  };

  const handleAddFilter = () => {
    setActiveFilters((prevFilters) => [
      ...prevFilters,
      { label: "New Filter", options: [] }, // Add a new empty filter
    ]);
    setToastMessage("Added filter successfully!");
    setToastType("success");
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleEditFilter = (index) => {
    console.log("Edit filter at index:", index);
    // Implement editing logic if necessary
  };

  const handleDeleteFilter = (index) => {
    setActiveFilters(activeFilters.filter((_, i) => i !== index));
    setToastMessage("Deleted filter successfully!");
    setToastType("success");
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleGenerateJSON = () => {
    const jsonOutput = {
      label,
      class_name,
      universe,
      filters: activeFilters.map((filter) => ({
        label: filter.label,
        options: filter.options.map((option) => ({
          property: option.property,
          value: option.value,
        })),
      })),
    };
    console.log(JSON.stringify(jsonOutput, null, 2)); // Display in console
    // Optionally, you can display this output in the UI
  };

  const FilterOption = ({ option, onInputChange }) => {
    if (option.type === "calendar") {
      return html`
        <div class="form-group" style=${filterOptionStyle}>
          <label for=${option.property} style=${filterOptionLabelStyle}>
            ${option.label}:
          </label>
          <select
            id=${option.property}
            name=${option.property}
            class="form-select"
            style=${selectStyle}
            value=${option.value || ""}
            onInput=${(e) => onInputChange(option.property, e.target.value)}
          >
            <option value="">Select Calendar</option>
            ${settings.calendars.map(
              (calendar) =>
                html`
                  <option
                    value="${calendar}"
                    selected=${option.value === calendar}
                  >
                    ${calendar}
                  </option>
                `
            )}
          </select>
        </div>
      `;
    }

    return html`
      <div class="form-group" style=${filterOptionStyle}>
        <label for=${option.property} style=${filterOptionLabelStyle}>
          ${option.label}:
        </label>
        <input
          type=${option.type === "number" ? "number" : "text"}
          id=${option.property}
          name=${option.property}
          class="form-input"
          style=${inputStyle}
          value=${option.value || ""}
          onInput=${(e) => onInputChange(option.property, e.target.value)}
        />
      </div>
    `;
  };

  const Filters = ({ filters }) => {
    return html`
      <div class="filters-section" style=${filterGroupStyle}>
        <h3 style=${filterTitleStyle}>Filters</h3>
        ${filters.map(
          (filter, index) =>
            html`
              <div>
                <h4>${filter.label}</h4>
                ${filter.options.map(
                  (option) =>
                    html`
                      <${FilterOption}
                        option=${option}
                        onInputChange=${(name, value) => {
                          const updatedFilters = [...activeFilters];
                          const filterToUpdate = updatedFilters[index];
                          const updatedOptions = filterToUpdate.options.map(
                            (opt) =>
                              opt.property === name ? { ...opt, value } : opt
                          );
                          updatedFilters[index] = {
                            ...filterToUpdate,
                            options: updatedOptions,
                          };
                          setActiveFilters(updatedFilters);
                        }}
                      />
                    `
                )}
                <button onClick=${() => handleEditFilter(index)}>Edit</button>
                <button onClick=${() => handleDeleteFilter(index)}>
                  Delete
                </button>
              </div>
            `
        )}
        <${AddFilterButton} onClick=${handleAddFilter} />
      </div>
    `;
  };

  return html`
    <textarea rows="10" cols="80">${JSON.stringify(props)}</textarea>
    <div class="form-container" style=${formContainerStyle}>
      <h2>Strategy Form</h2>
      <div class="form-group" style=${formGroupStyle}>
        <label for="strategyName">Strategy Name:</label>
        <input
          type="text"
          id="strategyName"
          name="strategyName"
          data-prop="label"
          value=${label || ""}
          onInput=${onStrategyNameInput}
          style=${inputStyle}
        />
      </div>
      <div class="form-group" style=${formGroupStyle}>
        <label for="class">Class:</label>
        <select
          id="class"
          name="class"
          data-prop="class_name"
          value=${class_name}
          onInput=${onStateChange}
          style=${selectStyle}
        >
          <option value="">None</option>
          ${settings.classes.map(
            (className) =>
              html`<option
                value="${className}"
                selected=${class_name === className}
              >
                ${className}
              </option>`
          )}
        </select>
      </div>
      <div class="form-group" style=${formGroupStyle}>
        <label for="universe">Universe:</label>
        <select
          id="universe"
          name="universe"
          data-prop="universe"
          value=${universe}
          onInput=${onStateChange}
          style=${selectStyle}
        >
          <option value="">Select Universe</option>
          ${settings.universes.map(
            (u) =>
              html`<option value="${u}" selected=${universe === u}>
                ${u}
              </option>`
          )}
        </select>
      </div>
      <${Filters} filters=${activeFilters} />
      <div class="form-group" style=${formGroupStyle}>
        <button
          class="generate-json-btn"
          style=${inputStyle}
          onClick=${handleGenerateJSON}
        >
          Generate JSON
        </button>
      </div>
      <${Toast} message=${toastMessage} type=${toastType} />
    </div>
  `;
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

export { Form };
