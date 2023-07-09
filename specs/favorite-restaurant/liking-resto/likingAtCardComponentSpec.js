import { async } from 'regenerator-runtime';
import FavoriteRestaurantCardPresenter from '../../../src/scripts/presenter/favorite-restaurant-presenter/favorite-restaurant-card-presenter';
import favoriteRestaurantIDB from '../../../src/scripts/data/favorite-restaurant-idb';
import clearFavoriteRestoIdb from '../../helper/clearFavoriteRestoIdb';
import dummyDataFavoriteRestaurant from '../../helper/dummyDataForFavoriteResto';
import element from '../../../src/scripts/utilities/get-element';

const { getElementAll } = element;

describe('Liking A Restaurants at Card', () => {
  const favoriteRestaurant = favoriteRestaurantIDB;
  let favoriteRestaurantCardPresenter;

  const constructPresenter = (dataDummyRestaurant) => {
    favoriteRestaurantCardPresenter = new FavoriteRestaurantCardPresenter({
      favoriteButtonCard: getElementAll('.button-like'),
      rates: getElementAll('.rate'),
      dataRestaurants: [dataDummyRestaurant],
      favoriteRestaurant,
    });
  };

  const createCardContainer = () => {
    return `
    <div class="card-container">
      <div class="card">
        <div class="rate"></div>
        <button type="button" class="button-like" data-id="1"></button>
      </div>
    </div>
    `;
  };

  beforeEach(() => {
    document.body.innerHTML = createCardContainer();
  });

  afterEach(async () => {
    await clearFavoriteRestoIdb();
  });

  it('should show like button containing text "Suka" when retaurant has not been like before', async () => {
    constructPresenter(dummyDataFavoriteRestaurant());

    await favoriteRestaurantCardPresenter._isRestaurantExist(1);

    expect(favoriteRestaurantCardPresenter._favoriteButtonCard[0].textContent).toEqual('Suka');
  });

  it('should not show like button containing text "Tidak Suka" when retaurant has not been like before', async () => {
    constructPresenter(dummyDataFavoriteRestaurant());

    await favoriteRestaurantCardPresenter._isRestaurantExist(1);

    expect(favoriteRestaurantCardPresenter._favoriteButtonCard[0].textContent).not.toEqual('Tidak Suka');
  });

  it('should show rating with background color contain darkblue color when retaurant has not been like before', async () => {
    constructPresenter(dummyDataFavoriteRestaurant());

    await favoriteRestaurantCardPresenter._isRestaurantExist(1);

    expect(favoriteRestaurantCardPresenter._rates[0].style.backgroundColor).toEqual('rgb(8, 47, 73)');
    // rgb(40, 150, 114) / #289672 is darkblue (as a indicator in rating when retaurant has been liked)
  });

  it('should be able like restaurant', async () => {
    constructPresenter(dummyDataFavoriteRestaurant());

    favoriteRestaurantCardPresenter._favoriteButtonCard[0].dispatchEvent(new Event('click'));
    await favoriteRestaurant.getFavoriteRestaurant(1);

    expect(await favoriteRestaurant.getFavoriteRestaurant(1)).toBeTruthy();
  });

  it('should not add restaurant again when is already liked', async () => {
    await favoriteRestaurant.putFavoriteRestaurant(dummyDataFavoriteRestaurant());

    constructPresenter(dummyDataFavoriteRestaurant());

    favoriteRestaurantCardPresenter._favoriteButtonCard[0].dispatchEvent(new Event('click'));

    expect((await favoriteRestaurant.getAllFavoriteRestaurants()).length).toEqual(1);
  });

  it('should not add a restaurant when the restaurant does not have id', async () => {
    constructPresenter({});

    favoriteRestaurantCardPresenter._favoriteButtonCard[0].dispatchEvent(new Event('click'));
    await favoriteRestaurant.getFavoriteRestaurant(1);

    expect((await favoriteRestaurant.getAllFavoriteRestaurants()).length).toEqual(0);
  });
});
