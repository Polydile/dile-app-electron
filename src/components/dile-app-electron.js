import { LitElement, html, css } from 'lit';

// imports dile-components
import '@dile/dile-app-drawer/dile-app-drawer';
import '@dile/dile-menu-hamburger/dile-menu-hamburger';
import '@dile/dile-nav/dile-nav';
import '@dile/dile-pages/dile-pages';
import '@dile/dile-selector/dile-selector';
import '@dile/dile-selector/dile-selector-item';
import '@dile/dile-spinner/dile-spinner-modal';

// imports locales
import './user/dile-user';
import './dile-feedback';

// Estilos tema
import { dileAppTheme } from './styles/theme';
import { logo } from './images/temporizador';

export class DileAppElectron extends LitElement {
  static get styles() {
    return [
      dileAppTheme,
      css`
        :host {
          display: block;
          color: var(--primary-text-color);
        }
        .drawernav {
          padding: 1rem; 
        }
        .drawernav a {
          color: #fff;
        }
        h1 {
          display: flex;
          align-items: center;
          margin: 0;
          font-size: 1.2rem;
        } 
        dile-nav svg {
          height: 2rem;
          margin: 0 0.5rem 0 0.3rem;
        }
        .app-menu {
          margin-top: 3rem;
          min-width: 250px;
          font-size: 1.2rem;
        }
      `
    ]
  };

  constructor() {
    super();
    this.page = 'home';
    this.addEventListener('navigate', this.navigateHandler.bind(this));
  }

  static get properties() {
    return {
        page: { type: String },
        user: { type: Object },
    };
  }

  render() {
    return html`
      <dile-nav menu="left">
        <dile-user
          slot="actions"
          @user-detected=${this.setUser} 
          @logout-detected=${this.setLogout}
          @not-logged-in=${this.setLogout}
        ></dile-user>
        <dile-menu-hamburger hamburgerAlwaysVisible slot="menu" direction="left">
          <div slot="menu" class="app-menu">
            <dile-selector class="drawernav" selected=${this.page} attrForSelected="name"
                @dile-selected-changed=${this.navigateSelected}>
                <dile-selector-item icon="navigate_next" name="home">Home</dile-selector-item>
                <dile-selector-item icon="navigate_next" name="contact">Contact us</dile-selector-item>
            </dile-selector>
          </div>
        </dile-menu-hamburger>
        <h1 slot="title">
            ${logo}
            Dile Electron
        </h1>
      </dile-nav>
      
      <main @check-auth=${this.checkAuth}>
        ${this.user === undefined
          ? html`<dile-spinner-modal active></dile-spinner-modal>`
          : this.displaySection(this.page)
        }
      </main>
    
    <dile-feedback></dile-feedback>
    `;
  }

  displaySection(section) {
    switch (section) {
      case 'home':
        import('./pages/dile-page-home.js');
        return html`<dile-page-home></dile-page-home>`;
      case 'login':
        import('./pages/dile-page-login.js');
        return html`<dile-page-login .user=${this.user}></dile-page-login>`;
      case 'register':
        import('./pages/dile-page-register.js');
        return html`<dile-page-register .user=${this.user}></dile-page-register>`;
      case 'contact':
        //import('./pages/dile-page-contact.js');
        return html`<dile-page-contact></dile-page-contact>`;
      case 'reset-password':
        //import('./pages/dile-page-password-reset.js');
        return html`<dile-page-password-reset></dile-page-password-reset>`;
      default:
        return html`<dile-page-home></dile-page-home>`;
    }
  }

  navigateHandler(e) {
    this.navigate(e.detail.page);
  }

  navigateSelected(e) {
    this.navigate(e.detail.selected);
    this.closeDrawer();
  }

  navigate(page) {
    this.page = page;
  }

  setUser(e) {
    this.user = e.detail.user;
  }

  setLogout() {
    this.user = null;
  }
}
customElements.define('dile-app-electron', DileAppElectron);
