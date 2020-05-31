import { LitElement, html, css, property, customElement } from "lit-element";

@customElement("atcoder-note-editor")
export class NoteEditor extends LitElement {
  @property({ type: String, attribute: "content" }) text: string = "";

  static get styles() {
    return css`
      .atcoder-note-editor-area {
        width: 100%;
        box-sizing: border-box;
      }

      .atcoder-note-editor {
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 3px;
        padding: 8px;
        box-sizing: border-box;
        resize: vertical;
      }
    `;
  }

  render() {
    return html`
      <div class="atcoder-note-editor-area">
        <textarea class="atcoder-note-editor" value="${this.text}"></textarea>
      </div>
    `;
  }
}
