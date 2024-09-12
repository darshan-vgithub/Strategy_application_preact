import {
  html,
  useState,
  useEffect,
} from "https://esm.sh/htm/preact/standalone";

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

// Filters component to render the filters
const Filters = ({ strategyFilters, initialValues }) => {
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
                  <label for=${option.property} style=${filterOptionLabelStyle}
                    >${option.label}:</label
                  >
                  <input
                    type=${option.type === "number" ? "number" : "text"}
                    id=${option.property}
                    name=${option.property}
                    class="form-input"
                    style=${inputStyle}
                    value=${initialValues[option.property] || ""}
                  />
                </div>`
            )}
          </div>`
      )}
    </div>
  `;
};

const Form = (props) => {
  const { strategy, class_name, universe, filters, onStrategyNameChange } =
    props;
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedUniverse, setSelectedUniverse] = useState("");
  const [strategyFilters, setFilters] = useState([]);
  const [strategyName, setStrategyName] = useState(strategy);
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    if (filters && filters.length > 0) {
      // If filters are present, automatically set class to "None"
      setSelectedClass("None");
      setFilters(filters);

      // Set initial values for filters
      const values = filters.reduce((acc, filter) => {
        filter.options.forEach((option) => {
          if (option.property) {
            acc[option.property] = option[option.property] || "";
          }
        });
        return acc;
      }, {});
      setInitialValues(values);
    } else {
      // Sync state when props change (class_name, universe)
      setSelectedClass(class_name);
      setSelectedUniverse(universe);

      // Update filters based on selected class
      const filtersForClass = settings.filters.filter(
        (filter) => filter.class === class_name
      );
      setFilters(filtersForClass.length ? filtersForClass : []);
      setInitialValues({});
    }
  }, [class_name, universe, filters]);

  useEffect(() => {
    // Update universe when strategy has filters
    if (filters && filters.length > 0) {
      setSelectedUniverse(universe);
    }
  }, [filters, universe]);

  const onStrategyNameInput = (e) => {
    const name = e.target.value;
    setStrategyName(name);
    onStrategyNameChange(e); // Call parent component function
  };

  const onClassInput = (e) => {
    const selected = e.target.value;
    setSelectedClass(selected);

    if (selected === "None") {
      setFilters(filters);

      // Set initial values for filters
      const values = filters.reduce((acc, filter) => {
        filter.options.forEach((option) => {
          if (option.property) {
            acc[option.property] = initialValues[option.property] || "";
          }
        });
        return acc;
      }, {});
      setInitialValues(values);
    } else {
      const filtersForClass = settings.filters.filter(
        (filter) => filter.class === selected
      );
      setFilters(filtersForClass.length ? filtersForClass : []);
      setInitialValues({}); // Clear initial values when class changes
    }
  };

  const onUniverseInput = (e) => {
    setSelectedUniverse(e.target.value);
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
      />`}
    </form>
  `;
};

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
