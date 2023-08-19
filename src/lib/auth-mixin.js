import { axios } from './axios.js';
import { FeedbackMixin } from './feedback-mixin.js';

export const AuthMixin = (Superclass) => class extends FeedbackMixin(Superclass) {
  
  static get properties() {
    return {
      user: { type: Object },
      token: { type: String },
    };
  }

  dispachCheckAuth() { 
    this.dispatchEvent(new CustomEvent('check-auth', { 
      bubbles: true,
      composed: true,
    }));
  }

  async userLogin(data) {
    await csrf();
    axios
      .post('/login', data)
      .then(() => {
        this.positiveFeedback('login success');
        this.dispachCheckAuth();
        this.dispatchNavigate('home');
      })
      .catch(error => {
        if (error.response.status !== 422) throw error
        this.negativeFeedback(error.response.data.message);
        this.showErrors(error.response.data.errors);
      })
  }

  async userRegister(data) {
    await csrf();
    axios
      .post('/register', data)
      .then(() => {
        this.positiveFeedback('registrado!!');
        this.dispachCheckAuth();
        this.dispatchNavigate('home');
      })
      .catch(error => {
        if (error.response.status !== 422) throw error
        console.log(error.response.data.message);
        this.negativeFeedback('Error: ' + error.response.data.message);
        this.showErrors(error.response.data.errors);
      })
  }

  async checkAuth() {
    if(! this.token) {
      console.log('no hay un token');
      this.dispatchNotLoggedIn();
      return false;
    }
    console.log('Tengo un token, así q lo debo validar');

    axios
      .get('/api/user', { withCredentials: true })
      .then((response) => {
        this.user = response.data;
        this.dispatchUserDetected();
      })
      .catch((err) => {
        if (err.response.status === 401) {
          this.dispatchNotLoggedIn();
        } else {
          throw err;
        }
      });
  }

  async doLogout() {
    axios
      .post('/logout')
      .then(() => {
        this.positiveFeedback('Logout realizado');
        this.user = null;
        this.dispatchLogoutDetected();
      })
      .catch(error => {
        this.negativeFeedback('error on logout');
      })
  }

  dispatchUserDetected() {
    console.log('Dispatch user detected event with user:', this.user);
    this.dispatchEvent(new CustomEvent('user-detected', {
      detail: { user: this.user }
    }));
  }
  dispatchNotLoggedIn() {
    this.dispatchEvent(new CustomEvent('not-logged-in'));
  }
  dispatchLogoutDetected() {
    this.dispatchEvent(new CustomEvent('logout-detected'));
  }

  async resendConfirmation() {
    axios
      .post('/email/verification-notification')
      .then(() => {
        this.positiveFeedback('Email sent!');
      })
      .catch(error => {
        this.negativeFeedback('error on email resend');
      })
  }

  async sendForgotPassword(email) {
    await csrf();
    axios
      .post('/forgot-password', { email })
      .then(response => {
        this.closeModal();
        this.positiveFeedback(response.data.message);
      })
      .catch(error => {
        if (error.response.status !== 422) throw error
        this.negativeFeedback(error.response.data.message);
        this.showErrors(error.response.data.errors);
      })
  }

  async resetPassword(data) {
    await csrf();
    axios
      .post('/reset-password', data)
      .then(() => {
        this.positiveFeedback('Password reset OK!');
        this.dispatchNavigate('login');
      })
      .catch(error => {
        this.negativeFeedback(error.response.data.message);
        this.showErrors(error.response.data.errors);
      })
  }
}