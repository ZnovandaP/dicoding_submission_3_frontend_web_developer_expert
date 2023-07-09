import { async } from 'regenerator-runtime';
import favoriteRestaurantIDB from '../../data/favorite-restaurant-idb';
import FavoriteRestaurantCardPresenter from '../../presenter/favorite-restaurant-presenter/favorite-restaurant-card-presenter';
import cardComponent from '../templates/card';
import templateListFavoriteRestaurantEmpty from '../templates/empty-list-favorite-restaurant';
import CardEventHandler from '../../utilities/card-event-handler';
import skipToMainContent from '../../utilities/skip-content-handler';
import showAlertAndToast from '../../utilities/show-alert';
import element from '../../utilities/get-element';

const { getElement, getElementAll } = element;
const { getAllFavoriteRestaurants } = favoriteRestaurantIDB;

const favoritePage = {
  _render() {
    return `
    <button type="button" class="skip-content favorite" tabindex="1">Skip to content</button>
    <favorite-content></favorite-content>
    <modal-element></modal-element>
    `;
  },

  async _afterRender() {
    skipToMainContent(
      getElement('.skip-content.favorite'),
      getElement('#main-content-favorite'),
    );

    try {
      const dataRestaurantsFromIDB = await getAllFavoriteRestaurants();

      this._renderFavoriteRestaurantCard(dataRestaurantsFromIDB);

      const favoriteRestaurantCardPresenter = new FavoriteRestaurantCardPresenter({
        favoriteButtonCard: getElementAll('.button-like'),
        rates: getElementAll('.rate'),
        dataRestaurants: dataRestaurantsFromIDB,
        favoriteRestaurant: favoriteRestaurantIDB,
      });
    } catch (error) {
      showAlertAndToast.alertError(error);
      console.error(error);
    } finally {
      const cardHandler = new CardEventHandler({
        buttonsInfo: getElementAll('.button-info'),
        cards: getElementAll('.card>.overlay'),
        cardsMenu: getElementAll('.wrapper-card-menu'),
        modalBody: getElement('.modal-body'),
        modalParent: getElement('.modal-parent'),
      });
    }
  },

  _renderFavoriteRestaurantCard(dataRestaurantsFromIDB) {
    if (!dataRestaurantsFromIDB.length) {
      getElement('.content-favorite').innerHTML
        += templateListFavoriteRestaurantEmpty();
    }

    const cardContainer = getElement('.card-container-favorite');
    dataRestaurantsFromIDB.forEach((restaurant) => {
      cardContainer.innerHTML += cardComponent(restaurant);
    });
  },
};

export default favoritePage;
