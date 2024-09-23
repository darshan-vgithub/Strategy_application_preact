import {
  html,
  useState,
  useEffect,
} from "https://esm.sh/htm/preact/standalone";

import { showToast } from "./Toast.js";
import { AddFilterButton } from "./AddFilterButton.js";
import { FilterForm } from "./FilterForm.js";
import { Toast } from "./Toast.js"; // Import the Toast component

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
  const { label, class_name, universe, filters, onStateChange } = props;
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const onStrategyNameInput = (e) => {
    const name = e.target.value;
    // setStrategyName(name);
    onStateChange(e);
  };

  // const generateJSON = () => {
  //   const allFilters = [
  //     ...strategyFilters.map((filter) => ({
  //       class: filter.class,
  //       options: filter.options
  //         .map((option) => ({
  //           property: option.property,
  //           value: initialValues[option.property] || "", // Capture initial values
  //         }))
  //         .filter((opt) => opt.value !== ""),
  //     })),
  //     // ...customFilters.map((customFilter) => ({
  //     //   class: "CustomFilter",
  //     //   options: [
  //     //     { property: "name", value: customFilter.name || "" },
  //     //     { property: "calendar", value: customFilter.calendar || "" },
  //     //     { property: "lookUpWindow", value: customFilter.lookUpWindow || "" },
  //     //     { property: "returnSize", value: customFilter.returnSize || "" },
  //     //   ].filter((opt) => opt.value !== ""),
  //     // })),
  //     ...filterForms.map((form) => ({
  //       class: form.filter.class, // Ensure this is correctly set
  //       options: Object.keys(form.filter)
  //         .map((property) => ({
  //           property,
  //           value: form.filter[property] || "", // Reference correct property
  //         }))
  //         .filter((opt) => opt.value !== ""),
  //     })),
  //   ].filter((filter) => filter.options && filter.options.length > 0);

  //   const formData = {
  //     strategyName,
  //     class: selectedClass,
  //     universe: selectedUniverse,
  //     filters: allFilters,
  //   };

  //   console.log("Generated JSON:", JSON.stringify(formData, null, 2));
  //   showToast("JSON data generated. Check console for details.", "success");
  // };

  const handleAddFilter = () => {
    // setFilters((prevForms) => [
    //   ...prevForms,
    //   {
    //     filter: "",
    //     options: [],
    //   },
    // ]);
    setToastMessage(" added filter successfully!");
    setToastType("success");
    setTimeout(() => setToastMessage(""), 3000); // Hide toast after 3 seconds
  };

  const handleDeleteFilter = (id) => {
    /**
     * Deletes a filter form with the given id and shows a success toast message.
     * @param {number} id The id of the filter form to delete.
     */
    // TODO
    return;
    setToastMessage("Filter deleted successfully!");
    setToastType("error");
    setTimeout(() => setToastMessage(""), 3000); // Hide toast after 3 seconds
  };

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

  const Filters = ({ strategyFilters, initialValues, handleInputChange }) => {
    // return html`
    //   <div class="filters-section">
    //     ${strategyFilters.map(
    //       (filter) =>
    //         html`
    //           <h4>${filter.label}</h4>
    //           ${filter.options.map(
    //             (option) =>
    //               html`
    //                 <${FilterOption}
    //                   option=${option}
    //                   value=${initialValues[option.property] || ""}
    //                 />
    //               `
    //           )}
    //         `
    //     )}
    //   </div>
    // `;
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
          onInput=${onStateChange}
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
              html`
                <option
                  value="${className}"
                  selected=${class_name === className}
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
          data-prop="universe"
          value=${universe}
          onInput=${onStateChange}
          style=${selectStyle}
        >
          <option value="">Select Universe</option>
          ${settings.universes.map(
            (u) =>
              html`
                <option value="${u}" selected=${universe === u}>${u}</option>
              `
          )}
        </select>
      </div>

      <div class="filters-section" style=${filterGroupStyle}>
        <h3 style=${filterTitleStyle}>Filters</h3>
        <${Filters} strategyFilters=${filters} />
        <${AddFilterButton} onClick=${handleAddFilter} />
      </div>

      <div class="form-group" style=${formGroupStyle}>
        <button class="generate-json-btn" style=${inputStyle}>
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
