import { html, useState } from "https://esm.sh/htm/preact/standalone";

export function FilterForm({ form, handleFilterInputChange, handleDelete }) {
  const [selectedFilter, setSelectedFilter] = useState("");

  // Handler for selecting a filter from the dropdown
  const handleFilterSelect = (e) => {
    setSelectedFilter(e.target.value);
  };

  return html`
    <div
      key=${form.id}
      style="margin-bottom: 20px; padding: 10px; border: 1px solid #ddd; border-radius: 4px;"
    >
      <div class="form-group" style="margin-bottom: 10px;">
        <label
          for="filter_type_${form.id}"
          style="display: block; margin-bottom: 5px; font-weight: bold; color: rgb(85, 85, 85);"
        >
          Select Filter:
        </label>
        <select
          id="filter_type_${form.id}"
          name="filter_type"
          class="form-select"
          style="padding: 8px; border: 1px solid rgb(221, 221, 221); border-radius: 4px; width: 100%;"
          onChange=${handleFilterSelect}
        >
          <option value="">Select Filter</option>
          <option value="market_cap">Market Cap Filter</option>
          <option value="generic_momentum">Generic Momentum Filter</option>
          <option value="positive_movement">Positive Movement Filter</option>
        </select>
      </div>

      ${selectedFilter === "market_cap" &&
      html`
        <div class="filter-group" style="margin-bottom: 20px;">
          <h4
            style="font-size: 16px; font-weight: bold; margin-bottom: 10px; color: rgb(51, 51, 51);"
          >
            Market Cap Filter
          </h4>
          <div class="form-group" style="margin-bottom: 10px;">
            <label
              for="min_market_cap_${form.id}"
              style="display: block; margin-bottom: 5px; font-weight: bold; color: rgb(85, 85, 85);"
            >
              Minimum Cap:
            </label>
            <input
              type="number"
              id="min_market_cap_${form.id}"
              name="min_market_cap"
              class="form-input"
              style="padding: 8px; border: 1px solid rgb(221, 221, 221); border-radius: 4px; width: 100%;"
              value=${form.filter.min_market_cap || ""}
              onInput=${(e) =>
                handleFilterInputChange(
                  form.id,
                  "min_market_cap",
                  e.target.value
                )}
            />
          </div>
        </div>
      `}
      ${selectedFilter === "generic_momentum" &&
      html`
        <div class="filter-group" style="margin-bottom: 20px;">
          <h4
            style="font-size: 16px; font-weight: bold; margin-bottom: 10px; color: rgb(51, 51, 51);"
          >
            Generic Momentum Filter
          </h4>
          <div class="form-group" style="margin-bottom: 10px;">
            <label
              for="calendar_generic_${form.id}"
              style="display: block; margin-bottom: 5px; font-weight: bold; color: rgb(85, 85, 85);"
            >
              Calendar:
            </label>
            <select
              id="calendar_generic_${form.id}"
              name="calendar_generic"
              class="form-select"
              style="padding: 8px; border: 1px solid rgb(221, 221, 221); border-radius: 4px; width: 100%;"
              value=${form.filter.calendar_generic || ""}
              onChange=${(e) =>
                handleFilterInputChange(
                  form.id,
                  "calendar_generic",
                  e.target.value
                )}
            >
              <option value="">Select Calendar</option>
              <option value="XNSE">XNSE</option>
              <option value="BCME">BCME</option>
            </select>
          </div>
          <div class="form-group" style="margin-bottom: 10px;">
            <label
              for="lookup_window_generic_${form.id}"
              style="display: block; margin-bottom: 5px; font-weight: bold; color: rgb(85, 85, 85);"
            >
              Look up window:
            </label>
            <input
              type="number"
              id="lookup_window_generic_${form.id}"
              name="lookup_window_generic"
              class="form-input"
              style="padding: 8px; border: 1px solid rgb(221, 221, 221); border-radius: 4px; width: 100%;"
              value=${form.filter.lookup_window_generic || ""}
              onInput=${(e) =>
                handleFilterInputChange(
                  form.id,
                  "lookup_window_generic",
                  e.target.value
                )}
            />
          </div>
        </div>
      `}
      ${selectedFilter === "positive_movement" &&
      html`
        <div class="filter-group" style="margin-bottom: 20px;">
          <h4
            style="font-size: 16px; font-weight: bold; margin-bottom: 10px; color: rgb(51, 51, 51);"
          >
            Positive Movement Filter
          </h4>
          <div class="form-group" style="margin-bottom: 10px;">
            <label
              for="calendar_positive_${form.id}"
              style="display: block; margin-bottom: 5px; font-weight: bold; color: rgb(85, 85, 85);"
            >
              Calendar:
            </label>
            <select
              id="calendar_positive_${form.id}"
              name="calendar_positive"
              class="form-select"
              style="padding: 8px; border: 1px solid rgb(221, 221, 221); border-radius: 4px; width: 100%;"
              value=${form.filter.calendar_positive || ""}
              onChange=${(e) =>
                handleFilterInputChange(
                  form.id,
                  "calendar_positive",
                  e.target.value
                )}
            >
              <option value="">Select Calendar</option>
              <option value="XNSE">XNSE</option>
              <option value="BCME">BCME</option>
            </select>
          </div>
          <div class="form-group" style="margin-bottom: 10px;">
            <label
              for="lookup_window_positive_${form.id}"
              style="display: block; margin-bottom: 5px; font-weight: bold; color: rgb(85, 85, 85);"
            >
              Look up window:
            </label>
            <input
              type="number"
              id="lookup_window_positive_${form.id}"
              name="lookup_window_positive"
              class="form-input"
              style="padding: 8px; border: 1px solid rgb(221, 221, 221); border-radius: 4px; width: 100%;"
              value=${form.filter.lookup_window_positive || ""}
              onInput=${(e) =>
                handleFilterInputChange(
                  form.id,
                  "lookup_window_positive",
                  e.target.value
                )}
            />
          </div>
        </div>
      `}

      <button
        onClick=${() => handleDelete(form.id)}
        style="background-color: #d9534f; color: white; border: none; padding: 10px; border-radius: 4px; cursor: pointer;"
      >
        Delete Filter
      </button>
    </div>
  `;
}
