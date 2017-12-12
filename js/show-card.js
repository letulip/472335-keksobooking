'use strict';

window.card = (function () {
  var popupCloseIcon;
  var mapPinPopup;

  return {
    showCard: function (e) {
      var map = document.querySelector('.map:not(.popup__close)');
      var mapPinActive = 'map__pin--active';
      if (e.target.closest('.map__pin:not(.map__pin--main)')) {
        window.card.removeTemplateActive();
        e.target.parentElement.parentElement.classList.add('map__pin-template-active');
        window.card.removePreviousActivePin(mapPinPopup);
        window.util.addClassName(document.activeElement, mapPinActive);
        mapPinPopup = document.activeElement.parentElement.firstElementChild;
        var string = '.map__pin-template-active article .popup__close';
        popupCloseIcon = map.querySelector(string);
        window.util.removeClassName(mapPinPopup, window.util.getHiddenAttribute());
        popupCloseIcon.addEventListener('click', window.card.popupClose);
        document.addEventListener('keydown', function (evt) {
          window.util.isEscEvent(evt, window.card.popupClose);
        });
      }
    },

    popupClose: function () {
      window.card.removeTemplateActive();
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
    },

    removeTemplateActive: function () {
      var map = document.querySelector('.map:not(.popup__close)');
      var activePopup = map.querySelector('.map__pin-template-active');
      if (activePopup) {
        window.util.removeClassName(activePopup, 'map__pin-template-active');
      }
    }
  };
})();
