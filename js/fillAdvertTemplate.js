'use strict';

(function () {
  var IMG_WIDTH = 50;
  var IMG_HEIGHT = 70;
  var ADVERT_COUNT = 5;
  var VERTICAL_SHIFT = 41;
  var similarAdvertTemplateContent = document.querySelector('template').content;
  var similarPinElement = document.querySelector('.map__pins');
  var AdvertType = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  function createAdvert(advert) {
    var advertContent = similarAdvertTemplateContent.cloneNode(true);
    var pin = advertContent.querySelector('.map__pin');
    advertContent.querySelector('.map__pin img').src = advert.author.avatar;
    pin.style.left = getCoordinates(advert.location.x);
    pin.style.top = getCoordinates(advert.location.y - VERTICAL_SHIFT);
    pin.tabIndex = 0;
    advertContent.querySelector('.popup__avatar').src = advert.author.avatar;
    advertContent.querySelector('h3').textContent = advert.offer.title;
    advertContent.querySelector('p small').textContent = 'Координаты на карте: ' + advert.offer.address;
    window.util.popupHide(advertContent.querySelector('.popup'));
    advertContent.querySelector('.popup__price').textContent = 'Цена за ночь: ' + advert.offer.price + '₽/ночь';
    advertContent.querySelector('h4').textContent = 'Тип жилья: ' + getType(advert.offer.type);
    advertContent.querySelector('h4 + p').textContent = 'Количество комнат: ' + advert.offer.rooms + ' для ' + advert.offer.guests + ' гостей';
    advertContent.querySelector('h4 + p + p').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    getFeatures(advertContent, advert.offer.features);
    advertContent.querySelector('.popup__features + p').textContent = 'Описание: ' + advert.offer.description;
    addPictures(advertContent, advert.offer.photos);
    return advertContent;
  }

  function getFeatures(element, features) {
    var popupFeature = element.querySelector('.popup__features');
    var popupFeatureChildren = popupFeature.querySelectorAll('li');
    popupFeatureChildren.forEach(function (child) {
      child.remove();
    });
    var fragment = document.createDocumentFragment();

    features.forEach(function (feature) {
      var li = document.createElement('li');
      fragment.appendChild(li).classList.add('feature', 'feature--' + feature);
    });

    element.querySelector('.popup__features').appendChild(fragment);
  }

  function getType(type) {
    return AdvertType[type];
  }

  function addPictures(element, photosArray) {
    var inner = element.querySelector('.popup__pictures li');
    var pictures = element.querySelector('.popup__pictures');
    pictures.removeChild(inner);
    photosArray.forEach(function (item) {
      var li = document.createElement('li');
      var img = new Image();
      img.style.width = IMG_WIDTH + 'px';
      img.style.height = IMG_HEIGHT + 'px';
      pictures.appendChild(li).appendChild(img).src = item;
    });
  }

  function getCoordinates(locationCoords) {
    return locationCoords + 'px';
  }

  window.fillAdvertTemplate = {
    fillFragment: function (advertsArray) {
      var existingCards = document.querySelectorAll('.map__card');
      existingCards.forEach(function (item) {
        item.remove();
      });
      var existingPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      existingPins.forEach(function (item) {
        item.remove();
      });
      var fragment = document.createDocumentFragment();
      advertsArray.slice(0, ADVERT_COUNT).forEach(function (item) {
        fragment.appendChild(createAdvert(item));
      });
      similarPinElement.appendChild(fragment);
    }
  };
})();
