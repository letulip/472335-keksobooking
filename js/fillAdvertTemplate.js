'use strict';

(function () {
  function createAdvert(advert) {
    var similarAdvertTemplateContent = document.querySelector('template').content;
    var advertContent = similarAdvertTemplateContent.cloneNode(true);
    advertContent.querySelector('.map__pin img').src = advert.author.avatar;
    advertContent.querySelector('.map__pin').style.left = getCoordinates(advert.location.x);
    advertContent.querySelector('.map__pin').style.top = getCoordinates(advert.location.y);
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
    picturesAdding(advertContent, advert.offer.photos);
    return advertContent;
  }

  function getFeatures(element, features) {
    var popupFeatures = element.querySelector('.popup__features');
    var popupFeaturesChildren = popupFeatures.querySelectorAll('li');
    popupFeaturesChildren.forEach(function (child) {
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
    if (type === 'flat') {
      return 'Квартира';
    } else if (type === 'house') {
      return 'Дом';
    } else {
      return 'Бунгало';
    }
  }

  function picturesAdding(element, photosArray) {
    var inner = element.querySelector('.popup__pictures li');
    element.querySelector('.popup__pictures').removeChild(inner);
    photosArray.forEach(function (item) {
      var imgWidth = 50;
      var imgHeight = 70;
      var li = document.createElement('li');
      var img = new Image();
      img.style.width = imgWidth + 'px';
      img.style.height = imgHeight + 'px';
      element.querySelector('.popup__pictures').appendChild(li).appendChild(img).src = item;
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
      var similarPinElement = document.querySelector('.map__pins');
      var advertsCount = 5;
      advertsArray.slice(0, advertsCount).forEach(function (item) {
        fragment.appendChild(createAdvert(item));
      });
      similarPinElement.appendChild(fragment);
    }
  };
})();
