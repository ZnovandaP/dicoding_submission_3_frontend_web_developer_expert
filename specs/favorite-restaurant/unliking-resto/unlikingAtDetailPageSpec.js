import { async } from 'regenerator-runtime';
import favoriteRestaurantIDB from '../../../src/scripts/data/favorite-restaurant-idb';
import FavoriteRestaurantDetailPresenter from '../../../src/scripts/presenter/favorite-restaurant-presenter/favorite-restaurant-detail-presenter';
import clearFavoriteRestoIdb from '../../helper/clearFavoriteRestoIdb';
import dummyDataFavoriteRestaurant from '../../helper/dummyDataForFavoriteResto';
import element from '../../../src/scripts/utilities/get-element';
import showAlertAndToast from '../../../src/scripts/utilities/show-alert';

const { getElement } = element;

describe('Liking A Restaurant at Detail Page', () => {
  let favoriteRestaurantDetailPresenter;
  const favoriteRestaurant = favoriteRestaurantIDB;

  const constructPresenter = (dataDummyRestaurant) => {
    favoriteRestaurantDetailPresenter = new FavoriteRestaurantDetailPresenter({
      likeButton: getElement('.button-like-detail'),
      iconLikeButton: getElement('.heart-icon'),
      dataRestaurant: dataDummyRestaurant,
      favoriteRestaurant,
    });
  };

  const createLikeButtonElement = () => {
    return `
    <button type="button" class="button-like-detail" title="Tambahkan ke favorit">
      <i class="fa-regular fa-heart heart-icon" aria-label="Icon Hati"></i>
    </button>
    `;
  };

  beforeEach(async () => {
    document.body.innerHTML = createLikeButtonElement();
    await favoriteRestaurant.putFavoriteRestaurant(dummyDataFavoriteRestaurant());
  });

  afterEach(async () => {
    await clearFavoriteRestoIdb();
  });

  it('should show like button containing icon "heart solid" when retaurant has not been like before', async () => {
    constructPresenter(dummyDataFavoriteRestaurant());

    await favoriteRestaurantDetailPresenter._isRestaurantExist(1);

    expect(getElement('.heart-icon').classList.contains('fa-solid')).toBeTruthy();
  });

  it('should not show like button containing icon "heart not solid" when retaurant has not been like before', async () => {
    constructPresenter(dummyDataFavoriteRestaurant());

    await favoriteRestaurantDetailPresenter._isRestaurantExist(1);

    expect(getElement('.heart-icon').classList.contains('fa-regular')).toBeFalsy();
  });

  it('should be able unlike restaurant', async () => {
    await favoriteRestaurant.putFavoriteRestaurant(dummyDataFavoriteRestaurant());

    constructPresenter(dummyDataFavoriteRestaurant());

    await favoriteRestaurantDetailPresenter._isRestaurantExist(1);
    favoriteRestaurantDetailPresenter._likeButton.dispatchEvent(new Event('click'));

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

    await favoriteRestaurantDetailPresenter._isRestaurantExist(1);
    favoriteRestaurantDetailPresenter._likeButton.dispatchEvent(new Event('click'));

    showAlertAndToast.alertQuestion(async () => {
      await favoriteRestaurant.deleteFavoriteRestaurant(1);
    });

    getElement('.confirm-button-unlike').dispatchEvent(new Event('click'));

    expect(await favoriteRestaurant.getAllFavoriteRestaurants()).toEqual([]);
  });
});
