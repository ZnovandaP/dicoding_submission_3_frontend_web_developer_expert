import homePage from '../view/pages/home';
import favoritePage from '../view/pages/favorite';
import detailPage from '../view/pages/detail';
import contactPage from '../view/pages/contact';

const routes = {
  '/': homePage,
  '/home': homePage,
  '/favorite': favoritePage,
  '/contact': contactPage,
  '/detail/:id': detailPage,
};

export default routes;
