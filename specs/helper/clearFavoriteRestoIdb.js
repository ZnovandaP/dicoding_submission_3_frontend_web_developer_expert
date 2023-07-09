import { async } from 'regenerator-runtime';
import favoriteRestaurantIDB from '../../src/scripts/data/favorite-restaurant-idb';

const clearFavoriteRestoIdb = async () => {
  const allFavoriteRestoData = await favoriteRestaurantIDB.getAllFavoriteRestaurants();
  if (!allFavoriteRestoData) return;

  allFavoriteRestoData.forEach(async (resto) => {
    await favoriteRestaurantIDB.deleteFavoriteRestaurant(resto.id);
  });
};

export default clearFavoriteRestoIdb;
