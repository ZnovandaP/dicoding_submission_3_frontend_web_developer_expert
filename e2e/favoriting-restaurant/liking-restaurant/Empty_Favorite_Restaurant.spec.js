const MAX_TIMEOUT_WAITING_DURATION = 5;
const MIN_TIMEOUT_WAITING_DURATION = 2.5;

Feature('Showing Empty Favorite Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('should showing empty favorite restaurant ', ({ I }) => {
  I.waitForElement('.message-favorite-restaurant-empty', MIN_TIMEOUT_WAITING_DURATION || MAX_TIMEOUT_WAITING_DURATION);
  I.see('Data Daftar Restoran Favorit Kosong', '.message-favorite-restaurant-empty');
});
