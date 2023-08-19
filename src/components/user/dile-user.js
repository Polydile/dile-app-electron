import { LitElement, html, css } from 'lit';
import './dile-user-menu.js';
import { AuthMixin } from '../../lib/auth-mixin.js';
import '@dile/dile-icon/dile-icon';
import { accountIcon } from '@dile/icons';
import { userMenuButtonStyles } from './user-menu-button-styles.js';

export class DileUser extends AuthMixin(LitElement) {
  static styles = [
    userMenuButtonStyles,
    css`
      :host {
        display: flex;
        align-items: center;
        --dile-menu-overlay-background-color: var(--primary-light-color);
      }      
      dile-menu-overlay {
        display: flex;
        align-items: center;
      }
    `
  ];

  render() {
    return html`
      ${this.user 
        ? html`<dile-user-menu .user="${this.user}" @logout=${this.doLogout}></dile-user-menu>`
        : html`
          <dile-menu-overlay class="loginoverlay" horizontalAlign="under" moveLeft="15">
            <div class="loginbutton" slot="trigger"><dile-icon .icon="${accountIcon}"></dile-icon></div>
            <div slot="content">
              <a class="loginoption" href="/login">Login</a>
              <a class="loginoption" href="/register">Register</a>
            </div>
          </dile-menu-overlay>
        `
      }
    `;
  }

  firstUpdated() {
    this.checkAuth();
  }
  
}
customElements.define('dile-user', DileUser);
