'use strict';

window.showCard = function (e) {
  var map = document.querySelector('.map:not(.popup__close)');
  var popupCloseIcon;
  var mapPinPopup;
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
};
