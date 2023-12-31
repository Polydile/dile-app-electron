import { axiosCreator } from './axios.js';
import { FeedbackMixin } from './feedback-mixin.js';

export const AuthMixin = (Superclass) => class extends FeedbackMixin(Superclass) {
  
  static get properties() {
    return {
      user: { type: Object },
    };
  }

  get axios() {
    return axiosCreator(this.token);
  }

  get token() {
    return window.localStorage.getItem('token');
  }

  constructor() {
    super();
  }

  setToken(token) {
    window.localStorage.setItem('token', token);
  }

  removeToken() {
    window.localStorage.removeItem('token');    
  }

  checkAuth() {
    if (! this.token) {
      console.log('no hay un token');
      this.dispatchNotLoggedIn();
    } else {
      console.log('Tengo un token, así q lo debo validar', this.token, typeof this.token);
      this.axios
        .get('/api/user')
        .then((response) => {
          this.user = response.data;
          this.dispatchUserDetected();
        })
        .catch((err) => {
          this.dispatchNotLoggedIn();
        });
    }
  }

  userRegister(data) {
    console.log('userregister', data);
    this.axios
      .post('/api/auth/register', data)
      .then((response) => {
        this.positiveFeedback('registrado!!');
        this.setToken(response.data.token);
        this.dispachCheckAuth()
        this.dispatchNavigate('home'); 
      })
      .catch(this.manageError.bind(this));
  }

  userLogin(data) {
    this.axios
      .post('api/auth/login', data)
      .then((response) => {
        this.positiveFeedback('login success');
        this.setToken(response.data.token);
        this.dispachCheckAuth();
        this.dispatchNavigate('home');
      })
      .catch(this.manageError.bind(this));
  }

  doLogout() {
    this.axios
      .get('api/auth/logout')
      .then((response) => {
        this.positiveFeedback(response.data.message);
        this.removeToken();
        this.user = null;
        this.dispatchLogoutDetected();
      })
      .catch((err) => {
        this.negativeFeedback(this.getErrorMessage(err.response));
      });
  }

  // ERROR MANAGEMENT
  manageError(err) {
    this.negativeFeedback(this.getErrorMessage(err.response));
    if(err.response.data.errors) {
      this.showErrors(err.response.data.errors);
    }
  }
  getErrorMessage(response) {
    let status = response.status;
    let message = response.data.message;
    switch(status) {
      case 500:
        return 'Server error, please try again later';
      case 401:
        return 'Unauthorized error: ' + message;
      default:
        return message;
    }
  }

  // EVENTOS

  dispatchUserDetected() {
    this.dispatchEvent(new CustomEvent('user-detected', {
      bubbles: true,
      composed: true,
      detail: { user: this.user }
    }));
  }
  dispatchNotLoggedIn() {
    this.dispatchEvent(new CustomEvent('not-logged-in'));
  }
  dispatchLogoutDetected() {
    this.dispatchEvent(new CustomEvent('logout-detected'));
  }
  dispachCheckAuth() {
    this.dispatchEvent(new CustomEvent('check-auth', {
      bubbles: true,
      composed: true,
    }));
  }

  // resendConfirmation() {
  //   axios
  //     .post('/email/verification-notification')
  //     .then(() => {
  //       this.positiveFeedback('Email sent!');
  //     })
  //     .catch(error => {
  //       this.negativeFeedback('error on email resend');
  //     })
  // }

  // sendForgotPassword(email) {
  //   await csrf();
  //   axios
  //     .post('/forgot-password', { email })
  //     .then(response => {
  //       this.closeModal();
  //       this.positiveFeedback(response.data.message);
  //     })
  //     .catch(error => {
  //       if (error.response.status !== 422) throw error
  //       this.negativeFeedback(error.response.data.message);
  //       this.showErrors(error.response.data.errors);
  //     })
  // }

  // async resetPassword(data) {
  //   await csrf();
  //   axios
  //     .post('/reset-password', data)
  //     .then(() => {
  //       this.positiveFeedback('Password reset OK!');
  //       this.dispatchNavigate('login');
  //     })
  //     .catch(error => {
  //       this.negativeFeedback(error.response.data.message);
  //       this.showErrors(error.response.data.errors);
  //     })
  // }

  // dispachRegistered(data) {
  //   console.log('dispachRegistered', data);
  //   this.dispatchEvent(new CustomEvent('registered', {
  //     bubbles: true,
  //     composed: true,
  //     detail: {
  //       token: data.token
  //     }
  //   }));
  // }
}