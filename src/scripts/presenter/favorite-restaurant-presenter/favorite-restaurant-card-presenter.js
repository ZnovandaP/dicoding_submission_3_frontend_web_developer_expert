import { async } from 'regenerator-runtime';
import showAlertAndToast from '../../utilities/show-alert';

const { alertQuestion, toastSuccess } = showAlertAndToast;

class FavoriteRestaurantCardPresenter {
  constructor({
    favoriteButtonCard, rates, dataRestaurants, favoriteRestaurant,
  }) {
    this._favoriteButtonCard = favoriteButtonCard;
    this._rates = rates;
    this._dataRestaurants = dataRestaurants;
    this._favoriteRestaurant = favoriteRestaurant;

    this._checkConditionButtonBaseOnIDB();
    this._changeColorRateBaseOnIDB();
    this._favoriteButtonHandlerHome();
  }

  _favoriteButtonHandlerHome() {
    this._favoriteButtonCard.forEach((button) => {
      button.addEventListener('click', async (event) => {
        await this._logicFavoriteRestaurant(button, event);
      });
    });
  }

  async _logicFavoriteRestaurant(button, event) {
    event.stopPropagation();

    const getIdButton = event.target.dataset.id;
    const restaurant = this._createDataRestaurantToIDB(getIdButton);

    if (!restaurant) return;

    if (!(await this._isRestaurantExist(restaurant.id))) {
      this._likingRestaurant(button, restaurant);
    } else {
      this._unlikingRestaurant(button, restaurant);
    }
    this._changeColorRateBaseOnIDB();
  }

  async _likingRestaurant(button, restaurant) {
    button.innerText = 'Tidak Suka';
    await this._favoriteRestaurant.putFavoriteRestaurant(restaurant);
    toastSuccess(`Restoran ${restaurant.name} berhasil ditambahkan ke favorit`);
  }

  _unlikingRestaurant(button, restaurant) {
    alertQuestion(async () => {
      button.innerText = 'Suka';
      await this._favoriteRestaurant.deleteFavoriteRestaurant(restaurant.id);
      toastSuccess(`Restoran ${restaurant.name} berhasil dihapus dari favorit`);
      this._changeColorRateBaseOnIDB();
    });
  }

  _checkConditionButtonBaseOnIDB() {
    this._dataRestaurants.forEach(async (restaurant, index) => {
      if (!(await this._isRestaurantExist(restaurant.id))) {
        this._favoriteButtonCard[index].innerText = 'Suka';
      } else {
        this._favoriteButtonCard[index].innerText = 'Tidak Suka';
      }
    });
  }

  _changeColorRateBaseOnIDB() {
    this._dataRestaurants.forEach(async (restaurant, index) => {
      if (!(await this._isRestaurantExist(restaurant.id))) {
        this._rates[index].style.backgroundColor = '#082f49';
      } else {
        this._rates[index].style.backgroundColor = '#dc2626';
      }
    });
  }

  async _isRestaurantExist(id) {
    if (!id) return;

    const restaurant = await this._favoriteRestaurant.getFavoriteRestaurant(id);
    return !!restaurant;
  }

  _createDataRestaurantToIDB(idbutton) {
    let dataRestaurant;
    this._dataRestaurants.forEach((restaurant) => {
      if (!('id' in restaurant)) return;

      if (idbutton.toString() === restaurant.id.toString()) {
        dataRestaurant = {
          id: restaurant.id,
          pictureId: restaurant.pictureId,
          name: restaurant.name,
          rating: restaurant.rating,
          city: restaurant.city,
        };
      }
    });
    return dataRestaurant;
  }
}

export default FavoriteRestaurantCardPresenter;
