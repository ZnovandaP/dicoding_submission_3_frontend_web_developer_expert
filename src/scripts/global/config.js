const CONFIG = {
  DURATION_ANIMATION: 500,
  // sw/cache config
  API_BASE_URL: 'https://restaurant-api.dicoding.dev',
  PRECACHE_PREFIX: 'restoRadar',
  PRECACHE_SUFFIX: 'v1',
  PRECACHE_NAME: 'precache',
  API_CACHE_NAME: 'api-cache',
  IMAGE_CACHE_NAME: 'img-cache',
  EXPIRE_DURATION: 60 * 60 * 24 * 7,
  // IDB config
  DATABASE_NAME: 'Resto-Radar-Database',
  DATABASE_VERSION: 1,
  OBJECT_STORE_NAME: 'restaurants',
};

export default CONFIG;
