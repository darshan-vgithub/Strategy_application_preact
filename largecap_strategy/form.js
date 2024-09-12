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
  const [selectedClass, setSelectedClass] = useState(class_name || "");
  const [strategyName, setStrategyName] = useState(strategy || "");
  const [strategyFilters, setFilters] = useState(filters || []);

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

  const onStrategyNameInput = (e) => {
    const name = e.target.value;
    setStrategyName(name);
    onStrategyNameChange(e); // Call the function passed as a prop to update the parent component
  };

  return html`
    <form id="strategyForm" style=${formStyle}>
      <h1 style=${{ fontSize: "24px", color: "#333", marginBottom: "20px" }}>
        Strategy Form
      </h1>
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
      <h5 style=${{ fontSize: "16px", color: "#555", marginBottom: "10px" }}>
        ${filter.label}
      </h5>
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

// Styles
const formStyle = {
  maxWidth: "600px",
  margin: "20px auto",
  padding: "20px",
  background: "#fff",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
};

const formGroupStyle = {
  marginBottom: "15px",
};

const labelStyle = {
  display: "block",
  fontWeight: "bold",
  marginBottom: "5px",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ddd",
};

const selectStyle = {
  width: "100%",
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ddd",
};

const filterGroupStyle = {
  marginBottom: "20px",
};

const filterOptionStyle = {
  marginBottom: "10px",
};

const filterOptionLabelStyle = {
  display: "block",
  marginBottom: "5px",
};

export { Form };
