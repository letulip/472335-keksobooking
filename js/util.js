'use strict';

(function () {
  window.util = function () {
    var disabled = 'disabled';
    var fieldsetElements = document.querySelectorAll('.form__element');
    var hidden = 'hidden';
    var ESC_KEYCODE = 27;
    var ENTER_KEYCODE = 13;
    var numOfAdverts = 5;
    var DEBOUNCE_INTERVAL = 500;
    var lastTimeout;

    return {
      isEscEvent: function (evt, action) {
        if (evt.keyCode === ESC_KEYCODE) {
          action(evt);
        }
      },
      isEnterEvent: function (evt, action) {
        if (evt.keyCode === ENTER_KEYCODE) {
          action(evt);
        }
      },
      isEnterOrEscEvent: function (evt, action) {
        if (evt.keyCode === ENTER_KEYCODE || evt.keyCode === ESC_KEYCODE) {
          action(evt);
        }
      },
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
        fieldsetElements.forEach(function (item) {
          window.util.addClassName(item, disabled);
        });
      },
      formFieldsetShow: function () {
        fieldsetElements.forEach(function (item) {
          window.util.removeClassName(item, disabled);
        });
      },
      popupsHide: function () {
        var popups = document.querySelectorAll('.popup');
        popups.forEach(function (item) {
          window.util.addClassName(item, hidden);
        });
      },
      getHiddenAttribute: function () {
        return hidden;
      },
      debounce: function (func) {
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(func, DEBOUNCE_INTERVAL);
      },
      getNumberOfAdverts: function () {
        return numOfAdverts;
      }
    };
  };
})();
