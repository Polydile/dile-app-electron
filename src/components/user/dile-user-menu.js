import { LitElement, html, css } from 'lit';
import '@dile/dile-menu-overlay/dile-menu-overlay';
import '@dile/dile-icon/dile-icon';
import { arrowDropDownIcon } from '@dile/icons';
import { userMenuButtonStyles } from './user-menu-button-styles.js';

export class DileUserMenu extends LitElement {
  static styles = [
    userMenuButtonStyles,
    css`
      :host {
        display: block;
        --dile-icon-size: 1.5rem;
        --dile-icon-color: #000;
      }
      .user-name {
        cursor: pointer;
        display: flex;
        align-items: center;
        font-size: 0.85rem;
        text-align: right;
      }
      .user-name b {
        width: 80px;
        max-width: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      @media(min-width: 350px) {
        .user-name b {
          width: 100px;
          max-width: 100px;
        }
      }
      @media(min-width: 420px) {
        .user-name b {
          width: 150px;
          max-width: 150px;
        }
      }
    `
  ];

  static get properties() {
    return {
      user: { type: Object }
    };
  }

  render() {
    return html`
      <dile-menu-overlay>
        <span slot="trigger" class="user-name">
          <b>${this.user.name}</b>
          <dile-icon .icon="${arrowDropDownIcon}"></dile-icon>
        </span>
import { userMenuButtonStyles } from './user-menu-button-styles.js';
        <div slot="content" class="loginbutton">
          <a href="#" @click="${this.dispatchLogout}" class="loginoption">logout</a>
        </div>
      </dile-menu-overlay>
    `;
  }

  dispatchLogout(e) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('logout'));
  }
}
customElements.define('dile-user-menu', DileUserMenu);
