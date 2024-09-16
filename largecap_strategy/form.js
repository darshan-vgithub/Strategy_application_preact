import {
  html,
  useState,
  useEffect,
} from "https://esm.sh/htm/preact/standalone";

// Sample settings data
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

// Sample JSON data for strategies
const fetchStrategiesData = async () => {
  const response = await fetch("/largecap_strategy/strategies.json");
  const data = await response.json();
  return data;
};

const Form = (props) => {
  const { strategy, class_name, universe, filters, onStrategyNameChange } =
    props;
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedUniverse, setSelectedUniverse] = useState("");
  const [strategyFilters, setFilters] = useState([]);
  const [strategyName, setStrategyName] = useState(strategy);
  const [initialValues, setInitialValues] = useState({});
  const [strategiesData, setStrategiesData] = useState({});

  useEffect(() => {
    const initializeForm = async () => {
      const data = await fetchStrategiesData();
      setStrategiesData(data);

      const filtersForClass =
        filters && filters.length > 0
          ? filters
          : settings.filters.filter((filter) => filter.class === class_name);

      setFilters(filtersForClass);

      const values = filtersForClass.reduce((acc, filter) => {
        filter.options.forEach((option) => {
          if (option.property) {
            acc[option.property] = ""; // Initialize with empty value
          }
        });
        return acc;
      }, {});

      // Initialize class and universe
      setSelectedClass(class_name || "None");
      setSelectedUniverse(universe || "");
      setInitialValues(values);
    };

    initializeForm();
  }, [class_name, universe, filters]);

  useEffect(() => {
    if (strategyName && strategiesData[strategyName]) {
      const strategyData = strategiesData[strategyName];
      const updatedValues = { ...initialValues };

      strategyData.filters.forEach((filter) => {
        if (filter.property in updatedValues) {
          updatedValues[filter.property] = filter.value;
        }
      });

      setInitialValues(updatedValues);
    }
  }, [strategyName, strategiesData]);

  const onStrategyNameInput = (e) => {
    const name = e.target.value;
    setStrategyName(name);
    onStrategyNameChange(e);
  };

  const onClassInput = (e) => {
    const selected = e.target.value;
    setSelectedClass(selected);

    if (selected === "None") {
      setFilters([]);
      setInitialValues({});
    } else {
      const filtersForClass = settings.filters.filter(
        (filter) => filter.class === selected
      );
      setFilters(filtersForClass.length ? filtersForClass : []);

      const values = filtersForClass.reduce((acc, filter) => {
        filter.options.forEach((option) => {
          if (option.property) {
            acc[option.property] = ""; // Initialize with empty value
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

  // Inner FilterOption component
  const FilterOption = ({ option, value, onInputChange }) => {
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
            value=${value || ""}
            onInput=${(e) => onInputChange(e.target.name, e.target.value)}
          >
            <option value="">Select Calendar</option>
            ${settings.calendars.map(
              (calendar) =>
                html` <option value="${calendar}">${calendar}</option> `
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
          value=${value || ""}
          onInput=${(e) => onInputChange(e.target.name, e.target.value)}
        />
      </div>
    `;
  };

  // Inner Filters component
  const Filters = ({ strategyFilters, initialValues, onInputChange }) => {
    return html`
      <div>
        ${strategyFilters.map((f) => {
          const filter = settings.filters.find((o) => o.class === f.filter);
          if (!filter) return null;

          return html`<div
            key=${filter.label}
            class="filter-group"
            style=${filterGroupStyle}
          >
            <h4 style=${filterTitleStyle}>${filter.label}</h4>
            ${filter.options.map(
              (option) => html`<${FilterOption}
                option=${option}
                value=${initialValues[option.property]}
                onInputChange=${onInputChange}
              />`
            )}
          </div>`;
        })}
      </div>
    `;
  };

  // Styles
  const filterOptionStyle = {
    marginBottom: "10px",
  };

  const filterOptionLabelStyle = {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#555",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  const selectStyle = {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
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

  const formStyle = {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  };

  const formGroupStyle = {
    marginBottom: "20px",
  };

  const titleStyle = {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#555",
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
          onInput=${onStrategyNameInput}
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
          onInput=${onUniverseInput}
          style=${selectStyle}
        >
          <option value="">Select Universe</option>
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
          onInput=${onClassInput}
          style=${selectStyle}
        >
          <option value="">Select Class</option>
          ${settings.classes.map(
            (o) => html` <option value="${o}">${o}</option> `
          )}
        </select>
      </div>
      <${Filters}
        strategyFilters=${strategyFilters}
        initialValues=${initialValues}
        onInputChange=${handleInputChange}
      />
    </form>
  `;
};

// Styles
const formStyle = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "20px",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
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
  fontSize: "16px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const selectStyle = {
  width: "100%",
  padding: "10px",
  fontSize: "16px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

export { Form };
