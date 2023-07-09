import { async } from 'regenerator-runtime';
import '@fortawesome/fontawesome-free/css/all.css';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import '../sass/main.scss';
import './view/component/all-component';
import App from './view/app';
import element from './utilities/get-element';
import swRegister from './utilities/sw-register';

'./utilities/get-current-year';

const { getElementAll, getElement } = element;

const app = new App({
  main: element.getElement('#main'),
  header: getElement('header'),
  navbar: getElement('.navbar'),
  hero: getElement('.hero'),
  navLinks: getElementAll('.nav-link'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
  app.resetActiveNavLink();
  app.activeNavLinkBaseOnUrl();
  app.showHeroBaseOnUrl();
  app.activeNavbarFirstLoaded();
  app.scrolltoTop();
});

window.addEventListener('load', async () => {
  await swRegister();
  app.renderPage();
  app.activeNavLinkBaseOnUrl();
  app.showHeroBaseOnUrl();
  app.activeNavbarFirstLoaded();
});
