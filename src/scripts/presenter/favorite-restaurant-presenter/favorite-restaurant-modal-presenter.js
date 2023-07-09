import { async } from 'regenerator-runtime';
import API_ENDPOINT from '../../global/api-endpoint';
import showAlertAndToast from '../../utilities/show-alert';
import element from '../../utilities/get-element';

const { getElement } = element;
const { alertQuestion, toastSuccess } = showAlertAndToast;

class FavoriteRestaurantModalPresenter {
  constructor({ view, favoriteRestaurant, dataRestaurant }) {
    this._view = view;
    this._favoriteRestaurant = favoriteRestaurant;
    this._dataRestaurant = this._createDataRestaurantToIDB(dataRestaurant);

    this._buttonLikeModal = getElement('.button-like-modal');
    this._buttonLikeIcon = getElement('.heart-icon');
    this._textButtonLike = getElement('.text-button-like');
    this._buttonDetailModal = getElement('.button-detail-restaurant-modal');

    this._checkConditionButtonBaseOnIDB();
    this._favoriteButtonHandler();
    this._buttonDetailHandler();
  }

  _favoriteButtonHandler() {
    this._buttonLikeModal.addEventListener('click', async (event) => {
      if (!this._dataRestaurant.id) return;

      this._logicFavoriteRestaurant(event);
    });
  }

  async _logicFavoriteRestaurant(event) {
    event.stopPropagation();

    if (this._isButtonLike()) {
      if (!(await this._isRestaurantExist(this._dataRestaurant.id))) {
        this._likingRestaurant();
      } else {
        this._unlikingRestaurant();
      }
    }
  }

  async _likingRestaurant() {
    this._textButtonLike.innerText = 'Tidak Suka';
    this._buttonLikeIcon.classList.replace('fa-regular', 'fa-solid');
    await this._favoriteRestaurant.putFavoriteRestaurant(this._dataRestaurant);
    toastSuccess(`Restoran ${this._dataRestaurant.name} berhasil ditambahkan ke favorit`);
  }

  async _unlikingRestaurant() {
    alertQuestion(async () => {
      this._textButtonLike.innerText = 'Suka';
      this._buttonLikeIcon.classList.replace('fa-solid', 'fa-regular');
      await this._favoriteRestaurant.deleteFavoriteRestaurant(this._dataRestaurant.id);
      toastSuccess(`Restoran ${this._dataRestaurant.name} berhasil dihapus dari favorit`);
    });
  }

  _buttonDetailHandler() {
    this._buttonDetailModal.addEventListener('click', (event) => {
      event.stopPropagation();
      document.body.classList.remove('modal-freeze-page');
    });
  }

  _isButtonLike() {
    return this._buttonLikeIcon.classList.contains('heart-icon')
      || this._textButtonLike.classList.contains('text-button-like');
  }

  async _checkConditionButtonBaseOnIDB() {
    if (!(await this._isRestaurantExist(this._dataRestaurant.id))) {
      this._textButtonLike.innerText = 'Suka';
      this._buttonLikeIcon.classList.replace('fa-solid', 'fa-regular');
    } else {
      this._textButtonLike.innerText = 'Tidak Suka';
      this._buttonLikeIcon.classList.replace('fa-regular', 'fa-solid');
    }
  }

  async _isRestaurantExist(id) {
    if (!id) return;
    const restaurant = await this._favoriteRestaurant.getFavoriteRestaurant(id);
    return !!restaurant;
  }

  _createDataRestaurantToIDB(dataRestaurant) {
    return {
      id: dataRestaurant.id,
      pictureId: dataRestaurant.pictureId,
      name: dataRestaurant.name,
      rating: dataRestaurant.rating,
      city: dataRestaurant.city,
    };
  }
}

export default FavoriteRestaurantModalPresenter;
