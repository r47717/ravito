import 'popper.js';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.min';

const loginFormElem = document.getElementById('react-login-form');
if (loginFormElem) {
    const pr1 = import('./login/form');
    const csrf = $('meta[name="_csrf"]').attr('content');
    
    pr1.then(function(page) {
        page.renderForm(loginFormElem, csrf);
    });
}
