import { render } from "preact";

function Form() {
  return (
    <>
      <div>
        <form action="">
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
        </form>
      </div>
    </>
  );
}
render(Form, document.body);
