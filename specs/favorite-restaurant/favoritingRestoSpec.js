import { async } from 'regenerator-runtime';
import favoriteRestaurantIDB from '../../src/scripts/data/favorite-restaurant-idb';
import itActsAsFavoriteRestaurant from './contract/favoriteRestaurantContract';
import clearFavoriteRestoIdb from '../helper/clearFavoriteRestoIdb';

describe('Favorite Restaurant IDB Contract Test Implementation', () => {
  afterEach(async () => {
    await clearFavoriteRestoIdb();
  });

  itActsAsFavoriteRestaurant(favoriteRestaurantIDB);
});
