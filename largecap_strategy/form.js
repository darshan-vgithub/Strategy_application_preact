import {
  html,
  useState,
  useEffect,
} from "https://esm.sh/htm/preact/standalone";
import { showToast } from "./Toast.js";
import { AddFilterButton } from "./AddFilterButton.js";
import { AddCustomFilterButton } from "./AddCustomFiltersButton.js";
import { FilterForm } from "./FilterForm.js";
import { CustomFilterForm } from "./CustomFilterForm.js";
import { Toast } from "./Toast.js"; // Import the Toast component

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
  // const [customFilters, setCustomFilters] = useState([]);
  const [showFilterForm, setShowFilterForm] = useState(false); // For toggling the filter form
  // const [showCustomFilterForm, setShowCustomFilterForm] = useState(false); // For custom filter form

  // States for filters and toasts
  const [filterForms, setFilterForms] = useState([]); // State to hold filter forms
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  useEffect(() => {
    const initializeForm = async () => {
      const data = await fetchStrategiesData();
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

      const updatedValues = {};
      const updatedFilters = [];

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

      setFilters(updatedFilters);
      setInitialValues((prevValues) => ({
        ...prevValues,
        ...updatedValues, // Merge new values with existing ones
      }));
      setSelectedClass(strategyData.class || "None"); // Ensure class is set
      setSelectedUniverse(strategyData.universe || ""); // Prefill universe
    } else if (strategyName) {
      showToast("Strategy not found!", "error"); // Show custom toast if strategy not found
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

  const addFilter = (filter) => {
    setFilters((prevFilters) => [...prevFilters, filter]);
  };

  // const addCustomFilter = (filter) => {
  //   setCustomFilters((prevCustomFilters) => [...prevCustomFilters, filter]);
  // };

  console.log("Filter Forms:", filterForms);
  // console.log("Custom Filters:", customFilters);

  const generateJSON = () => {
    const allFilters = [
      ...strategyFilters.map((filter) => ({
        class: filter.class,
        options: filter.options
          .map((option) => ({
            property: option.property,
            value: initialValues[option.property] || "", // Capture initial values
          }))
          .filter((opt) => opt.value !== ""),
      })),
      // ...customFilters.map((customFilter) => ({
      //   class: "CustomFilter",
      //   options: [
      //     { property: "name", value: customFilter.name || "" },
      //     { property: "calendar", value: customFilter.calendar || "" },
      //     { property: "lookUpWindow", value: customFilter.lookUpWindow || "" },
      //     { property: "returnSize", value: customFilter.returnSize || "" },
      //   ].filter((opt) => opt.value !== ""),
      // })),
      ...filterForms.map((form) => ({
        class: form.filter.class, // Ensure this is correctly set
        options: Object.keys(form.filter)
          .map((property) => ({
            property,
            value: form.filter[property] || "", // Reference correct property
          }))
          .filter((opt) => opt.value !== ""),
      })),
    ].filter((filter) => filter.options && filter.options.length > 0);

    const formData = {
      strategyName,
      class: selectedClass,
      universe: selectedUniverse,
      filters: allFilters,
    };

    console.log("Generated JSON:", JSON.stringify(formData, null, 2));
    showToast("JSON data generated. Check console for details.", "success");
  };

  const handleAddFilter = () => {
    debugger;
    const newId = Date.now(); // Unique ID for the new filter
    setFilterForms((prevForms) => [
      ...prevForms,
      {
        id: newId,
        filter: {
          class: "",
          min_market_cap: "",
          calendar_generic: "",
          lookup_window_generic: "",
          return_size_generic: "",
          calendar_positive: "",
          lookup_window_positive: "",
          positive_return_size: "",
        },
      },
    ]);
    setToastMessage(" added filter successfully!");
    setToastType("success");
    setTimeout(() => setToastMessage(""), 3000); // Hide toast after 3 seconds
  };

  // const handleAddCustomFilter = () => {
  //   setCustomFilters((prev) => [
  //     ...prev,
  //     {
  //       id: Date.now(),
  //       name: "",
  //       calendar: "",
  //       lookUpWindow: "",
  //       returnSize: "",
  //     },
  //   ]);
  //   setToastMessage("Custom filter added successfully!");
  //   setToastType("success");
  //   setTimeout(() => setToastMessage(""), 3000); // Hide toast after 3 seconds
  // };

  // const handleRemoveCustomFilter = (id) => {
  //   setCustomFilters((prev) => prev.filter((filter) => filter.id !== id));
  //   setToastMessage("Custom filter removed successfully!");
  //   setToastType("error");
  //   setTimeout(() => setToastMessage(""), 3000); // Hide toast after 3 seconds
  // };

  const handleDeleteFilter = (id) => {
    setFilterForms((prevForms) => prevForms.filter((form) => form.id !== id));
    setToastMessage("Filter deleted successfully!");
    setToastType("error");
    setTimeout(() => setToastMessage(""), 3000); // Hide toast after 3 seconds
  };

  // const onFilterChange = (id, e, field) => {
  //   const value = e.target.value;
  //   setCustomFilters((prev) =>
  //     prev.map((filter) =>
  //       filter.id === id
  //         ? {
  //             ...filter,
  //             [field]: value,
  //           }
  //         : filter
  //     )
  //   );
  // };

  const FilterOption = ({ option, value = "", onInputChange }) => {
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
                html`
                  <option value="${calendar}" selected=${value === calendar}>
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
          value=${value || ""}
          onInput=${(e) => onInputChange(e.target.name, e.target.value)}
        />
      </div>
    `;
  };

  const handleFilterInputChange = (id, field, value) => {
    setFilterForms((prevForms) =>
      prevForms.map((form) => {
        if (form.id === id) {
          return {
            ...form,
            filter: {
              ...form.filter,
              [field]: value, // Update the specific field for the filter
            },
          };
        }
        return form;
      })
    );
  };

  const Filters = ({ strategyFilters, initialValues, handleInputChange }) => {
    return html`
      <div class="filters-section">
        ${strategyFilters.map(
          (filter) =>
            html`
              <h4>${filter.label}</h4>
              ${filter.options.map(
                (option) =>
                  html`
                    <${FilterOption}
                      option=${option}
                      value=${initialValues[option.property] || ""}
                      onInputChange=${(name, value) =>
                        handleFilterInputChange(
                          filter.id,
                          option.property,
                          value
                        )}
                    />
                  `
              )}
            `
        )}
      </div>
    `;
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
          value=${strategyName || ""}
          onInput=${onStrategyNameInput}
          style=${inputStyle}
        />
      </div>

      <div class="form-group" style=${formGroupStyle}>
        <label for="class">Class:</label>
        <select
          id="class"
          name="class"
          value=${selectedClass}
          onInput=${onClassInput}
          style=${selectStyle}
        >
          <option value="None">None</option>
          ${settings.classes.map(
            (className) =>
              html`
                <option
                  value="${className}"
                  selected=${selectedClass === className}
                >
                  ${className}
                </option>
              `
          )}
        </select>
      </div>

      <div class="form-group" style=${formGroupStyle}>
        <label for="universe">Universe:</label>
        <select
          id="universe"
          name="universe"
          value=${selectedUniverse}
          onInput=${onUniverseInput}
          style=${selectStyle}
        >
          <option value="">Select Universe</option>
          ${settings.universes.map(
            (universe) =>
              html`
                <option
                  value="${universe}"
                  selected=${selectedUniverse === universe}
                >
                  ${universe}
                </option>
              `
          )}
        </select>
      </div>

      <div class="filters-section" style=${filterGroupStyle}>
        <h3 style=${filterTitleStyle}>Filters</h3>
        <${Filters}
          strategyFilters=${strategyFilters}
          initialValues=${initialValues}
          handleInputChange=${handleInputChange}
        />
        <${AddFilterButton} onClick=${handleAddFilter} />
        <div>
          ${filterForms.map(
            (form) => html`
              <${FilterForm} key=${form.id} form=${form}
              handleFilterInputChange=${handleFilterInputChange} // Pass this
              prop handleDelete=${() => handleDeleteFilter(form.id)} />
            `
          )}
        </div>
      </div>

      <div class="form-group" style=${formGroupStyle}>
        <button
          class="generate-json-btn"
          style=${inputStyle}
          onClick=${generateJSON}
        >
          Generate JSON
        </button>
      </div>

      <!-- Toast Notifications -->
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
