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
  var formAddress = document.querySelector('#address');

  mapPinMainImg.draggable = true;

  mapPinMainImg.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var mapArea = map.querySelector('.map__pins');
      var mapAreaCoords = mapArea.getBoundingClientRect();
      var mapPinMainCoords = mapPinMain.getBoundingClientRect();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (mapPinMainCoords.top >= mapAreaCoords.top) {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      } else {
        mapPinMain.style.top = (mapAreaCoords.top + 50) + 'px';
      }
      if (mapPinMainCoords.bottom <= mapAreaCoords.bottom) {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      } else {
        mapPinMain.style.top = (mapAreaCoords.bottom - 50) + 'px';
      }
      if (mapPinMainCoords.left > mapAreaCoords.left) {
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      } else {
        mapPinMain.style.left = (mapAreaCoords.left + 50) + 'px';
      }
      if (mapPinMainCoords.right < mapAreaCoords.right) {
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      } else {
        mapPinMain.style.left = (mapAreaCoords.right - 150) + 'px';
      }

      setAddress();
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

  function setAddress() {
    var coords = mapPinMain.getBoundingClientRect();
    var verticalShift = 22;
    var horisontalShift = 31;
    if (coords.top >= 100 && coords.bottom <= 500) {
      formAddress.value = 'x: ' + (coords.bottom + verticalShift) + ', y: ' + (coords.left + horisontalShift);
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
