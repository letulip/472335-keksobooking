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
      }
    },

    popupClose: function () {
      window.card.removePreviousActivePin(mapPinPopup);
      popupCloseIcon.removeEventListener('click', window.card.popupClose);
    },

    removePreviousActivePin: function (previousPopup) {
      var pinActive = document.querySelector('.map__pin--active');
      if (pinActive) {
        window.util.removeClassName(pinActive, 'map__pin--active');
      }
      if (previousPopup) {
        window.util.addClassName(previousPopup, window.util.getHiddenAttribute());
        popupCloseIcon.removeEventListener('click', window.card.popupClose);
      }
    }
  };
})();
