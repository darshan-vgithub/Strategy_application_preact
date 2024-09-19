import { html } from "https://esm.sh/htm/preact/standalone";

// Toast component
export function Toast({ message, type }) {
  return html`
    <div
      style=${{
        position: "fixed",
        top: "10px",
        right: "10px",
        backgroundColor: type === "success" ? "#4CAF50" : "#f44336",
        color: "white",
        padding: "10px",
        borderRadius: "4px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
        zIndex: "1000",
        display: message ? "block" : "none",
      }}
    >
      ${message}
    </div>
  `;
}

// Show toast function
export function showToast(message, type) {
  // Assuming that the implementation for handling the toast display is here.
  // For example, you might set state or trigger some effect to show the toast
  // For simplicity, we are using console.log
  console.log(`Toast message: ${message}, type: ${type}`);
}
