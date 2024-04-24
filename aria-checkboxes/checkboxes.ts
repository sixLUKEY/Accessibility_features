import { KeyCodes } from "../typings/app.interfaces";
import { slice } from "../typings/app.functions";

class CheckBox {
  element: HTMLElement;

  constructor(el: HTMLElement) {
    this.element = el;
    this.handleElement();
  }

  handleElement() {
    this.element.addEventListener("keydown", this.handleKeyDown.bind(this));
    this.element.addEventListener("click", this.toggle.bind(this));
    this.init();
  }

  handleKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case KeyCodes.ENTER:
      case KeyCodes.SPACE: {
        this.toggle();
        break;
      }
    }
  }

  toggle() {
    if (this.element.hasAttribute("checked")) {
      this.element.removeAttribute("checked");

      // Keep checked attribute and aria-checked in sync.
      this.element.setAttribute("aria-checked", "false");
    } else {
      this.element.setAttribute("checked", "");
      // Keep checked attribute and aria-checked in sync.
      this.element.setAttribute("aria-checked", "true");
    }
  }

  init() {
    this.element.setAttribute("role", "checkbox");
    if (this.element.hasAttribute("checked")) {
      this.element.setAttribute("aria-checked", "true");
    } else {
      this.element.setAttribute("aria-checked", "false");
    }
  }
}

const checkBoxes = slice(document.querySelectorAll(".checkbox"));
document.addEventListener("DOMContentLoaded", () => {
  for (let checkbox of checkBoxes) {
    return new CheckBox(checkbox);
  }
});
