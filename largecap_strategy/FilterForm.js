import { html, useState } from "https://esm.sh/htm/preact/standalone";

const FilterForm = ({ filter, onSubmit, onCancel }) => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ input1, input2 });
  };

  return html`
    <div
      style="margin: 20px; padding: 20px; border: 1px solid #ddd; border-radius: 8px;"
    >
      <h3>Add New Filter</h3>
      <form onSubmit=${handleSubmit}>
        <div style="margin-bottom: 10px;">
          <label>
            Input 1:
            <input
              type="text"
              value=${input1}
              onInput=${(e) => setInput1(e.target.value)}
              style="padding: 8px; border: 1px solid #ddd; border-radius: 4px; width: 100%;"
            />
          </label>
        </div>
        <div style="margin-bottom: 10px;">
          <label>
            Input 2:
            <input
              type="text"
              value=${input2}
              onInput=${(e) => setInput2(e.target.value)}
              style="padding: 8px; border: 1px solid #ddd; border-radius: 4px; width: 100%;"
            />
          </label>
        </div>
        <button type="submit" style="margin-right: 10px;">Submit</button>
        <button type="button" onClick=${onCancel}>Cancel</button>
      </form>
    </div>
  `;
};

export { FilterForm };
