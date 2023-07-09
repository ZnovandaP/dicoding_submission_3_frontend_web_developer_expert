import { async } from 'regenerator-runtime';
import favoriteRestaurantIDB from '../../../src/scripts/data/favorite-restaurant-idb';
import clearFavoriteRestoIdb from '../../helper/clearFavoriteRestoIdb';
import dummyDataFavoriteRestaurant from '../../helper/dummyDataForFavoriteResto';
import element from '../../../src/scripts/utilities/get-element';
import FavoriteRestaurantModalPresenter from '../../../src/scripts/presenter/favorite-restaurant-presenter/favorite-restaurant-modal-presenter';
import modalBodyTemplate from '../../../src/scripts/view/templates/modal-body';

const { getElement } = element;

describe('Liking A Restaurants at Modal', () => {
  const favoriteRestaurant = favoriteRestaurantIDB;
  let favoriteRestaurantModalPresenter;

  const constructPresenter = (dataDummyRestaurant) => {
    favoriteRestaurantModalPresenter = new FavoriteRestaurantModalPresenter({
      view: modalBodyTemplate(dummyDataFavoriteRestaurant()),
      dataRestaurant: dataDummyRestaurant,
      favoriteRestaurant,
    });
  };

  beforeEach(() => {
    document.body.innerHTML = modalBodyTemplate(dummyDataFavoriteRestaurant());
  });

  afterEach(async () => {
    await clearFavoriteRestoIdb();
  });

  it('should show like button containing text "Suka" when retaurant has not been like before', async () => {
    constructPresenter(dummyDataFavoriteRestaurant());

    await favoriteRestaurantModalPresenter._checkConditionButtonBaseOnIDB();
    await favoriteRestaurantModalPresenter._isRestaurantExist(1);

    expect(getElement('.text-button-like').textContent).toEqual('Suka');
  });

  it('should show like button containing icon "heart not solid" when retaurant has not been like before', async () => {
    constructPresenter(dummyDataFavoriteRestaurant());

    await favoriteRestaurantModalPresenter._checkConditionButtonBaseOnIDB();
    await favoriteRestaurantModalPresenter._isRestaurantExist(1);

    expect(getElement('.heart-icon').classList.contains('fa-regular')).toBeTruthy();
  });

  it('should not show like button containing text "Tidak Suka" when retaurant has not been like before', async () => {
    constructPresenter(dummyDataFavoriteRestaurant());

    await favoriteRestaurantModalPresenter._checkConditionButtonBaseOnIDB();
    await favoriteRestaurantModalPresenter._isRestaurantExist(1);

    expect(getElement('.text-button-like').textContent).not.toEqual('Tidak Suka');
  });

  it('should not show like button containing icon "heart solid" when retaurant has not been like before', async () => {
    constructPresenter(dummyDataFavoriteRestaurant());

    await favoriteRestaurantModalPresenter._checkConditionButtonBaseOnIDB();
    await favoriteRestaurantModalPresenter._isRestaurantExist(1);

    expect(getElement('.heart-icon').classList.contains('fa-solid')).toBeFalsy();
  });

  it('should be able like a restaurant', async () => {
    constructPresenter(dummyDataFavoriteRestaurant());

    favoriteRestaurantModalPresenter._buttonLikeModal.dispatchEvent(new Event('click'));

    await favoriteRestaurantModalPresenter._isRestaurantExist(1);

    expect(await favoriteRestaurant.getFavoriteRestaurant(1)).toBeTruthy();
  });

  it('should not add restaurant again when is already liked', async () => {
    constructPresenter(dummyDataFavoriteRestaurant());

    await favoriteRestaurant.putFavoriteRestaurant(favoriteRestaurantModalPresenter._dataRestaurant);

    favoriteRestaurantModalPresenter._buttonLikeModal.dispatchEvent(new Event('click'));

    expect((await favoriteRestaurant.getAllFavoriteRestaurants()).length).toEqual(1);
  });

  it('should not add a restaurant when the restaurant does not have id', async () => {
    constructPresenter({});

    favoriteRestaurantModalPresenter._buttonLikeModal.dispatchEvent(new Event('click'));

    expect((await favoriteRestaurant.getAllFavoriteRestaurants()).length).toEqual(0);
  });
});
