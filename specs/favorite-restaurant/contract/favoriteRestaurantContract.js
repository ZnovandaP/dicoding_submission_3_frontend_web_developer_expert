import { async } from 'regenerator-runtime';

const itActsAsFavoriteRestaurant = (favoriteRestaurant) => {
  it('should return the restaurant that has been added', async () => {
    await favoriteRestaurant.putFavoriteRestaurant({ id: 1 });
    await favoriteRestaurant.putFavoriteRestaurant({ id: 2 });

    expect(await favoriteRestaurant.getFavoriteRestaurant(1)).toEqual({ id: 1 });
    expect(await favoriteRestaurant.getFavoriteRestaurant(2)).toEqual({ id: 2 });
    expect(await favoriteRestaurant.getFavoriteRestaurant(3)).toEqual(undefined);
  });

  it('should refuse a movie from beeing added if it does not have propery id', async () => {
    await favoriteRestaurant.putFavoriteRestaurant({ aProperty: 'property' });

    expect(await favoriteRestaurant.getAllFavoriteRestaurants()).toEqual([]);
  });

  it('sholud could return all favorite restaurants', async () => {
    await favoriteRestaurant.putFavoriteRestaurant({ id: 1 });
    await favoriteRestaurant.putFavoriteRestaurant({ id: 2 });

    expect(await favoriteRestaurant.getAllFavoriteRestaurants()).toEqual([
      { id: 1 },
      { id: 2 },
    ]);
  });

  it('should could remove favorite restaurant', async () => {
    await favoriteRestaurant.putFavoriteRestaurant({ id: 1 });
    await favoriteRestaurant.putFavoriteRestaurant({ id: 2 });
    await favoriteRestaurant.putFavoriteRestaurant({ id: 3 });

    await favoriteRestaurant.deleteFavoriteRestaurant(3);

    expect(await favoriteRestaurant.getAllFavoriteRestaurants()).toEqual([
      { id: 1 },
      { id: 2 },
    ]);
  });

  it('should could remove favorite restaurant even though the movie has not been added', async () => {
    await favoriteRestaurant.putFavoriteRestaurant({ id: 1 });
    await favoriteRestaurant.putFavoriteRestaurant({ id: 2 });
    await favoriteRestaurant.putFavoriteRestaurant({ id: 3 });

    await favoriteRestaurant.deleteFavoriteRestaurant(4);

    expect(await favoriteRestaurant.getAllFavoriteRestaurants()).toEqual([
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ]);
  });
};

export default itActsAsFavoriteRestaurant;
