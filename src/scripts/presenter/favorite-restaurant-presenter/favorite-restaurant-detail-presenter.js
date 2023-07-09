import { async } from 'regenerator-runtime';
import showAlertAndToast from '../../utilities/show-alert';

const { alertQuestion, toastSuccess } = showAlertAndToast;

class FavoriteRestaurantDetailPresenter {
  constructor({
    likeButton, iconLikeButton, dataRestaurant, favoriteRestaurant,
  }) {
    this._likeButton = likeButton;
    this._iconLikeButton = iconLikeButton;
    this._dataRestaurant = this._createDataRestaurantToIDB(dataRestaurant);
    this._favoriteRestaurant = favoriteRestaurant;

    this._checkConditionButtonBaseOnIDB();
    this._likeButtonHandler();
  }

  _likeButtonHandler() {
    this._likeButton.addEventListener('click', (event) => {
      if (!this._dataRestaurant.id) return;

      this._logicFavoriteRestaurant(event);
    });
  }

  async _logicFavoriteRestaurant(event) {
    event.stopPropagation();

    if (!(await this._isRestaurantExist(this._dataRestaurant.id))) {
      this._likingRestaurant();
    } else {
      this._unlikingRestaurant();
    }
  }

  async _likingRestaurant() {
    this._iconLikeButton.classList.replace('fa-regular', 'fa-solid');
    await this._favoriteRestaurant.putFavoriteRestaurant(this._dataRestaurant);
    toastSuccess(`Restoran ${this._dataRestaurant.name} berhasil ditambahkan ke favorit`);
  }

  async _unlikingRestaurant() {
    alertQuestion(async () => {
      this._iconLikeButton.classList.replace('fa-solid', 'fa-regular');
      await this._favoriteRestaurant.deleteFavoriteRestaurant(this._dataRestaurant.id);
      toastSuccess(`Restoran ${this._dataRestaurant.name} berhasil dihapus dari favorit`);
    });
  }

  async _checkConditionButtonBaseOnIDB() {
    if (!(await this._isRestaurantExist(this._dataRestaurant.id))) {
      this._iconLikeButton.classList.replace('fa-solid', 'fa-regular');
    } else {
      this._iconLikeButton.classList.replace('fa-regular', 'fa-solid');
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

export default FavoriteRestaurantDetailPresenter;
