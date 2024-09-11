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
  const { strategy, class_name, filters } = props;
  const [selectedClass, setSelectedClass] = useState(class_name || "");
  const [strategyName, setStrategyName] = useState(strategy || "");
  const [strategyFilters, setFilters] = useState(filters || []);

  const onClassInput = (e) => {
    setSelectedClass(e.target.value);
  };

  const onStrategyNameInput = (e) => {
    setStrategyName(e.target.value);
  };

  return html`
    <form id="strategyForm">
      <h1>Strategy Form</h1>
      <div class="form-group">
        <label for="strategy-name">Strategy:</label>
        <input
          type="text"
          id="strategy-name"
          name="strategy"
          class="form-input"
          placeholder="Enter your strategy"
          value=${strategyName}
          onChange=${onStrategyNameInput}
        />
      </div>
      <div class="form-group">
        <label for="universe">Universe:</label>
        <select id="universe" name="universe" class="form-select">
          <option>Select Universe</option>
          ${settings.universes.map(
            (o) => html` <option value="${o}">${o}</option> `
          )}
        </select>
      </div>
      <div class="form-group">
        <label for="class">Class:</label>
        <select
          id="class"
          name="class"
          class="form-select"
          value=${selectedClass}
          onChange=${onClassInput}
        >
          <option>Select Class</option>
          ${settings.classes.map(
            (o) => html` <option value="${o}">${o}</option> `
          )}
        </select>
      </div>

      ${selectedClass === "None" ? html`${Filters({ strategyFilters })}` : ""}
    </form>
  `;
};

const Filters = ({ strategyFilters }) => {
  return html`
    <h4>Filters Area</h4>
    ${strategyFilters.map((filter) => renderFilter(filter))}
  `;
};

function renderFilter(filter) {
  if (!Array.isArray(filter.options)) {
    console.error("Invalid filter options", filter);
    return html`<div>No valid options available for this filter</div>`;
  }

  return html`
    <div class="filter-group">
      <h5>${filter.label}</h5>
      ${filter.options.map(
        (option) => html`
          <div class="filter-option">
            <label for="${option.property}">${option.label}</label>
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
        />
      `;
    case "calendar":
      return html`
        <select
          id="${option.property}"
          name="${option.property}"
          class="form-select"
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
        />
      `;
  }
}

export { Form };
