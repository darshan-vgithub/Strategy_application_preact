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

// Fetch strategy JSON data
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
      console.log("Fetched Strategies Data:", data); // Log fetched data
      setStrategiesData(data);

      const filtersForClass =
        filters.length > 0
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

      setSelectedClass(class_name || "None");
      setSelectedUniverse(universe || "");
      setInitialValues(values);
    };

    initializeForm();
  }, [class_name, universe, filters]);

  useEffect(() => {
    if (strategyName && strategiesData[strategyName]) {
      const strategyData = strategiesData[strategyName];
      console.log("Strategy Data for", strategyName, ":", strategyData); // Log strategy data

      const updatedValues = {};
      const updatedFilters = [];

      // Ensure strategyData.filters is an array
      if (Array.isArray(strategyData.filters)) {
        strategyData.filters.forEach((filter) => {
          const filterDefinition = settings.filters.find(
            (f) => f.class === filter.filter
          );
          if (filterDefinition) {
            updatedFilters.push(filterDefinition);

            filter.options.forEach((optionObject) => {
              Object.keys(optionObject).forEach((property) => {
                if (property) {
                  updatedValues[property] = optionObject[property]; // Set value
                }
              });
            });
          }
        });
      }

      console.log("Updated Values:", updatedValues); // Log updated values
      console.log("Updated Filters:", updatedFilters); // Log updated filters

      // Update form state
      setFilters(updatedFilters);
      setInitialValues((prevValues) => ({
        ...prevValues,
        ...updatedValues, // Merge new values with existing ones
      }));
      setSelectedClass(strategyData.class || "None"); // Ensure class is set
      setSelectedUniverse(strategyData.universe || ""); // Prefill universe
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
    console.log(`Handling Input Change - Name: ${name}, Value: ${value}`); // Log input changes

    setInitialValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const FilterOption = ({ option, value = "", onInputChange }) => {
    console.log("FilterOption - Option:", option); // Log option
    console.log("FilterOption - Value:", value); // Log value

    // Render select input for calendar type
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
                html`<option value="${calendar}" selected=${value === calendar}>
                  ${calendar}
                </option>`
            )}
          </select>
        </div>
      `;
    }

    // Render other types of inputs (number, text)
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

  const Filters = ({ strategyFilters, initialValues, onInputChange }) => {
    console.log("Filters Component Initial Values:", initialValues); // Debugging

    return html`
      <div class="filters-container">
        ${strategyFilters.map((f) => {
          const filter = settings.filters.find((o) => o.class === f.class);
          if (!filter) return null;

          console.log("Filter:", filter); // Log filter

          return html`
            <div
              key=${filter.label}
              class="filter-group"
              style=${filterGroupStyle}
            >
              <h4 style=${filterTitleStyle}>${filter.label}</h4>
              ${filter.options.map(
                (option) => html`<${FilterOption} option=${option}
                value=${initialValues[option.property] || ""} // Ensure correct
                value onInputChange=${onInputChange} />`
              )}
            </div>
          `;
        })}
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

  return html`
    <div class="form-container" style=${formContainerStyle}>
      <div class="form-group" style=${formGroupStyle}>
        <label for="strategyName" style=${filterOptionLabelStyle}>
          Strategy Name:
        </label>
        <input
          type="text"
          id="strategyName"
          name="strategyName"
          class="form-input"
          style=${inputStyle}
          value=${strategyName}
          onInput=${onStrategyNameInput}
        />
      </div>

      <div class="form-group" style=${formGroupStyle}>
        <label for="class_name" style=${filterOptionLabelStyle}>
          Strategy Class:
        </label>
        <select
          id="class_name"
          name="class_name"
          class="form-select"
          style=${selectStyle}
          value=${selectedClass || ""}
          onInput=${onClassInput}
        >
          <option value="">Select Class</option>
          ${settings.classes.map(
            (classItem) =>
              html`<option
                value="${classItem}"
                selected=${selectedClass === classItem}
              >
                ${classItem}
              </option>`
          )}
        </select>
      </div>

      <div class="form-group" style=${formGroupStyle}>
        <label for="universe" style=${filterOptionLabelStyle}>
          Universe:
        </label>
        <select
          id="universe"
          name="universe"
          class="form-select"
          style=${selectStyle}
          value=${selectedUniverse || ""}
          onInput=${onUniverseInput}
        >
          <option value="">Select Universe</option>
          ${settings.universes.map(
            (universeItem) =>
              html`<option
                value="${universeItem}"
                selected=${selectedUniverse === universeItem}
              >
                ${universeItem}
              </option>`
          )}
        </select>
      </div>

      <${Filters}
        strategyFilters=${strategyFilters}
        initialValues=${initialValues}
        onInputChange=${handleInputChange}
      />
    </div>
  `;
};

export { Form };
