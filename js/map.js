'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapFaded = '.map--faded';
  var setupSimilar = document.querySelector('.setup-similar');
  var authors = [];
  var avatars = [];
  var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var location;
  var address = '';
  var price;
  var types = ['flat', 'house', 'bungalo'];
  var rooms;
  var guests;
  var checkins = ['12:00', '13:00', '14:00'];
  var checkouts = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var description = '';
  var photos = [];

  function hideBlock(element, className) {
    element.classList.remove(className);
  }

  function Advert(author, offer, location) {
    this.author = author;
    this.offer = offer;
    this.location = location;
  }

  function Author(avatar) {
    this.avatar = avatar;
  }

  function Offer(title, address, price, type, rooms, guests, checkin, checkout, features, description, photos) {
    this.title = title;
    this.address = address;
    this.price = price;
    this.type = type;
    this.rooms = rooms;
    this.guests = guests;
    this.checkin = checkin;
    this.checkout = checkout;
    this.features = features;
    this.description = description;
    this.photos = photos;
  }

  function Location(x, y) {
    this.x = x;
    this.y = y;
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function getRandomTitle() {
    return titles[getRandomInt(0, titles.length)];
  }

  function getRandomFeatures() {
    var currentOfferFeatures = [];
    for (var i = 0; i < getRandomInt(1, features.length); i++) {
      currentOfferFeatures.push(features[getRandomInt(0, features.length)]);
    }
    return currentOfferFeatures;
  }

  function createAdverts() {
    var adverts = [];
    for (var i = 0; i < 8; i++) {
      adverts.push(new Advert(getAuthor(i), createOffer(), location));
    }
    return adverts;
  }

  function getAuthor(authorIndex) {
    authors.push(avatars[authorIndex]);
    return authors[authorIndex];
  }

  function createAvatars() {
    for (var i = 1; i <= 8; i++) {
      avatars.push('img/avatars/user0' + i + '.png')
    }
  }

  function createOffer() {
    var offer = new Offer(getRandomTitle(), getAddress(getLocation()), getPrice(), getType(), getNumberOfRooms(), getNumberOfGuests(), getCheckIn(), getCheckOut(), getRandomFeatures(), description, photos);
    return offer;
  }

  function getLocation() {
    location = new Location(getRandomInt(300, 900), getRandomInt(100, 500));
    return location;
  }

  function getAddress(location) {
    return location.x + ', ' + location.y;
  }

  function getPrice() {
    return getRandomInt(1000, 1000000);
  }

  function getType() {
    return types[getRandomInt(0, types.length)]
  }

  function getNumberOfRooms() {
    rooms = getRandomInt(1, 5)
    return rooms;
  }

  function getNumberOfGuests() {
    return rooms * 2;
  }

  function getCheckIn() {
    return checkins[getRandomInt(0, checkins.length)];
  }

  function getCheckOut() {
    return checkouts[getRandomInt(0, checkouts.length)];
  }

  // function createAdvertElement(advert) {
  //   var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  //   var wizardElement = similarWizardTemplate.cloneNode(true);
  //   wizardElement.querySelector('.setup-similar-label').textContent = mage.name;
  //   wizardElement.querySelector('.wizard-coat').style.fill = mage.coatColor;
  //   wizardElement.querySelector('.wizard-eyes').style.fill = mage.eyesColor;
  //   return wizardElement;
  // }
  //
  // function fillFragment(adverts) {
  //   var fragment = document.createDocumentFragment();
  //   var similarListElement = document.querySelector('.setup-similar-list');
  //   for (var i = 0; i < mages.length; i++) {
  //     fragment.appendChild(createAdvertElement(adverts[i]));
  //   }
  //   similarListElement.appendChild(fragment);
  // }

  hideBlock(map, mapFaded);
  createAvatars();
  debugger;
  createAdverts();
  // fillFragment(createAdverts());
}());
