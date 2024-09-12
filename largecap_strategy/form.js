import { html, useState } from "https://esm.sh/htm/preact/standalone";

const settings = {
  classes: ["CruiseMomentum", "None"],
  universes: ["Mcap_100", "Nifty_50", "Nifty_IT"],
  calendars: ["XNSE", "BCME"],
  filters: [
    {
      label: "Market Cap Filter",
      class: "McapFilter",
      options: [
        {
          label: "Minimum Cap",
          property: "min_market_cap",
          type: "number",
        },
      ],
    },
    {
      label: "Generic Momentum Filter",
      class: "AbsoluteReturnFilter",
      options: [
        {
          label: "Calendar",
          property: "calendar_name",
          type: "calendar",
        },
        {
          label: "Look up window",
          property: "lookup_window",
          type: "number",
        },
        {
          label: "Return size",
          property: "return_size",
          type: "number",
        },
      ],
    },
    {
      label: "Positive Movement Filter",
      class: "PositiveMovementFilter",
      options: [
        {
          label: "Calendar",
          property: "calendar",
          type: "calendar",
        },
        {
          label: "Look up window",
          property: "lookup_window",
          type: "number",
        },
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
  const { strategy, class_name, filters, onStrategyNameChange } = props;
  const [selectedClass, setSelectedClass] = useState(class_name);
  const [strategyName, setStrategyName] = useState(strategy);
  const [strategyFilters, setFilters] = useState(filters);

  // Handle class change
  const onClassInput = (e) => {
    const selected = e.target.value;
    setSelectedClass(selected);

    if (selected === "None") {
      setFilters(settings.filters);
    } else {
      const filtersForClass = settings.filters.filter(
        (filter) => filter.class === selected
      );
      setFilters(filtersForClass.length ? filtersForClass : []);
    }
  };

  // Handle strategy name change
  const onStrategyNameInput = (e) => {
    const name = e.target.value;
    setStrategyName(name);
    onStrategyNameChange(e); // Call the function to update parent component
  };

  return html`
    <form id="strategyForm" style=${formStyle}>
      <h1 style=${titleStyle}>Strategy Form</h1>
      <div class="form-group" style=${formGroupStyle}>
        <label for="strategy-name" style=${labelStyle}>Strategy:</label>
        <input
          type="text"
          id="strategy-name"
          name="strategy"
          class="form-input"
          placeholder="Enter your strategy"
          value=${strategyName}
          onChange=${onStrategyNameInput}
          style=${inputStyle}
        />
      </div>
      <div class="form-group" style=${formGroupStyle}>
        <label for="universe" style=${labelStyle}>Universe:</label>
        <select
          id="universe"
          name="universe"
          class="form-select"
          style=${selectStyle}
        >
          <option>Select Universe</option>
          ${settings.universes.map(
            (o) => html` <option value="${o}">${o}</option> `
          )}
        </select>
      </div>
      <div class="form-group" style=${formGroupStyle}>
        <label for="class" style=${labelStyle}>Class:</label>
        <select
          id="class"
          name="class"
          class="form-select"
          value=${selectedClass}
          onChange=${onClassInput}
          style=${selectStyle}
        >
          <option>Select Class</option>
          ${settings.classes.map(
            (o) => html` <option value="${o}">${o}</option> `
          )}
        </select>
      </div>

      ${strategyFilters.length > 0 &&
      html`<${Filters} strategyFilters=${strategyFilters} />`}
    </form>
  `;
};

const Filters = ({ strategyFilters }) => {
  return html`
    <h4 style=${filterTitleStyle}>Filters Area</h4>
    ${strategyFilters.map((filter) => renderFilter(filter))}
  `;
};

function renderFilter(filter) {
  if (!Array.isArray(filter.options)) {
    console.error(`Expected options to be an array, but got: `, filter.options);
    return html`<p>Invalid options format for filter: ${filter.label}</p>`;
  }

  return html`
    <div class="filter-group" style=${filterGroupStyle}>
      <h5 style=${filterLabelStyle}>${filter.label}</h5>
      ${filter.options.map(
        (option) => html`
          <div class="filter-option" style=${filterOptionStyle}>
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
              <option value="${calendar}">${calendar}</option>
            `
          )}
        </select>
      `;
    default:
      return html`
        <input
          type="text"
          id="${option.property}"
          name="${option.property}"
          class="form-input"
          placeholder="Enter ${option.label}"
          style=${inputStyle}
        />
      `;
  }
}

// Improved Styles
const formStyle = {
  maxWidth: "600px",
  margin: "20px auto",
  padding: "30px",
  background: "#f9f9f9",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  fontFamily: "'Arial', sans-serif",
};

const titleStyle = {
  fontSize: "28px",
  color: "#222",
  marginBottom: "20px",
  textAlign: "center",
};

const formGroupStyle = {
  marginBottom: "20px",
};

const labelStyle = {
  display: "block",
  fontWeight: "600",
  marginBottom: "10px",
  color: "#333",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
  boxSizing: "border-box",
};

const selectStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
  boxSizing: "border-box",
};

const filterGroupStyle = {
  marginBottom: "30px",
  padding: "20px",
  borderRadius: "8px",
  background: "#fff",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
};

const filterTitleStyle = {
  fontSize: "20px",
  color: "#444",
  marginTop: "0",
  marginBottom: "20px",
  textAlign: "center",
};

const filterLabelStyle = {
  fontSize: "18px",
  color: "#555",
  marginBottom: "15px",
};

const filterOptionStyle = {
  marginBottom: "15px",
};

const filterOptionLabelStyle = {
  display: "block",
  marginBottom: "6px",
  fontWeight: "500",
  color: "#555",
};

export { Form };
