'use strict';

(function () {
  var map = document.querySelector('.map:not(.popup__close)');
  var popupCloseIcon;
  var mapFaded = 'map--faded';
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormDisabled = 'notice__form--disabled';
  var mapPinMainMouseUp = document.querySelector('main');
  var mapPinPopup;
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinMainImg = document.querySelector('.map__pin--main img');

  mapPinMainImg.draggable = true;

  mapPinMainImg.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  mapPinMainMouseUp.addEventListener('mouseup', mouseUpInit);

  map.addEventListener('click', mapEventListener);
  map.addEventListener('keydown', function (evt) {
    window.util.isEnterOrEscEvent(evt, mapEventListener);
  });

  function mapEventListener(e) {
    var mapPinActive = 'map__pin--active';
    if (e.target.closest('.map__pin:not(.map__pin--main)')) {
      removeTemplateActive();
      e.target.parentElement.parentElement.classList.add('map__pin-template-active');
      removePreviousActivePin(mapPinPopup);
      window.util.addClassName(document.activeElement, mapPinActive);
      mapPinPopup = document.activeElement.parentElement.firstElementChild;
      var string = '.map__pin-template-active article .popup__close';
      popupCloseIcon = map.querySelector(string);
      window.util.removeClassName(mapPinPopup, window.util.getHiddenAttribute());
      popupCloseIcon.addEventListener('click', popupClose);
      document.addEventListener('keydown', function (evt) {
        window.util.isEscEvent(evt, popupClose);
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

  function mouseUpInit() {
    window.util.removeClassName(map, mapFaded);
    window.avatarCreation.createAvatars();
    window.fillAdvertTemplate.fillFragment(window.advertCreation.createAdverts());
    window.util.removeClassName(noticeForm, noticeFormDisabled);
    window.util.formFieldsetShow();
    window.util.popupsHide();
    mapPinMainMouseUp.removeEventListener('mouseup', mouseUpInit);
  }

  window.util.formFieldsetHide();
  window.formValidation.formCheck();
}());
