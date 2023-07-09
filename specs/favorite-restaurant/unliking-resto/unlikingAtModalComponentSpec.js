import { async } from 'regenerator-runtime';
import favoriteRestaurantIDB from '../../../src/scripts/data/favorite-restaurant-idb';
import FavoriteRestaurantModalPresenter from '../../../src/scripts/presenter/favorite-restaurant-presenter/favorite-restaurant-modal-presenter';
import modalBodyTemplate from '../../../src/scripts/view/templates/modal-body';
import clearFavoriteRestoIdb from '../../helper/clearFavoriteRestoIdb';
import dummyDataFavoriteRestaurant from '../../helper/dummyDataForFavoriteResto';
import element from '../../../src/scripts/utilities/get-element';
import showAlertAndToast from '../../../src/scripts/utilities/show-alert';

const { getElement } = element;

describe('Unliking Restaurant At Modal', () => {
  const favoriteRestaurant = favoriteRestaurantIDB;
  let favoriteRestaurantModalPresenter;

  const constructPresenter = (dataDummyRestaurant) => {
    favoriteRestaurantModalPresenter = new FavoriteRestaurantModalPresenter({
      view: modalBodyTemplate(dummyDataFavoriteRestaurant()),
      dataRestaurant: dataDummyRestaurant,
      favoriteRestaurant,
    });
  };

  beforeEach(async () => {
    document.body.innerHTML = modalBodyTemplate(dummyDataFavoriteRestaurant());
    await favoriteRestaurant.putFavoriteRestaurant(dummyDataFavoriteRestaurant());
  });

  afterEach(async () => {
    await clearFavoriteRestoIdb();
  });

  it('should show like button containing text "Tidak Suka" when retaurant has been liked', async () => {
    constructPresenter(dummyDataFavoriteRestaurant());

    await favoriteRestaurantModalPresenter._checkConditionButtonBaseOnIDB();
    await favoriteRestaurantModalPresenter._isRestaurantExist(1);

    expect(getElement('.text-button-like').textContent).toEqual('Tidak Suka');
  });

  it('should show like button containing icon "heart solid" when retaurant has been liked', async () => {
    constructPresenter(dummyDataFavoriteRestaurant());

    await favoriteRestaurantModalPresenter._checkConditionButtonBaseOnIDB();
    await favoriteRestaurantModalPresenter._isRestaurantExist(1);

    expect(getElement('.heart-icon').classList.contains('fa-solid')).toBeTruthy();
  });

  it('should not show like button containing text "Suka" when retaurant has been liked', async () => {
    constructPresenter(dummyDataFavoriteRestaurant());

    await favoriteRestaurantModalPresenter._checkConditionButtonBaseOnIDB();
    await favoriteRestaurantModalPresenter._isRestaurantExist(1);

    expect(getElement('.text-button-like').textContent).not.toEqual('Suka');
  });

  it('should not show like button containing icon "heart not solid" when retaurant has been liked', async () => {
    constructPresenter(dummyDataFavoriteRestaurant());

    await favoriteRestaurantModalPresenter._checkConditionButtonBaseOnIDB();
    await favoriteRestaurantModalPresenter._isRestaurantExist(1);

    expect(getElement('.heart-icon').classList.contains('fa-regular')).toBeFalsy();
  });

  it('should be able unlike restaurant', async () => {
    await favoriteRestaurant.putFavoriteRestaurant(dummyDataFavoriteRestaurant());

    constructPresenter(dummyDataFavoriteRestaurant());

    await favoriteRestaurantModalPresenter._isRestaurantExist(1);
    getElement('.button-like-modal').dispatchEvent(new Event('click'));

    showAlertAndToast.alertQuestion(async () => {
      await favoriteRestaurant.deleteFavoriteRestaurant(1);
    });

    getElement('.confirm-button-unlike').dispatchEvent(new Event('click'));// button at modal popup
    await favoriteRestaurant.getFavoriteRestaurant(1);

    expect((await favoriteRestaurant.getAllFavoriteRestaurants()).length).toEqual(0);
  });

  it('should not throw error if the unlike restaurant is not in the list', async () => {
    constructPresenter(dummyDataFavoriteRestaurant());

    await favoriteRestaurant.deleteFavoriteRestaurant(1);

    await favoriteRestaurantModalPresenter._isRestaurantExist(1);
    getElement('.button-like-modal').dispatchEvent(new Event('click'));

    showAlertAndToast.alertQuestion(async () => {
      await favoriteRestaurant.deleteFavoriteRestaurant(1);
    });

    getElement('.confirm-button-unlike').dispatchEvent(new Event('click'));

    expect(await favoriteRestaurant.getAllFavoriteRestaurants()).toEqual([]);
  });
});
