window._ = require('lodash');

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
  window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
  console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

const api_base_url = document.head.querySelector('meta[name="api-base-url"]');
const base_url = document.head.querySelector('meta[name="base-url"]');

if (api_base_url) {
  window.axios.defaults.baseURL = api_base_url.content;
} else {
  console.error('API Base Url not defined!');
}

if (base_url) {
  window.baseURL = base_url.content;
} else {
  console.error('Base Url not defined!');
}

export const baseURL = base_url.content;
