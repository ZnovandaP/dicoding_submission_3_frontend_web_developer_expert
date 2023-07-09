import { async } from 'regenerator-runtime';
import RestaurantResource from '../../data/get-restaurant-resource';
import favoriteRestaurantIDB from '../../data/favorite-restaurant-idb';
import FavoriteRestaurantCardPresenter from '../../presenter/favorite-restaurant-presenter/favorite-restaurant-card-presenter';
import cardComponent from '../templates/card';
import CardEventHandler from '../../utilities/card-event-handler';
import skipToMainContent from '../../utilities/skip-content-handler';
import showAlertAndToast from '../../utilities/show-alert';
import loadingCardSkeleton from '../../utilities/loading-card';
import element from '../../utilities/get-element';

const { getElement, getElementAll } = element;
const homePage = {
  _render() {
    return `
      <prologue-element></prologue-element>
      <main-content></main-content>
      <modal-element></modal-element>
    `;
  },

  async _afterRender() {
    skipToMainContent(
      getElement('.skip-content.home'),
      getElement('#main-content'),
    );

    const cardContainer = getElement('.card-container');
    loadingCardSkeleton(cardContainer);

    try {
      const { restaurants } = await RestaurantResource.getAllDataRestaurant();
      this._renderCardItem(cardContainer, restaurants);
    } catch (error) {
      showAlertAndToast.alertError(error);
      console.error(error);
      loadingCardSkeleton(cardContainer);
    }
  },

  _renderCardItem(cardContainer, restaurants) {
    cardContainer.innerHTML = '';
    restaurants.forEach((restaurant) => {
      cardContainer.innerHTML += cardComponent(restaurant);
    });
    const cardHandler = new CardEventHandler({
      buttonsInfo: getElementAll('.button-info'),
      cards: getElementAll('.card-overlay'),
      cardsMenu: getElementAll('.wrapper-card-menu'),
      modalBody: getElement('.modal-body'),
      modalParent: getElement('.modal-parent'),
    });
    const favoriteRestaurantCardPresenter = new FavoriteRestaurantCardPresenter({
      favoriteButtonCard: getElementAll('.button-like'),
      rates: getElementAll('.rate'),
      favoriteRestaurant: favoriteRestaurantIDB,
      dataRestaurants: restaurants,
    });
  },
};

export default homePage;
