'use strict';

(function () {
  var MAP_PIN_ACTIVE = 'map__pin--active';
  var popupCloseIcon;
  var mapPinPopup;

  window.card = {
    showPopup: function (e) {
      if (e.target.closest('.map__pin:not(.map__pin--main)')) {
        window.card.removePreviousActivePin(mapPinPopup);
        window.util.addClassName(document.activeElement, MAP_PIN_ACTIVE);
        mapPinPopup = document.activeElement.previousElementSibling;
        popupCloseIcon = mapPinPopup.querySelector('.popup__close');
        window.util.removeClassName(mapPinPopup, window.util.getHiddenAttribute());
        popupCloseIcon.addEventListener('click', window.card.popupClose);
        document.addEventListener('keydown', window.card.escListener);
      }
    },

    popupClose: function () {
      window.card.removePreviousActivePin(mapPinPopup);
      popupCloseIcon.removeEventListener('click', window.card.popupClose);
      document.removeEventListener('keydown', window.card.escListener);
    },

    escListener: function (e) {
      window.util.isEscEvent(e, window.card.popupClose);
    },

    removePreviousActivePin: function (previousPopup) {
      var activePin = document.querySelector('.' + MAP_PIN_ACTIVE);
      if (activePin) {
        window.util.removeClassName(activePin, MAP_PIN_ACTIVE);
      }
      if (previousPopup) {
        window.util.addClassName(previousPopup, window.util.getHiddenAttribute());
        popupCloseIcon.removeEventListener('click', window.card.popupClose);
      }
    }
  };
})();
