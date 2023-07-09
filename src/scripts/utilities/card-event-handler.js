import { async } from 'regenerator-runtime';
import favoriteRestaurantIDB from '../data/favorite-restaurant-idb';
import modalBodyTemplate from '../view/templates/modal-body';
import getDataForModalBody from './get-data-for-modal';
import FavoriteRestaurantModalPresenter from '../presenter/favorite-restaurant-presenter/favorite-restaurant-modal-presenter';
import showAlertAndToast from './show-alert';

class CardEventHandler {
  constructor({
    buttonsInfo, cards, cardsMenu, modalBody, modalParent,
  }) {
    this._buttonsInfo = buttonsInfo;
    this._cards = cards;
    this._cardsMenu = cardsMenu;
    this._modalBody = modalBody;
    this._modalParent = modalParent;
    this._DURATION_TRANSITION = 400;
    this._bodyElement = document.body;

    this._buttonsInfoHandler();
    this._cardsMenuHandler();
    this._showModalWithCardHandler();
  }

  _buttonsInfoHandler() {
    this._buttonsInfo.forEach((button, index) => {
      button.addEventListener('click', (event) => {
        event.stopPropagation();

        this._resetCardMenuShown(this._cardsMenu);
        this._showCardMenu(this._cardsMenu[index]);
      });
    });
  }

  _showModalWithCardHandler() {
    this._cards.forEach((card) => {
      card.addEventListener('click', async (event) => {
        event.stopPropagation();

        if (!this._isNotCard(event.target)) {
          try {
            const dataRestaurant = await getDataForModalBody(event.target.dataset.id);
            this._renderModalBodyComponent(dataRestaurant);
          } catch (error) {
            showAlertAndToast.alertError(error);
          }
        }
      });
    });
  }

  _cardsMenuHandler() {
    this._cardsMenu.forEach((cardMenu) => {
      cardMenu.addEventListener('click', async (event) => {
        event.stopPropagation();

        const { target } = event;
        if (this._isButtonCLoseCardMenu(target)) {
          this._hideCardMenu(cardMenu);
        }
        if (target.classList.contains('button-preview')) {
          const dataRestaurant = await getDataForModalBody(target.dataset.id);
          this._renderModalBodyComponent(dataRestaurant);
        }
      });
    });
  }

  _renderModalBodyComponent(dataRestaurant) {
    this._modalBody.innerHTML = modalBodyTemplate(dataRestaurant);
    const favoriteRestaurantModalPresenter = new FavoriteRestaurantModalPresenter({
      view: modalBodyTemplate(dataRestaurant),
      dataRestaurant,
      favoriteRestaurant: favoriteRestaurantIDB,
    });
    this._showModal(this._modalParent, this._bodyElement);
  }

  _showModal(modalParent, body) {
    modalParent.classList.add('block');
    setTimeout(() => {
      modalParent.classList.add('show-modal');
      body.classList.add('modal-freeze-page');
    }, this._DURATION_TRANSITION);
  }

  _showCardMenu(cardMenu) {
    cardMenu.classList.add('show');
    setTimeout(() => {
      cardMenu.classList.add('open');
    }, this._DURATION_TRANSITION);
  }

  _hideCardMenu(cardMenu) {
    cardMenu.classList.remove('open');
    setTimeout(() => {
      cardMenu.classList.remove('show');
    }, this._DURATION_TRANSITION);
  }

  _resetCardMenuShown(cardsMenu) {
    cardsMenu.forEach((cardMenu) => {
      cardMenu.classList.remove('open');
      cardMenu.classList.remove('show');
    });
  }

  _isButtonCLoseCardMenu(target) {
    return target.classList.contains('button-close') || target.classList.contains('fa-circle-xmark');
  }

  _isNotCard(target) {
    return target.classList.contains('card-content') || target.classList.contains('rate')
    || target.classList.contains('star') || target.classList.contains('rating-restaurant')
    || target.classList.contains('city-restaurant') || target.classList.contains('restaurant-name');
  }
}

export default CardEventHandler;
