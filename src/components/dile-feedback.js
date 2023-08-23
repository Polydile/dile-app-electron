import { LitElement, html, css } from 'lit';
import '@dile/dile-toast/dile-toast';

export class DileFeedback extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  constructor() {
    super();
    document.addEventListener('positive-feedback', this.positiveFeedback.bind(this));
    document.addEventListener('negative-feedback', this.negativeFeedback.bind(this));
  }

  firstUpdated() {
    this.eltoast = this.shadowRoot.getElementById('eltoast');
  }

  render() {
    return html`
      <dile-toast id="eltoast"></dile-toast>
    `;
  }

  positiveFeedback(e) {
    this.eltoast.open(e.detail.msg, 'success');
  }
  negativeFeedback(e) {
    this.eltoast.open(e.detail.msg, 'error');
  }
}
customElements.define('dile-feedback', DileFeedback);
