import 'popper.js';
//import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.min';

const loginFormElem = document.getElementById('react-login-form');
if (loginFormElem) {
    const pr = import('./login/form');
    const csrf = document.querySelector('meta[name=_csrf]').content;
    
    pr.then(function(page) {
        page.renderForm(loginFormElem, csrf);
    });
}

const registerFormElem = document.getElementById('react-register-form');
if (registerFormElem) {
    const pr = import('./register/form');
    const csrf = document.querySelector('meta[name=_csrf]').content;
    
    pr.then(function(page) {
        page.renderForm(registerFormElem, csrf);
    });
}
