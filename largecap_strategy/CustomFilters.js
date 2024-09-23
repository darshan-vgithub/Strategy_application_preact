// CustomFilters.js
import { html } from "https://esm.sh/htm/preact/standalone";

export function CustomFilters({ filters, handleFilterChange }) {
  return html`
    <div class="custom-filters">
      ${filters.map(
        (filter, index) => html`
          <div key=${index} class="custom-filter-item">
            <label for=${filter.name}>${filter.label}</label>
            ${filter.type === "text" &&
            html`
              <input
                id=${filter.name}
                type="text"
                value=${filter.value || ""}
                onInput=${(e) => handleFilterChange(index, e.target.value)}
              />
            `}
            ${filter.type === "number" &&
            html`
              <input
                id=${filter.name}
                type="number"
                value=${filter.value || ""}
                onInput=${(e) => handleFilterChange(index, e.target.value)}
              />
            `}
            <!-- Add other input types as needed -->
          </div>
        `
      )}
    </div>
  `;
}
