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
      .loginoption {
        cursor: pointer;
      }
    `
  ];

  constructor() {
    super();
    document.addEventListener('check-auth', () => {
      this.checkAuth();
    });
  }

  render() {
    return html`
      ${this.user 
        ? html`<dile-user-menu .user="${this.user}" @logout=${this.doLogout}></dile-user-menu>`
        : html`
          <dile-menu-overlay class="loginoverlay" horizontalAlign="under" moveLeft="15">
            <div class="loginbutton" slot="trigger"><dile-icon .icon="${accountIcon}"></dile-icon></div>
            <div slot="content">
              <a class="loginoption" @click=${this.gotoLogin}>Login</a>
              <a class="loginoption" @click=${this.gotoRegister}>Register</a>
            </div>
          </dile-menu-overlay>
        `
      }
    `;
  }

  firstUpdated() {
    this.checkAuth();
    this.menu = this.shadowRoot.querySelector('dile-menu-overlay');
  }

  gotoLogin() {
    this.goto('login')
  }
  gotoRegister() {
    this.goto('register');
  }

  goto(page) {
    this.dispatchNavigate(page);
    this.menu.close();
  }
}
customElements.define('dile-user', DileUser);
