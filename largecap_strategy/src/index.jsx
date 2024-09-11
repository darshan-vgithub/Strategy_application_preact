import { useState, useRef } from "preact/hooks";
import { render } from "preact";
import "./style.css";

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

function App() {
  return (
    <div>
      <Resource />
    </div>
  );
}

function Resource() {
  const [filters, setFilters] = useState([]);
  const [customFilters, setCustomFilters] = useState([]);
  const [selectedClass, setSelectedClass] = useState("None");
  const [strategyName, setStrategyName] = useState("");
  const [generatedJson, setGeneratedJson] = useState(null);

  const universeRef = useRef(null);
  const classRef = useRef(null);

  const handleAddFilter = () => {
    setFilters([...filters, {}]);
  };

  const handleAddCustomFilter = () => {
    setCustomFilters([
      ...customFilters,
      { name: "", calendar: "", lookupWindow: "", returnSize: "" },
    ]);
  };

  const handleFilterChange = (index, filterData) => {
    const updatedFilters = [...filters];
    updatedFilters[index] = filterData;
    setFilters(updatedFilters);
  };

  const handleCustomFilterChange = (index, field, value) => {
    const updatedCustomFilters = [...customFilters];
    updatedCustomFilters[index] = {
      ...updatedCustomFilters[index],
      [field]: value,
    };
    setCustomFilters(updatedCustomFilters);
  };

  const handleStrategyNameChange = (e) => {
    setStrategyName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const universe = universeRef.current.value;
    const selectedClass = classRef.current.value;

    const data = {
      [strategyName]: {
        class: selectedClass,
        universe,
        filters: [...filters, ...customFilters],
      },
    };

    setGeneratedJson(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Strategy Form</h1>
      <div class="form-group">
        <label for="strategy-name">Strategy:</label>
        <input
          type="text"
          id="strategy-name"
          name="strategy"
          class="form-input"
          placeholder="Enter your strategy"
          value={strategyName}
          onChange={handleStrategyNameChange}
        />
      </div>
      <div class="form-group">
        <label for="universe">Universe:</label>
        <select
          id="universe"
          name="universe"
          class="form-select"
          ref={universeRef}
        >
          {settings.universes.map((o) => (
            <option value={o} key={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
      <div class="form-group">
        <label for="class">Class:</label>
        <select id="class" name="class" class="form-select" ref={classRef}>
          {settings.classes.map((c) => (
            <option value={c} key={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {selectedClass === "None" && (
        <>
          <div id="filters-section">
            {filters.map((_, index) => (
              <Filter
                key={index}
                index={index}
                onChange={(filterData) => handleFilterChange(index, filterData)}
              />
            ))}
          </div>
          <button type="button" onClick={handleAddFilter}>
            Add Filter
          </button>
          <div id="custom-filters-section">
            {customFilters.map((filter, index) => (
              <CustomFilter
                key={index}
                filter={filter}
                onChange={(field, value) =>
                  handleCustomFilterChange(index, field, value)
                }
              />
            ))}
          </div>
          <button type="button" onClick={handleAddCustomFilter}>
            Add Custom Filter
          </button>
        </>
      )}
      <button type="submit">Generate JSON</button>
      <Output label="test" universe={} />
      {generatedJson && (
        <div class="json-output">
          <h2>Generated JSON:</h2>
          <pre>{JSON.stringify(generatedJson, null, 2)}</pre>
        </div>
      )}
    </form>
  );
}

const Output = ({ children, ...props }) => {
  const { label, universe, filters, class_name } = props;
  const generatedJson = {};
  generatedJson[label] = {
    universe,
    class: class_name,
    filters,
  };
  return (
    <div class="json-output">
      <h2>Generated JSON:</h2>
      <pre>{JSON.stringify(generatedJson, null, 2)}</pre>
    </div>
  );
};

function Filter({ index, onChange }) {
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleChange = (e) => {
    const filterType = e.target.value;
    const selected = settings.filters.find((f) => f.label === filterType);

    if (selected) {
      const filterData = {
        filter: selected.class,
        options: selected.options.reduce((acc, option) => {
          acc[option.property] = "";
          return acc;
        }, {}),
      };
      setSelectedFilter(selected); // Store the selected filter
      onChange(filterData); // Pass data back to parent
    }
  };

  return (
    <div class="filter">
      <label>Filter {index + 1}:</label>
      <select onChange={handleChange}>
        <option value="">Select Filter</option>
        {settings.filters.map((f) => (
          <option value={f.label} key={f.label}>
            {f.label}
          </option>
        ))}
      </select>

      {selectedFilter && (
        <div class="filter-options">
          {selectedFilter.options.map((option, idx) => (
            <div key={idx} class="form-group">
              <label>{option.label}:</label>
              <input
                type={option.type === "number" ? "number" : "text"}
                placeholder={`Enter ${option.label}`}
                onChange={(e) =>
                  onChange({
                    filter: selectedFilter.class,
                    options: {
                      ...selectedFilter.options,
                      [option.property]: e.target.value,
                    },
                  })
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CustomFilter({ filter, onChange }) {
  return (
    <div class="custom-filter">
      <input
        type="text"
        placeholder="Custom Filter Name"
        value={filter.name}
        onChange={(e) => onChange("name", e.target.value)}
      />
      <select
        value={filter.calendar}
        onChange={(e) => onChange("calendar", e.target.value)}
      >
        <option value="">Select Calendar</option>
        {settings.calendars.map((c) => (
          <option value={c} key={c}>
            {c}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Look up window"
        value={filter.lookupWindow}
        onChange={(e) => onChange("lookupWindow", e.target.value)}
      />
      <input
        type="number"
        placeholder="Return size"
        value={filter.returnSize}
        onChange={(e) => onChange("returnSize", e.target.value)}
      />
    </div>
  );
}

render(<App />, document.getElementById("app"));
