'use strict';

window.util = (function () {
  var disabled = 'disabled';
  var fieldsetElements = document.querySelectorAll('.form__element');
  var hidden = 'hidden';

  return {
    removeClassName: function (element, className) {
      element.classList.remove(className);
    },
    addClassName: function (element, className) {
      element.classList.add(className);
    },
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    formFieldsetHide: function () {
      for (var i = 0; i < fieldsetElements.length; i++) {
        window.util.addClassName(fieldsetElements[i], disabled);
      }
    },
    formFieldsetShow: function () {
      for (var i = 0; i < fieldsetElements.length; i++) {
        window.util.removeClassName(fieldsetElements[i], disabled);
      }
    },
    popupsHide: function () {
      var popups = document.querySelectorAll('.popup');
      for (var i = 0; i < popups.length; i++) {
        window.util.addClassName(popups[i], hidden);
      }
    },
    getHiddenAttribute: function () {
      return hidden;
    }
  };
})();