import showAlertAndToast from '../../../src/scripts/utilities/show-alert';
import favoriteRestaurantIDB from '../../../src/scripts/data/favorite-restaurant-idb';
import FavoriteRestaurantCardPresenter from '../../../src/scripts/presenter/favorite-restaurant-presenter/favorite-restaurant-card-presenter';
import clearFavoriteRestoIdb from '../../helper/clearFavoriteRestoIdb';
import dummyDataFavoriteRestaurant from '../../helper/dummyDataForFavoriteResto';
import element from '../../../src/scripts/utilities/get-element';

const { getElement, getElementAll } = element;

describe('Unliking A Restaurants At Card', () => {
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

  beforeEach(async () => {
    document.body.innerHTML = createCardContainer();
    await favoriteRestaurant.putFavoriteRestaurant(dummyDataFavoriteRestaurant());
  });

  afterEach(async () => {
    await clearFavoriteRestoIdb();
  });

  it('should show like button containing text "Tidak Suka" when retaurant has been liked', async () => {
    constructPresenter(dummyDataFavoriteRestaurant());

    await favoriteRestaurantCardPresenter._isRestaurantExist(1);

    expect(favoriteRestaurantCardPresenter._favoriteButtonCard[0].textContent).toEqual('Tidak Suka');
  });

  it('should not show like button containing text "Suka" when retaurant has been liked', async () => {
    constructPresenter(dummyDataFavoriteRestaurant());

    await favoriteRestaurantCardPresenter._isRestaurantExist(1);

    expect(favoriteRestaurantCardPresenter._favoriteButtonCard[0].textContent).not.toEqual('Suka');
  });

  it('should show rating with background color contain red color when retaurant has been liked', async () => {
    constructPresenter(dummyDataFavoriteRestaurant());

    await favoriteRestaurantCardPresenter._isRestaurantExist(1);

    expect(favoriteRestaurantCardPresenter._rates[0].style.backgroundColor).toEqual('rgb(220, 38, 38)');
    // rgb(220, 38, 38) / #dc2626 is red (as a indicator in rating when retaurant has been liked)
  });

  it('should be able unlike restaurant', async () => {
    constructPresenter(dummyDataFavoriteRestaurant());

    await favoriteRestaurantCardPresenter._isRestaurantExist(1);
    favoriteRestaurantCardPresenter._favoriteButtonCard[0].dispatchEvent(new Event('click'));

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

    await favoriteRestaurantCardPresenter._isRestaurantExist(1);
    favoriteRestaurantCardPresenter._favoriteButtonCard[0].dispatchEvent(new Event('click'));

    showAlertAndToast.alertQuestion(async () => {
      await favoriteRestaurant.deleteFavoriteRestaurant(1);
    });

    getElement('.confirm-button-unlike').dispatchEvent(new Event('click'));

    expect(await favoriteRestaurant.getAllFavoriteRestaurants()).toEqual([]);
  });
});
