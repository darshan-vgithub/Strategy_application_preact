import {
  html,
  useState,
  useEffect,
} from "https://esm.sh/htm/preact/standalone";

// Settings configuration
const settings = {
  classes: ["CruiseMomentum", "None"],
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
        { label: "Calendar", property: "calendar_name", type: "calendar" },
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

// Filters component to render the filters
const Filters = ({ strategyFilters, initialValues, onInputChange }) => {
  return html`
    <div>
      ${strategyFilters.map(
        (filter) =>
          html`<div
            key=${filter.label}
            class="filter-group"
            style=${filterGroupStyle}
          >
            <h4 style=${filterTitleStyle}>${filter.label}</h4>
            ${filter.options.map(
              (option) =>
                html`<div class="form-group" style=${filterOptionStyle}>
                  <label for=${option.property} style=${filterOptionLabelStyle}>
                    ${option.label}:
                  </label>
                  <input type=${option.type === "number" ? "number" : "text"}
                  id=${option.property} name=${option.property}
                  class="form-input" style=${inputStyle}
                  value=${initialValues[option.property] || ""}
                  onInput=${(e) => onInputChange(e.target.name, e.target.value)}
                  // Handle input change />
                </div>`
            )}
          </div>`
      )}
    </div>
  `;
};

// Form Component
const Form = (props) => {
  const { strategy, class_name, universe, filters, onStrategyNameChange } =
    props;
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedUniverse, setSelectedUniverse] = useState("");
  const [strategyFilters, setFilters] = useState([]);
  const [strategyName, setStrategyName] = useState(strategy);
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    console.log("Class/Universe/Filters changed:", {
      class_name,
      filters,
      universe,
    });

    if (filters && filters.length > 0) {
      setSelectedClass(class_name || "None");
      setSelectedUniverse(universe || "");

      // Update filters based on class_name
      const filtersForClass = filters;
      setFilters(filtersForClass);

      // Initialize values based on filters
      const values = filtersForClass.reduce((acc, filter) => {
        filter.options.forEach((option) => {
          if (option.property) {
            acc[option.property] = ""; // Initialize with empty value
          }
        });
        return acc;
      }, {});
      setInitialValues(values);

      // Debugging: Log initialized values
      console.log("Initial Values:", values);
    } else {
      setSelectedClass(class_name || "");
      setSelectedUniverse(universe || "");

      // Update filters based on selected class
      const filtersForClass = settings.filters.filter(
        (filter) => filter.class === class_name
      );
      setFilters(filtersForClass.length ? filtersForClass : []);

      // Prefill with JSON data if available
      const values = filtersForClass.reduce((acc, filter) => {
        filter.options.forEach((option) => {
          if (option.property) {
            acc[option.property] = ""; // Set from data source
          }
        });
        return acc;
      }, {});
      setInitialValues(values);
    }
  }, [class_name, universe, filters]);

  const onStrategyNameInput = (e) => {
    const name = e.target.value;
    setStrategyName(name);
    onStrategyNameChange(e); // Call parent component function
  };

  const onClassInput = (e) => {
    const selected = e.target.value;
    setSelectedClass(selected);

    if (selected === "None") {
      // If "None" is selected, clear the filters
      setFilters([]);
      setInitialValues({});
    } else {
      const filtersForClass = settings.filters.filter(
        (filter) => filter.class === selected
      );
      setFilters(filtersForClass.length ? filtersForClass : []);

      // Initialize values based on JSON data if available
      const values = filtersForClass.reduce((acc, filter) => {
        filter.options.forEach((option) => {
          if (option.property) {
            acc[option.property] = ""; // Set from data source
          }
        });
        return acc;
      }, {});
      setInitialValues(values);
    }
  };

  const onUniverseInput = (e) => {
    setSelectedUniverse(e.target.value);
  };

  const handleInputChange = (name, value) => {
    setInitialValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
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
          value=${selectedUniverse}
          onChange=${onUniverseInput}
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
      html`<${Filters}
        strategyFilters=${strategyFilters}
        initialValues=${initialValues}
        onInputChange=${handleInputChange}
      />`}
    </form>
  `;
};

// Styles remain unchanged
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
  marginBottom: "20px",
  fontSize: "24px",
  fontWeight: "bold",
  color: "#333",
};

const formGroupStyle = {
  marginBottom: "20px",
};

const labelStyle = {
  display: "block",
  marginBottom: "5px",
  fontWeight: "bold",
  color: "#555",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ddd",
};

const selectStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ddd",
};

const filterGroupStyle = {
  marginBottom: "20px",
};

const filterTitleStyle = {
  marginBottom: "10px",
  fontSize: "18px",
  fontWeight: "bold",
  color: "#444",
};

const filterOptionStyle = {
  marginBottom: "10px",
};

const filterOptionLabelStyle = {
  display: "block",
  marginBottom: "5px",
  fontWeight: "bold",
  color: "#666",
};

export { Form };
