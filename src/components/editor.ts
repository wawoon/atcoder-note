import { LitElement, html, css, property, customElement } from "lit-element";

@customElement("atcoder-note-editor")
export class NoteEditor extends LitElement {
  @property({ type: String, attribute: "content" }) text: string = "";

  static get styles() {
    return css`
      .atcoder-note-editor {
        padding: 8px;
        margin: 8px 0;
        border: 1px solid #aaa;
        border-radius: 6px;
      }
    `;
  }

  render() {
    return html`
      <div class="atcoder-note-editor">
        <textarea value="${this.text}"></textarea>
      </div>
    `;
  }
}
