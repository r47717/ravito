import 'popper.js';
//import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.min';

const metaCsrf = document.querySelector('meta[name=_csrf]');
const csrf = metaCsrf && metaCsrf.content;

const loginFormElem = document.getElementById('react-login-form');
if (loginFormElem) {
    const pr = import('./login/form');
    pr.then(function(page) {
        page.renderForm(loginFormElem, csrf);
    });
}

const registerFormElem = document.getElementById('react-register-form');
if (registerFormElem) {
    const pr = import('./register/form');
    pr.then(function(page) {
        page.renderForm(registerFormElem, csrf);
    });
}

const newPostFormElem = document.getElementById('react-new-post-form');
if (newPostFormElem) {
    const categories = JSON.parse(document.getElementById('post-categories').innerText);
    const pr = import('./new-post/form');
    pr.then(function(page) {
        page.renderForm(newPostFormElem, csrf, categories);
    });
}

const profileSettingsPageElem = document.getElementById('react-profile-settings-page');
if (profileSettingsPageElem) {
    const pr = import('./profile-settings/hydrate');
    pr.then(function(page) {
        page.pageHydrate(profileSettingsPageElem);
    });
}
