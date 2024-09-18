import { html } from "https://esm.sh/htm/preact/standalone";
const AddFilterButton = ({ availableFilters, onAddFilter }) => {
  const handleAddFilter = () => {
    if (availableFilters.length > 0) {
      const newFilter = availableFilters[0]; // Select the first available filter
      onAddFilter(newFilter);
    }
  };

  return html`
    <button onClick=${handleAddFilter} style="margin-top: 20px;">
      Add Filter
    </button>
  `;
};

// Export the component using named export
export { AddFilterButton };
