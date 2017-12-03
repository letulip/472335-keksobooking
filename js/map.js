'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapFaded = '.map--faded';
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

  function hideBlock(element, className) {
    element.classList.remove(className);
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
    var pinShift = 44;
    return ((locationCoords - pinShift) + 'px');
  }

  function createAdvertElement(advert) {
    var similarAdvertTemplate = document.querySelector('template').content;
    var advertElement = similarAdvertTemplate.cloneNode(true);
    advertElement.querySelector('.popup__avatar').src = advert.author.avatar;
    advertElement.querySelector('h3').textContent = advert.offer.title;
    advertElement.querySelector('p small').textContent = 'Координаты на карте: ' + advert.offer.address;
    advertElement.querySelector('.popup__price').innerHTML = 'Цена за ночь: ' + advert.offer.price + '&#x20bd;/ночь';
    advertElement.querySelector('h4').textContent = 'Тип жилья: ' + advert.offer.type;
    advertElement.querySelector('h4 + p').textContent = 'Количество комнат: ' + advert.offer.rooms + ' для ' + advert.offer.guests + ' гостей';
    advertElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    advertElement.querySelector('.popup__features').textContent = 'Доп. опции: ' + advert.offer.features;
    advertElement.querySelector('.popup__features + p').textContent = 'Описание: ' + advert.offer.description;
    return advertElement;
  }

  function createAdvertButton(advert) {
    var similarAdvertTemplate = document.querySelector('template').content;
    var advertButton = similarAdvertTemplate.cloneNode(true);
    advertButton.querySelector('.map__pin img').src = advert.author.avatar;
    advertButton.querySelector('.map__pin').style.left = getCoordinates(advert.location.x);
    advertButton.querySelector('.map__pin').style.top = getCoordinates(advert.location.y);
    return advertButton;
  }

  function fillFragment(advertsArray) {
    var fragment = document.createDocumentFragment();
    var similarPinElement = document.querySelector('.map__pin');
    for (var i = 0; i < adverts.length; i++) {
      fragment.appendChild(createAdvertButton(advertsArray[i]));
    }
    similarPinElement.appendChild(fragment);
  }

  function fillAdvert(advert) {
    var fragment = document.createDocumentFragment();
    var similarPinElement = document.querySelector('.map__pin');
    fragment.appendChild(createAdvertElement(advert));
    similarPinElement.appendChild(fragment);
  }

  function formCheck() {
    var form = document.querySelector('.notice__form');
    var formAddress = form.querySelector('#address');
    var formTitle = form.querySelector('#title');
    var formPrice = form.querySelector('#price');
    var formTimeIn = form.querySelector('#timein');
    var formTimeOut = form.querySelector('#timeout');
    var formType = form.querySelector('#type');
    var formRooms = form.querySelector('#room_number');
    var formCapacity = form.querySelector('#capacity');

    formTitle.addEventListener('invalid', function () {
      if (formTitle.validity.tooShort) {
        formTitle.setCustomValidity('Заголовок должен состоять минимум из 30-ти символов');
      } else if (formTitle.validity.tooLong) {
        formTitle.setCustomValidity('Заголовок не должен превышать 100 символов');
      } else if (formTitle.validity.valueMissing) {
        formTitle.setCustomValidity('Обязательное поле');
      } else {
        formTitle.setCustomValidity('');
      }
    });

    formType.addEventListener('change', function () {
      switch (formType.value) {
        case 'bungalo':
          setAttribute(formPrice, 'min', 0);
          break;
        case 'flat':
          setAttribute(formPrice, 'min', 1000);
          break;
        case 'house':
          setAttribute(formPrice, 'min', 5000);
          break;
        case 'palace':
          setAttribute(formPrice, 'min', 10000);
          break;
      }
    });

    formTimeIn.addEventListener('change', function () {
      formTimeOut.value = formTimeIn.value;
    });

    formTimeOut.addEventListener('change', function () {
      formTimeIn.value = formTimeOut.value;
    });

    formRooms.addEventListener('change', function () {
      if (formRooms.value === '100') {
        formCapacity.value = '0';
      } else {
        formCapacity.value = formRooms.value;
      }
    });

    function setRequiredField(fieldId) {
      fieldId.required = true;
      return fieldId;
    }

    function setReadOnlyField(fieldId) {
      fieldId.readOnly = true;
      return fieldId;
    }

    function setAttribute(fieldId, attributeName, attributeValue) {
      return fieldId.setAttribute(attributeName, attributeValue);
    }

    setAttribute(form, 'action', 'https://js.dump.academy/keksobooking');
    setRequiredField(formAddress);
    setReadOnlyField(formAddress);
    setRequiredField(formTitle);
    setAttribute(formTitle, 'minlength', 30);
    setAttribute(formTitle, 'maxlength', 100);
    setRequiredField(formPrice);
    setAttribute(formPrice, 'min', 0);
    setAttribute(formPrice, 'value', 1000);
    setAttribute(formPrice, 'max', 1000000);
  }

  hideBlock(map, mapFaded);
  createAvatars();
  fillFragment(createAdverts());
  fillAdvert(adverts[0]);
  formCheck();
}());
