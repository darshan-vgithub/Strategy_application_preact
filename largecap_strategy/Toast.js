// Toast.js
import { html } from "https://esm.sh/htm/preact/standalone";

export function Toast({ message, type }) {
  return html`
    <div
      style="
        position: fixed;
        top: 10px;
        right: 10px;
        background-color: ${type === "success" ? "#4CAF50" : "#f44336"};
        color: white;
        padding: 10px;
        border-radius: 4px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        z-index: 1000;
        display: ${message ? "block" : "none"};
      "
    >
      ${message}
    </div>
  `;
}
