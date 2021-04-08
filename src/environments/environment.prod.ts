export const environment = {
  production: true,

  conect_url: 'https://api.filateliaperu.com/',
  conect_url_api: 'https://api.filateliaperu.com/api',
  CHAT_URL:location.protocol=='http:'?"ws://sw-filatelia.herokuapp.com/":"wss://sw-filatelia.herokuapp.com/",
  api: '/api',
  login: '/login',
  api_login: '/login',
  api_signup: '/usuarios'
};
