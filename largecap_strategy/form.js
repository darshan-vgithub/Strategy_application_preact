import { html, useState } from "https://esm.sh/htm/preact/standalone";
import { showToast } from "./Toast.js";
import { AddFilterButton } from "./AddFilterButton.js";
import { Toast } from "./Toast.js";

export const settings = {
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
  calendars: [
    { label: "NSE Calendar", property: "Calendar" },
    { label: "CME Calendar", property: "Calendar_CME" },
  ],
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
  const { label, class_name, universe, filters, onStateChange, setFilters } =
    props;
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const handleAddFilter = () => {
    setFilters([...filters, { filter: "", options: [{}] }]);
    setToastMessage("Added filter successfully!");
    setToastType("success");
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleDeleteFilter = (index) => {
    setFilters(filters.filter((_, i) => i !== index));
    setToastMessage("Deleted filter successfully!");
    setToastType("success");
    setTimeout(() => setToastMessage(""), 3000);
  };

  const setFilterType = (index, type) => {
    const newFilters = [...filters];
    newFilters[index].filter = type;
    newFilters[index].options = [{}];
    setFilters(newFilters);
  };

  const handleOptionValueChange = (filterIdx, property, value) => {
    const filter = filters[filterIdx];
    const newOptions = [...filter.options];
    newOptions[0][property] = value;
    const newFilters = [...filters];
    newFilters[filterIdx].options = newOptions;
    setFilters(newFilters);
  };

  return html`
    <div class="form-container" style=${formContainerStyle}>
      <h2>Strategy Form</h2>
      <div class="form-group" style=${formGroupStyle}>
        <label for="strategyName">Strategy Name:</label>
        <input
          type="text"
          id="strategyName"
          name="strategyName"
          data-prop="label"
          onInput=${onStateChange}
          value=${label || ""}
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

      ${class_name === "" &&
      html`<div class="filters-section" style=${filterGroupStyle}>
        <h3 style=${filterTitleStyle}>Filters</h3>
        <div>
          ${filters.map(
            (filter, index) =>
              html`<div key=${filter.filter + "-filterel"}>
                <${Filter}
                  filter=${filter}
                  filterIdx=${index}
                  handleDeleteFilter=${handleDeleteFilter}
                  handleOptionValueChange=${handleOptionValueChange}
                  setFilterType=${setFilterType}
                />
              </div>`
          )}
        </div>
        <div>
          <${AddFilterButton} onClick=${handleAddFilter} />
        </div>
      </div> `}

      <${Toast} message=${toastMessage} type=${toastType} />
    </div>
  `;
};

const Filter = ({
  filter,
  filterIdx,
  handleDeleteFilter,
  handleOptionValueChange,
  setFilterType,
}) => {
  const filterSetting = settings.filters.find((o) => o.class === filter.filter);
  const optionsValues = filter.options[0] || {}; // Ensure optionsValues is defined

  const onOptionValueChange = (property, value) => {
    handleOptionValueChange(filterIdx, property, value);
  };

  return html`
    <div
      key=${filter.filter + "-filterdiv"}
      style="border:solid 1px #ddd;padding: 10px"
    >
      <select
        value=${filter.filter}
        onInput=${(ev) => setFilterType(filterIdx, ev.target.value)}
      >
        <option value="">Select Filter</option>
        ${settings.filters.map(
          (filter) =>
            html`<option value="${filter.class}">${filter.label}</option>`
        )}
      </select>
      <div>
        ${filterSetting &&
        filterSetting.options.map((optionSetting) => {
          const optionValue = optionsValues[optionSetting.property] || "";
          return html`
            <${FilterOption}
              optionSetting=${optionSetting}
              value=${optionValue}
              filterName=${filter.filter}
              key=${optionSetting.property + "-filteroptionel"}
              onOptionValueChange=${onOptionValueChange}
            />
          `;
        })}
      </div>
      <div>
        <button onClick=${() => handleDeleteFilter(filterIdx)}>Delete</button>
      </div>
    </div>
  `;
};

const FilterOption = ({
  optionSetting,
  value,
  filterName,
  onOptionValueChange,
}) => {
  if (optionSetting.type === "calendar") {
    return html`
      <div class="form-group" style="margin: 15px 0">
        <label for=${optionSetting.property} style=${filterOptionLabelStyle}>
          ${optionSetting.label}:
        </label>
        <select
          value=${value || ""}
          key=${filterName + optionSetting.property + "-filteroption"}
          onInput=${(e) =>
            onOptionValueChange(optionSetting.property, e.target.value)}
        >
          ${settings.calendars.map(
            (calendar) =>
              html`
                <option value="${calendar.property}">${calendar.label}</option>
              `
          )}
        </select>
      </div>
    `;
  }

  return html`
    <div class="form-group" style=${filterOptionStyle} style="margin: 15px 0">
      <label for=${optionSetting.property} style=${filterOptionLabelStyle}>
        ${optionSetting.label}:
      </label>
      <input
        type=${optionSetting.type === "number" ? "number" : "text"}
        key=${filterName + optionSetting.property + "-filteroption"}
        value=${value}
        onInput=${(e) =>
          onOptionValueChange(optionSetting.property, e.target.value)}
      />
    </div>
  `;
};

const formContainerStyle = {
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#f9f9f9",
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
  transition: "border-color 0.3s",
  ":hover": {
    borderColor: "#888",
  },
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  fontSize: "16px",
  transition: "border-color 0.3s",
  ":focus": {
    borderColor: "#007bff",
    outline: "none",
  },
};

const filterGroupStyle = {
  marginBottom: "24px",
};

const filterTitleStyle = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#333",
  marginBottom: "12px",
  padding: "10px",
  backgroundColor: "#e9ecef",
  borderRadius: "4px",
};
export { Form };
