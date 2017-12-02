'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var map = document.querySelector('.map:not(.popup__close)');
  var popupCloseIcon;
  var mapFaded = 'map--faded';
  var fieldsetElements = document.querySelectorAll('.form__element');
  var disabled = 'disabled';
  var hidden = 'hidden';
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormDisabled = 'notice__form--disabled';
  var numOfAdverts = 8;
  var avatars = [];
  var adverts = [];
  var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var location;
  var types = ['flat', 'house', 'bungalo'];
  var rooms;
  var checkins = ['12:00', '13:00', '14:00'];
  var checkouts = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var mapPinMainMouseUp = document.querySelector('main');
  var mapPinPopup;

  mapPinMainMouseUp.addEventListener('mouseup', mouseUpInit);

  map.addEventListener('click', mapEventListener);
  map.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      mapEventListener;
    }
  });
  map.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      mapEventListener;
    }
  });

  function mapEventListener() {
    var mapPinTemplate = map.querySelector('.map__pin-template');
    var mapPinClickable = map.querySelector('.map__pin-template .map__pin:not(.map__pin--main)');
    var mapPinActive = 'map__pin--active';
    if (mapPinTemplate.className === document.activeElement.parentElement.className) {
      removeTemplateActive();
      document.activeElement.parentElement.classList.add('map__pin-template-active');
      var activeTemplate = map.querySelector('.map__pin-template-active');
      removePreviousActivePin(mapPinPopup);
      addClassName(document.activeElement, mapPinActive);
      mapPinPopup = document.activeElement.parentElement.firstElementChild;
      var string = '.map__pin-template-active article .popup__close';
      popupCloseIcon = map.querySelector(string);
      removeClassName(mapPinPopup, 'hidden');
      popupCloseIcon.addEventListener('click', popupClose);
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ESC_KEYCODE) {
          popupClose();
        }
      });
    }

    function popupClose() {
      removeTemplateActive();
      removePreviousActivePin(mapPinPopup);
    }

    function removePreviousActivePin(previousPopup) {
      var pinActive = document.querySelector('.map__pin--active');
      if (pinActive) {
        removeClassName(pinActive, 'map__pin--active');
      }
      if (previousPopup) {
        addClassName(previousPopup, 'hidden');
        popupCloseIcon.removeEventListener('click', popupClose);
      }
    }

    function removeTemplateActive() {
      var activePopup = map.querySelector('.map__pin-template-active');
      if (activePopup) {
        removeClassName(activePopup, 'map__pin-template-active');
      }
    }
  }

  function removeClassName(element, className) {
    element.classList.remove(className);
  }

  function addClassName(element, className) {
    element.classList.add(className);
  }

  function Advert(author, offer, locationCoords) {
    this.author = author;
    this.offer = offer;
    this.location = locationCoords;
  }

  function Author(avatar) {
    this.avatar = avatar;
  }

  function Offer(offerParams) {
    this.title = offerParams.title;
    this.address = offerParams.address;
    this.price = offerParams.price;
    this.type = offerParams.type;
    this.rooms = offerParams.rooms;
    this.guests = offerParams.guests;
    this.checkin = offerParams.checkin;
    this.checkout = offerParams.checkout;
    this.features = offerParams.features;
    this.description = offerParams.description;
    this.photos = offerParams.photos;
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
    return new Author(avatars[authorIndex]);
  }

  function createAvatars() {
    for (var i = 1; i <= numOfAdverts; i++) {
      avatars.push('img/avatars/user0' + i + '.png');
    }
  }

  function createOffer() {
    var offer = {
      title: getRandomTitle(),
      address: getAddress(getLocation()),
      price: getPrice(),
      type: getType(),
      rooms: getNumberOfRooms(),
      guests: getNumberOfGuests(),
      checkin: getCheckIn(),
      checkout: getCheckOut(),
      features: getRandomFeatures(),
      description: '',
      photos: []
    };
    return new Offer(offer);
  }

  function getLocation() {
    var minAreaX = 300;
    var maxAreaX = 900;
    var minAreaY = 100;
    var maxAreaY = 500;
    location = new Location(getRandomInt(minAreaX, maxAreaX), getRandomInt(minAreaY, maxAreaY));
    return location;
  }

  function getAddress(locationCoords) {
    return locationCoords.x + ', ' + locationCoords.y;
  }

  function getPrice() {
    var minPrice = 1000;
    var maxPrice = 1000000;
    return getRandomInt(minPrice, maxPrice);
  }

  function getType() {
    var type = types[getRandomInt(0, types.length)];
    if (type === 'flat') {
      return 'Квартира';
    } else if (type === 'house') {
      return 'Дом';
    } else {
      return 'Бунгало';
    }
  }

  function getNumberOfRooms() {
    var minRooms = 1;
    var maxRooms = 5;
    rooms = getRandomInt(minRooms, maxRooms);
    return rooms;
  }

  function getNumberOfGuests() {
    var guestByRoom = 2;
    return rooms * guestByRoom;
  }

  function getCheckIn() {
    return checkins[getRandomInt(0, checkins.length)];
  }

  function getCheckOut() {
    return checkouts[getRandomInt(0, checkouts.length)];
  }

  function getCoordinates(locationCoords) {
    return ((locationCoords) + 'px');
  }

  function createAdvertTemplate(advertContent) {
    var similarAdvertTemplate = document.querySelector('template');
    var advertTemplate = similarAdvertTemplate.cloneNode(false);
    advertTemplate.style.display = 'block';
    advertTemplate.classList.add('map__pin-template');
    advertTemplate.appendChild(advertContent);
    return advertTemplate;
  }

  function createAdvert(advert) {
    var similarAdvertTemplateContent = document.querySelector('template').content;
    var advertContent = similarAdvertTemplateContent.cloneNode(true);
    advertContent.querySelector('.map__pin img').src = advert.author.avatar;
    advertContent.querySelector('.map__pin').style.left = getCoordinates(advert.location.x);
    advertContent.querySelector('.map__pin').style.top = getCoordinates(advert.location.y);
    advertContent.querySelector('.popup__avatar').src = advert.author.avatar;
    advertContent.querySelector('h3').textContent = advert.offer.title;
    advertContent.querySelector('p small').textContent = 'Координаты на карте: ' + advert.offer.address;
    advertContent.querySelector('.popup__price').innerHTML = 'Цена за ночь: ' + advert.offer.price + '&#x20bd;/ночь';
    advertContent.querySelector('h4').textContent = 'Тип жилья: ' + advert.offer.type;
    advertContent.querySelector('h4 + p').textContent = 'Количество комнат: ' + advert.offer.rooms + ' для ' + advert.offer.guests + ' гостей';
    advertContent.querySelector('h4 + p + p').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    advertContent.querySelector('.popup__features').textContent = 'Доп. опции: ' + advert.offer.features;
    advertContent.querySelector('.popup__features + p').textContent = 'Описание: ' + advert.offer.description;
    return advertContent;
  }

  function fillFragment(advertsArray) {
    var fragment = document.createDocumentFragment();
    var similarPinElement = document.querySelector('.map__pins');
    for (var i = 0; i < adverts.length; i++) {
      fragment.appendChild(createAdvertTemplate(createAdvert(advertsArray[i])));
    }
    similarPinElement.appendChild(fragment);
  }

  function formFieldsetHide() {
    for (var i = 0; i < fieldsetElements.length; i++) {
      addClassName(fieldsetElements[i], disabled);
    }
  }

  function formFieldsetShow() {
    for (var i = 0; i < fieldsetElements.length; i++) {
      removeClassName(fieldsetElements[i], disabled);
    }
  }

  function popupsHide() {
    var popups = document.querySelectorAll('.popup');
    for (var i = 0; i < popups.length; i++) {
      addClassName(popups[i], 'hidden');
    }
  }

  function mouseUpInit() {
    removeClassName(map, mapFaded);
    createAvatars();
    fillFragment(createAdverts());
    removeClassName(noticeForm, noticeFormDisabled);
    formFieldsetShow();
    popupsHide();
    mapPinMainMouseUp.removeEventListener('mouseup', mouseUpInit);
  }

  formFieldsetHide();
}());
