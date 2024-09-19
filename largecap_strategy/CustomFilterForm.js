import { html } from "https://esm.sh/htm/preact/standalone";

export function CustomFilterForm({ onRemove }) {
  return html`
    <div
      style="margin-bottom: 20px; border: 1px solid #ccc; padding: 15px; border-radius: 5px;"
    >
      <label style="display: block; margin-bottom: 5px;"
        >Custom Filter Name:</label
      >
      <input
        type="text"
        class="custom-filter-name"
        placeholder="Filter Name"
        style="width: 100%; padding: 8px; box-sizing: border-box;"
      />

      <label style="display: block; margin: 10px 0 5px;">Calendar:</label>
      <select
        class="custom-calendar-select"
        style="width: 100%; padding: 8px; box-sizing: border-box;"
      >
        <option value="">Select Calendar</option>
        <option value="XNSE">XNSE</option>
        <option value="BCME">BCME</option>
      </select>

      <label style="display: block; margin: 10px 0 5px;">Look up window:</label>
      <input
        type="number"
        class="custom-look-up-window"
        placeholder="Look up window"
        style="width: 100%; padding: 8px; box-sizing: border-box;"
      />

      <label style="display: block; margin: 10px 0 5px;">Return size:</label>
      <input
        type="number"
        class="custom-return-size"
        placeholder="Return size"
        style="width: 100%; padding: 8px; box-sizing: border-box;"
      />

      <button
        class="remove-custom-filter"
        style="margin-top: 10px; padding: 8px 12px; background-color: #f44336; color: #fff; border: none; border-radius: 4px; cursor: pointer;"
        onClick=${onRemove}
      >
        Remove
      </button>
    </div>
  `;
}
