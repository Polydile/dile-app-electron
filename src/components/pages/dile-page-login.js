import { LitElement, html, css } from 'lit';
import { AuthMixin } from '../../lib/auth-mixin.js';
import {DileFormMixin} from '@dile/dile-form-mixin';
import '@dile/dile-input/dile-input';
import '@dile/dile-button/dile-button';
import '@dile/dile-checkbox/dile-checkbox';
//import '../user/dile-remember-password';
import '@dile/dile-card/dile-card';
import { cardPageStyles } from '../styles/card-page-styles.js';

export class DilePageLogin extends DileFormMixin(AuthMixin(LitElement)) {
    static styles = [
        cardPageStyles,
        css`
            
            .actions {
                margin-top: 1rem;
                display: flex;
                justify-content: space-between;
            }
            .actions p {
                margin: 0;
            }
            dile-checkbox {
                margin: 0.4rem 0 0;
            }
        `
    ];

    firstUpdated() {
        this.loginForm = this.shadowRoot.getElementById('loginForm');
    }

    render() {
        return html`
            <h1>Login</h1>
            ${this.user
                ? html`<p>You are logged-in</p>`
                : this.loginFormTemplate
            }
        `;
    }

    get loginFormTemplate() {
        return html`
            <dile-card shadow-none>
                    <dile-input 
                        label="Email" 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="Email" 
                        value="x@example.com"
                        hideErrorOnInput
                    ></dile-input>
                
                    <dile-input 
                        label="Password" 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="Password" 
                        value="1234qwer"
                        hideErrorOnInput
                    ></dile-input>
                
                    <dile-checkbox name="remember">Remember me</dile-checkbox>
            
                <div class="actions">
                    <p>
                        <dile-button @click=${this.loginHandler}>Login</dile-button>
                    </p>
                    <p>
                        <dile-remember-password></dile-remember-password>
                    </p>
                </div>
            </dile-card>
        `;
    }

    loginHandler(e) {
        console.log('login handler');
        e.preventDefault();
        this.clearErrors();
        const formData = this.getData();
        console.log(formData);
        this.userLogin(formData);
    }
}
customElements.define('dile-page-login', DilePageLogin);
