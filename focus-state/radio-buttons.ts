// Define values for keycode
import { KeyCodes } from "../typings/app.interfaces";

// Helper function to convert NodeLists to Arrays
import { slice } from "../typings/app.functions";

class RadioGroup {
  el: HTMLElement;
  buttons: HTMLElement[]
  focusedIdx = 0;
  focusedButton: HTMLElement;

  constructor(id: string) {
    this.el = document.querySelector(id)!;
    this.buttons = slice(this.el.querySelectorAll<HTMLElement>(".radio"));
    this.focusedButton = this.buttons[this.focusedIdx]
    this.handleEl()
  }

  handleEl() {
    this.el.addEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case KeyCodes.UP:
      case KeyCodes.LEFT: {
        e.preventDefault();

        if (this.focusedIdx === 0) {
          this.focusedIdx = this.buttons.length - 1;
        } else {
          this.focusedIdx--;
        }
        break;
      }
      case KeyCodes.DOWN:
      case KeyCodes.RIGHT: {
        e.preventDefault();

        if (this.focusedIdx === this.buttons.length) {
          this.focusedIdx = 0;
        } else {
          this.focusedIdx++;
        }
        break;
      }
    }

    this.changeFocus(this.focusedIdx);
  }

  changeFocus(index: number) {
    // Set the old button to tabindex -1
    this.focusedButton.tabIndex = -1;
    this.focusedButton.removeAttribute("checked");

    // set the new button to tabindex 0 and focus it
    this.focusedButton = this.buttons[index];
    this.focusedButton.tabIndex = 0;
    this.focusedButton.focus();
    this.focusedButton.setAttribute("checked", "checked");
  }
}

document.addEventListener('DOMContentLoaded', () => {
  return new RadioGroup("#group1");
})
