'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var map = document.querySelector('.map:not(.popup__close)');
  var popupCloseIcon;
  var mapFaded = 'map--faded';
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormDisabled = 'notice__form--disabled';
  var numOfAdverts = 8;
  var avatars = [];
  var adverts = [];
  var mapPinMainMouseUp = document.querySelector('main');
  var mapPinPopup;

  mapPinMainMouseUp.addEventListener('mouseup', mouseUpInit);

  map.addEventListener('click', mapEventListener);
  map.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE || evt.keyCode === ESC_KEYCODE) {
      mapEventListener();
    }
  });

  function mapEventListener(e) {
    var mapPinActive = 'map__pin--active';
    if (e.target.closest('.map__pin')) {
      removeTemplateActive();
      e.target.parentElement.parentElement.classList.add('map__pin-template-active');
      removePreviousActivePin(mapPinPopup);
      window.util.addClassName(e.target.parentElement, mapPinActive);
      mapPinPopup = e.target.parentElement.previousElementSibling;
      var string = '.map__pin-template-active article .popup__close';
      popupCloseIcon = map.querySelector(string);
      window.util.removeClassName(mapPinPopup, window.util.getHiddenAttribute());
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
        window.util.removeClassName(pinActive, 'map__pin--active');
      }
      if (previousPopup) {
        window.util.addClassName(previousPopup, window.util.getHiddenAttribute());
        popupCloseIcon.removeEventListener('click', popupClose);
      }
    }

    function removeTemplateActive() {
      var activePopup = map.querySelector('.map__pin-template-active');
      if (activePopup) {
        window.util.removeClassName(activePopup, 'map__pin-template-active');
      }
    }
  }

  function Advert(author, offer, locationCoords) {
    this.author = author;
    this.offer = offer;
    this.location = locationCoords;
  }

  function Author(avatar) {
    this.avatar = avatar;
  }

  function createAdverts() {
    for (var i = 0; i < numOfAdverts; i++) {
      adverts.push(new Advert(getAuthor(i), window.offer.createOffer(), window.offer.getOfferLocation()));
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

  function mouseUpInit() {
    window.util.removeClassName(map, mapFaded);
    createAvatars();
    fillFragment(createAdverts());
    window.util.removeClassName(noticeForm, noticeFormDisabled);
    window.util.formFieldsetShow();
    window.util.popupsHide();
    mapPinMainMouseUp.removeEventListener('mouseup', mouseUpInit);
  }

  window.util.formFieldsetHide();
  window.formValidation.formCheck();
}());
