const assert = require('assert');

const MAX_TIMEOUT_WAITING_DURATION = 5;
const MIN_TIMEOUT_WAITING_DURATION = 2.5;

Feature('Unliking Restaurant At Card Component');

Before(async ({ I }) => {
  I.amOnPage('/');
  I.wait(MIN_TIMEOUT_WAITING_DURATION || MAX_TIMEOUT_WAITING_DURATION);
  I.seeElement(locate('.card-overlay').first());
  I.seeElement('.card-content');
  const firstRestaurantTitle = await I.grabTextFrom('.restaurant-name');

  const buttonInfo = locate('.button-info').first();
  I.seeElement(buttonInfo);
  I.click(buttonInfo); // showing card menu

  I.seeElement('.wrapper-card-menu');

  I.seeElement(locate('.card-menu').first());

  const buttonLikeCard = locate('.button-like').first();
  I.seeElement(buttonLikeCard);
  I.click(buttonLikeCard);

  I.amOnPage('/#/favorite');
  I.seeElement(locate('.card-overlay').first());
  I.seeElement('.card-content');
  const favoriteRestaurantTitle = await I.grabTextFrom('.restaurant-name');

  assert.strictEqual(firstRestaurantTitle, favoriteRestaurantTitle);
});

// unliking restaurant via modal component (through button "preview" at card menu)
Scenario('first way to be able unliking restaurant via modal popup', ({ I }) => {
  I.amOnPage('/');
  I.wait(MIN_TIMEOUT_WAITING_DURATION || MAX_TIMEOUT_WAITING_DURATION);
  I.seeElement(locate('.card-overlay').first());

  const buttonInfo = locate('.button-info').first();
  I.seeElement(buttonInfo);
  I.click(buttonInfo); // showing card menu

  I.seeElement('.wrapper-card-menu');

  I.seeElement(locate('.card-menu').first());

  const buttonPreview = locate('.button-preview').first();
  I.seeElement(buttonPreview);
  I.click(buttonPreview);

  I.wait(MIN_TIMEOUT_WAITING_DURATION || MAX_TIMEOUT_WAITING_DURATION);
  I.seeElement('.modal-parent');
  I.seeElement('.modal-body');
  // trigger button showing modal popup to get permission remove favorite restaurant from user
  I.seeElement('.button-like-modal');
  I.click('.button-like-modal');

  // confirm button unlike restaurant from modal popup to get permission remove favorite restaurant from user
  I.wait(MIN_TIMEOUT_WAITING_DURATION || MAX_TIMEOUT_WAITING_DURATION);
  I.seeElement('.confirm-button-unlike');
  I.click('.confirm-button-unlike');

  I.seeElement('.modal-button-close');
  I.click('.modal-button-close');

  I.amOnPage('/#/favorite');
  I.waitForElement('.message-favorite-restaurant-empty', MIN_TIMEOUT_WAITING_DURATION || MAX_TIMEOUT_WAITING_DURATION);
  I.see('Data Daftar Restoran Favorit Kosong', '.message-favorite-restaurant-empty');
});

// unliking restaurant via modal component (through click the card/card-overlay component)
Scenario('second way to be able unliking restaurant via modal popup', ({ I }) => {
  I.amOnPage('/');
  I.wait(MIN_TIMEOUT_WAITING_DURATION || MAX_TIMEOUT_WAITING_DURATION);
  I.seeElement(locate('.card-overlay').first());
  I.click(locate('.card-overlay').first()); // click overlay card trigger showing modal popup

  I.wait(MIN_TIMEOUT_WAITING_DURATION || MAX_TIMEOUT_WAITING_DURATION);
  I.seeElement('.modal-parent');
  I.seeElement('.modal-body');
  // trigger button showing modal popup to get permission remove favorite restaurant from user
  I.seeElement('.button-like-modal');
  I.click('.button-like-modal');

  // confirm button unlike restaurant from modal popup to get permission remove favorite restaurant from user
  I.wait(MIN_TIMEOUT_WAITING_DURATION || MAX_TIMEOUT_WAITING_DURATION);
  I.seeElement('.confirm-button-unlike');
  I.click('.confirm-button-unlike');

  I.seeElement('.modal-button-close');
  I.click('.modal-button-close');

  I.amOnPage('/#/favorite');
  I.waitForElement('.message-favorite-restaurant-empty', MIN_TIMEOUT_WAITING_DURATION || MAX_TIMEOUT_WAITING_DURATION);
  I.see('Data Daftar Restoran Favorit Kosong', '.message-favorite-restaurant-empty');
});
