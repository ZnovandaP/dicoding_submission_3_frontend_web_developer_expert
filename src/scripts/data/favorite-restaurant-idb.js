import { openDB } from 'idb';
import CONFIG from '../global/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

const favoriteRestaurantIDB = {
  async getFavoriteRestaurant(id) {
    if (!id) return;
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },

  async getAllFavoriteRestaurants() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },

  async putFavoriteRestaurant(dataRestaurant) {
    if (!('id' in dataRestaurant)) return;

    return (await dbPromise).put(OBJECT_STORE_NAME, dataRestaurant);
  },

  async deleteFavoriteRestaurant(id) {
    if (!id) return;

    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
};

export default favoriteRestaurantIDB;
