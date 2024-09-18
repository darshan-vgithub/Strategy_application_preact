import { html } from "https://esm.sh/htm/preact/standalone";

const AddFilterButton = ({ onClick }) => {
  return html`
    <button
      onClick=${onClick}
      style="margin-top: 20px; padding: 10px; font-size: 16px; color: white; background-color: #007bff; border: none; border-radius: 4px; cursor: pointer;"
    >
      Add Filter
    </button>
  `;
};

export { AddFilterButton };
