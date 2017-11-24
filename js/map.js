'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapFaded = '.map--faded';
  var numOfAdverts = 8;
  var avatars = [];
  var adverts = [];
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

  function Offer(offerTitle, offerAddress, offerPrice, offerType, offerRooms, offerGuests, offerCheckin, offerCheckout, offerFeatures, offerDescription, offerPhotos) {
    this.title = offerTitle;
    this.address = offerAddress;
    this.price = offerPrice;
    this.type = offerType;
    this.rooms = offerRooms;
    this.guests = offerGuests;
    this.checkin = offerCheckin;
    this.checkout = offerCheckout;
    this.features = offerFeatures;
    this.description = offerDescription;
    this.photos = offerPhotos;
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
    for (var i = 0; i < numOfAdverts; i++) {
      adverts.push(new Advert(getAuthor(i), createOffer(), location));
    }
    return adverts;
  }

  function getAuthor(authorIndex) {
    var author = new Author(avatars[authorIndex]);
    return author;
  }

  function createAvatars() {
    for (var i = 1; i <= numOfAdverts; i++) {
      avatars.push('img/avatars/user0' + i + '.png');
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

  function getAddress(loc) {
    address = loc.x + ', ' + loc.y;
    return address;
  }

  function getPrice() {
    price = getRandomInt(1000, 1000000);
    return price;
  }

  function getType() {
    if (types[getRandomInt(0, types.length)] === 'flat') {
      return 'Квартира';
    } else if (types[getRandomInt(0, types.length)] === 'house') {
      return 'Дом';
    } else {
      return 'Бунгало';
    }

  }

  function getNumberOfRooms() {
    rooms = getRandomInt(1, 5);
    return rooms;
  }

  function getNumberOfGuests() {
    guests = rooms * 2;
    return guests;
  }

  function getCheckIn() {
    return checkins[getRandomInt(0, checkins.length)];
  }

  function getCheckOut() {
    return checkouts[getRandomInt(0, checkouts.length)];
  }

  function getCoordinates(loc) {
    var coords = loc - 44;
    return (coords + 'px');
  }

  function createAdvertElement(advert) {
    var similarAdvertTemplate = document.querySelector('#similar-advert-template').content;
    var advertElement = similarAdvertTemplate.cloneNode(true);
    advertElement.querySelector('.popup__avatar').src = advert.author.avatar;
    advertElement.querySelector('.popup__title').textContent = advert.offer.title;
    advertElement.querySelector('.popup__address').textContent = 'Координаты на карте: ' + advert.offer.address;
    advertElement.querySelector('.popup__price').textContent = 'Цена за ночь: ' + advert.offer.price + '&#x20bd;/ночь';
    advertElement.querySelector('.popup__type').textContent = 'Тип жилья: ' + advert.offer.type;
    advertElement.querySelector('.popup__rooms').textContent = 'Количество комнат: ' + advert.offer.rooms + ' для ' + advert.offer.guests + ' гостей';
    advertElement.querySelector('.popup__checkin').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    advertElement.querySelector('.popup__features').textContent = 'Доп. опции: ' + advert.offer.features;
    advertElement.querySelector('.popup__desc').textContent = 'Описание: ' + advert.offer.description;
    return advertElement;
  }

  function createAdvertButton(advert) {
    var similarAdvertTemplate = document.querySelector('#similar-advert-template').content;
    var advertButton = similarAdvertTemplate.cloneNode(true);
    advertButton.querySelector('.button__img').src = advert.author.avatar;
    advertButton.querySelector('.map__pin').style.left = getCoordinates(advert.location.x);
    advertButton.querySelector('.map__pin').style.top = getCoordinates(advert.location.y);
    return advertButton;
  }

  function fillFragment(advs) {
    var fragment = document.createDocumentFragment();
    var similarPinElement = document.querySelector('.map__pin');
    for (var i = 0; i < adverts.length; i++) {
      fragment.appendChild(createAdvertButton(advs[i]));
    }
    similarPinElement.appendChild(fragment);
  }

  function fillAdvert(advert) {
    var fragment = document.createDocumentFragment();
    var similarPinElement = document.querySelector('.map__pin');
    fragment.appendChild(createAdvertElement(advert));
    similarPinElement.appendChild(fragment);
  }

  hideBlock(map, mapFaded);
  createAvatars();
  fillFragment(createAdverts());
  fillAdvert(adverts[0]);
}());
