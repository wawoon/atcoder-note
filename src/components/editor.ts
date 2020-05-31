import { LitElement, html, css, property, customElement } from "lit-element";

@customElement("atcoder-note-editor")
export class NoteEditor extends LitElement {
  save = (text: string) => {
    const url = window.location.href;
    const data = JSON.stringify({ text });
    chrome.storage.sync.set({ [url]: data }, () => {
      this.saveMessageHidden = false;
      setTimeout(() => (this.saveMessageHidden = true), 2500);
    });
  };

  @property({ type: String, attribute: "text" }) text: string = "";
  @property({ type: Function, attribute: "on-save" }) onSave: (
    text: string,
  ) => void = this.save;
  @property({ type: Boolean }) saveMessageHidden: boolean = true;

  connectedCallback() {
    super.connectedCallback();

    const url = window.location.href;
    chrome.storage.sync.get([url], (result) => {
      const data = result[url];
      if (data) {
        const parsed = JSON.parse(data);
        this.text = parsed["text"] as string;
      }
    });
  }

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

      .atcoder-note-editor-buttom-toolbar {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }

      .success-message {
        font-size: 14px;
        color: #28a745;
        margin-right: 16px;
        opacity: 1;
      }

      .hidden {
        transition-property: opacity;
        transition-duration: 0.5s;
        opacity: 0;
      }
    `;
  }

  onSaveButtonClicked = () => {
    const textarea = this.shadowRoot?.getElementById(
      "atcoder-note-textarea",
    ) as HTMLTextAreaElement;

    if (textarea.value) {
      this.onSave(textarea.value);
    }
  };

  render() {
    return html`
      <div class="atcoder-note-editor-area">
        <textarea id="atcoder-note-textarea" class="atcoder-note-editor">
${this.text}</textarea
        >
        <div class="atcoder-note-editor-buttom-toolbar">
          <span
            class="success-message ${this.saveMessageHidden ? "hidden" : ""}"
            >保存しました</span
          >
          <button @click="${this.onSaveButtonClicked}">保存する</button>
        </div>
      </div>
    `;
  }
}
