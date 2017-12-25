'use strict';

window.card = (function () {
  var popupCloseIcon;
  var mapPinPopup;

  return {
    showCard: function (e) {
      var mapPinActive = 'map__pin--active';
      if (e.target.closest('.map__pin:not(.map__pin--main)')) {
        window.card.removePreviousActivePin(mapPinPopup);
        window.util.addClassName(document.activeElement, mapPinActive);
        mapPinPopup = document.activeElement.previousElementSibling;
        popupCloseIcon = mapPinPopup.querySelector('.popup__close');
        window.util.removeClassName(mapPinPopup, window.util.getHiddenAttribute());
        popupCloseIcon.addEventListener('click', window.card.popupClose);
        document.addEventListener('keydown', function (evt) {
          window.util.isEscEvent(evt, window.card.popupClose);
        });
      }
    },

    popupClose: function () {
      window.card.removePreviousActivePin(mapPinPopup);
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
