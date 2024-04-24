import { KeyCodes } from "../typings/app.interfaces";
import { slice } from "../typings/app.functions";

class RadioGrup {
  element: HTMLElement;
  buttons: Array<HTMLElement>;
  private focusedIdx = 0;
  focusedButton: HTMLElement;

  constructor(id: string) {
    this.element = document.querySelector(id)!;
    this.buttons = slice(this.element.querySelectorAll(".radio"));
    this.focusedButton = this.buttons[this.focusedIdx];
    this.handleElement();
  }

  handleElement() {
    this.element.addEventListener("keydown", this.handleKeyDown.bind(this));
    this.element.addEventListener("click", this.handleClick.bind(this));
    this.init();
  }

  handleKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case KeyCodes.UP:
      case KeyCodes.LEFT: {
        e.preventDefault();

        this.focusedIdx--;
        if (this.focusedIdx < 0) {
          this.focusedIdx = this.focusedIdx + this.buttons.length;
        }
        break;
      }

      case KeyCodes.DOWN:
      case KeyCodes.RIGHT: {
        e.preventDefault();

        this.focusedIdx = (this.focusedIdx + 1) % this.buttons.length;

        break;
      }

      case KeyCodes.SPACE:
        let focusedButton = e.target as HTMLElement;
        let idx = this.buttons.indexOf(focusedButton);
        if (idx < 0) {
          return;
        }
        this.focusedIdx = idx;
        break;

      default:
        return;
    }
    this.changeFocus()
  }

  handleClick(e: Event) {
    let button = e.target as HTMLElement
    let idx = this.buttons.indexOf(button)
    if (idx < 0){
        return
    }
    this.focusedIdx = idx
    this.changeFocus()
  }

  changeFocus() {
    // Set the old button to tabindex -1
    this.focusedButton.tabIndex = -1

    this.focusedButton.removeAttribute('checked')
    this.focusedButton.setAttribute('aria-checked', 'false')

    // Set the new button to tabindex 0 and focus it
    this.focusedButton = this.buttons[this.focusedIdx]
    this.focusedButton.tabIndex = 0;
    this.focusedButton.focus()
    this.focusedButton.setAttribute('checked', '')
    this.focusedButton.setAttribute('aria-checked', 'true')
  }

  init() {
    // Set ARIA role for the radio group.
    this.element.setAttribute("role", "radio");

    let firstButton = true;
    for (let button of this.buttons) {
      if (firstButton) {
        button.tabIndex = 0;
        firstButton = false;
      } else {
        button.tabIndex = -1;
      }

      button.setAttribute("role", "radio");
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
    return new RadioGrup('#group1')
})