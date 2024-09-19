import { html } from "https://esm.sh/htm/preact/standalone";

export function AddCustomFiltersButton({ showCustomFilters, onClick }) {
  return html`
    <button onClick=${onClick}>
      ${showCustomFilters ? "Hide Custom Filters" : "Add Custom Filters"}
    </button>
  `;
}
