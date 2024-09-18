import { html } from "https://esm.sh/htm/preact/standalone";

export function FilterForm({ form, handleFilterInputChange, handleDelete }) {
  return html`
    <div
      key=${form.id}
      style="margin-bottom: 20px; padding: 10px; border: 1px solid #ddd; border-radius: 4px;"
    >
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
      <div class="filter-group" style="margin-bottom: 20px;">
        <h4
          style="font-size: 16px; font-weight: bold; margin-bottom: 10px; color: rgb(51, 51, 51);"
        >
          Generic Momentum Filter
        </h4>
        <div class="form-group" style="margin-bottom: 10px;">
          <label
            for="calendar_${form.id}"
            style="display: block; margin-bottom: 5px; font-weight: bold; color: rgb(85, 85, 85);"
          >
            Calendar:
          </label>
          <select
            id="calendar_${form.id}"
            name="calendar"
            class="form-select"
            style="padding: 8px; border: 1px solid rgb(221, 221, 221); border-radius: 4px; width: 100%;"
            value=${form.filter.calendar || ""}
            onChange=${(e) =>
              handleFilterInputChange(form.id, "calendar", e.target.value)}
          >
            <option value="">Select Calendar</option>
            <option value="XNSE">XNSE</option>
            <option value="BCME">BCME</option>
          </select>
        </div>
        <div class="form-group" style="margin-bottom: 10px;">
          <label
            for="lookup_window_${form.id}"
            style="display: block; margin-bottom: 5px; font-weight: bold; color: rgb(85, 85, 85);"
          >
            Look up window:
          </label>
          <input
            type="number"
            id="lookup_window_${form.id}"
            name="lookup_window"
            class="form-input"
            style="padding: 8px; border: 1px solid rgb(221, 221, 221); border-radius: 4px; width: 100%;"
            value=${form.filter.lookup_window || ""}
            onInput=${(e) =>
              handleFilterInputChange(form.id, "lookup_window", e.target.value)}
          />
        </div>
        <div class="form-group" style="margin-bottom: 10px;">
          <label
            for="return_size_${form.id}"
            style="display: block; margin-bottom: 5px; font-weight: bold; color: rgb(85, 85, 85);"
          >
            Return size:
          </label>
          <input
            type="number"
            id="return_size_${form.id}"
            name="return_size"
            class="form-input"
            style="padding: 8px; border: 1px solid rgb(221, 221, 221); border-radius: 4px; width: 100%;"
            value=${form.filter.return_size || ""}
            onInput=${(e) =>
              handleFilterInputChange(form.id, "return_size", e.target.value)}
          />
        </div>
      </div>
      <div class="filter-group" style="margin-bottom: 20px;">
        <h4
          style="font-size: 16px; font-weight: bold; margin-bottom: 10px; color: rgb(51, 51, 51);"
        >
          Positive Movement Filter
        </h4>
        <div class="form-group" style="margin-bottom: 10px;">
          <label
            for="calendar_${form.id}"
            style="display: block; margin-bottom: 5px; font-weight: bold; color: rgb(85, 85, 85);"
          >
            Calendar:
          </label>
          <select
            id="calendar_${form.id}"
            name="calendar"
            class="form-select"
            style="padding: 8px; border: 1px solid rgb(221, 221, 221); border-radius: 4px; width: 100%;"
            value=${form.filter.calendar || ""}
            onChange=${(e) =>
              handleFilterInputChange(form.id, "calendar", e.target.value)}
          >
            <option value="">Select Calendar</option>
            <option value="XNSE">XNSE</option>
            <option value="BCME">BCME</option>
          </select>
        </div>
        <div class="form-group" style="margin-bottom: 10px;">
          <label
            for="lookup_window_${form.id}"
            style="display: block; margin-bottom: 5px; font-weight: bold; color: rgb(85, 85, 85);"
          >
            Look up window:
          </label>
          <input
            type="number"
            id="lookup_window_${form.id}"
            name="lookup_window"
            class="form-input"
            style="padding: 8px; border: 1px solid rgb(221, 221, 221); border-radius: 4px; width: 100%;"
            value=${form.filter.lookup_window || ""}
            onInput=${(e) =>
              handleFilterInputChange(form.id, "lookup_window", e.target.value)}
          />
        </div>
        <div class="form-group" style="margin-bottom: 10px;">
          <label
            for="positive_return_size_${form.id}"
            style="display: block; margin-bottom: 5px; font-weight: bold; color: rgb(85, 85, 85);"
          >
            Positive return size:
          </label>
          <input
            type="number"
            id="positive_return_size_${form.id}"
            name="positive_return_size"
            class="form-input"
            style="padding: 8px; border: 1px solid rgb(221, 221, 221); border-radius: 4px; width: 100%;"
            value=${form.filter.positive_return_size || ""}
            onInput=${(e) =>
              handleFilterInputChange(
                form.id,
                "positive_return_size",
                e.target.value
              )}
          />
        </div>
      </div>
      <button
        onClick=${() => handleDelete(form.id)}
        style="background-color: #d9534f; color: white; border: none; padding: 10px; border-radius: 4px; cursor: pointer;"
      >
        Delete Filter
      </button>
    </div>
  `;
}
