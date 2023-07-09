import { async } from 'regenerator-runtime';
import FavoriteRestaurantDetailPresenter from '../../../src/scripts/presenter/favorite-restaurant-presenter/favorite-restaurant-detail-presenter';
import favoriteRestaurantIDB from '../../../src/scripts/data/favorite-restaurant-idb';
import clearFavoriteRestoIdb from '../../helper/clearFavoriteRestoIdb';
import dummyDataFavoriteRestaurant from '../../helper/dummyDataForFavoriteResto';
import element from '../../../src/scripts/utilities/get-element';

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

  beforeEach(() => {
    document.body.innerHTML = createLikeButtonElement();
  });

  afterEach(async () => {
    await clearFavoriteRestoIdb();
  });

  it('should show like button containing icon "heart not solid" when retaurant has not been like before', () => {
    constructPresenter(dummyDataFavoriteRestaurant());

    expect(getElement('.heart-icon').classList.contains('fa-regular')).toBeTruthy();
  });

  it('should not show like butotn containing icon "heart solid" when retaurant has not been like before', async () => {
    constructPresenter(dummyDataFavoriteRestaurant());

    expect(getElement('.heart-icon').classList.contains('fa-solid')).toBeFalsy();
  });

  it('should be able like a restaurant', async () => {
    constructPresenter(dummyDataFavoriteRestaurant());

    favoriteRestaurantDetailPresenter._likeButton.dispatchEvent(new Event('click'));
    await favoriteRestaurantDetailPresenter._isRestaurantExist(1);

    expect(await favoriteRestaurant.getFavoriteRestaurant(1)).toBeTruthy();
  });

  it('should not add restaurant again when is already liked', async () => {
    await favoriteRestaurant.putFavoriteRestaurant(dummyDataFavoriteRestaurant());

    constructPresenter(dummyDataFavoriteRestaurant());

    favoriteRestaurantDetailPresenter._likeButton.dispatchEvent(new Event('click'));
    await favoriteRestaurantDetailPresenter._isRestaurantExist(1);

    expect((await favoriteRestaurant.getAllFavoriteRestaurants()).length).toEqual(1);
  });

  it('should not add a restaurant when the restaurant does not have id', async () => {
    constructPresenter({});

    favoriteRestaurantDetailPresenter._likeButton.dispatchEvent(new Event('click'));

    expect((await favoriteRestaurant.getAllFavoriteRestaurants()).length).toEqual(0);
  });
});
