'use strict';

window.fillAdvertTemplate = (function () {
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
    picturesAdding(advertContent, advert.offer.photos);
    return advertContent;
  }

  function picturesAdding(element, photosArray) {
    var inner = element.querySelector('.popup__pictures li');
    element.querySelector('.popup__pictures').removeChild(inner);
    for (var i = 0; i < photosArray.length; i++) {
      var imgWidth = 50;
      var imgHeight = 70;
      var li = document.createElement('li');
      var img = new Image(imgWidth, imgHeight);
      element.querySelector('.popup__pictures').appendChild(li).appendChild(img).src = photosArray[i];
    }
  }

  function getCoordinates(locationCoords) {
    return ((locationCoords) + 'px');
  }

  return {
    fillFragment: function (advertsArray) {
      var fragment = document.createDocumentFragment();
      var similarPinElement = document.querySelector('.map__pins');
      for (var i = 0; i < window.advertCreation.getNumberOfAdverts(); i++) {
        fragment.appendChild(createAdvertTemplate(createAdvert(advertsArray[i])));
      }
      similarPinElement.appendChild(fragment);
    }
  };
})();
