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

// Estilos tema
import { dileAppTheme } from './styles/theme';
import { logo } from './images/temporizador'

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

  static get properties() {
    return {
        section: { type: String },
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
                @dile-selected-changed=${this.navitateSelected}>
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
          : this.displaySection(this.section)
        }
      </main>
    
    <dile-feedback></dile-feedback>
    <dile-resend-confirmation-email .user="${this.user}"></dile-resend-confirmation-email>  
    `;
  }
  setLogout() {
    console.log('seteo el user a null');
    this.user = null;
  }

  displaySection() {

  }
}
customElements.define('dile-app-electron', DileAppElectron);
