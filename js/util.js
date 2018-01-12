'use strict';

(function () {
  var HIDDEN = 'hidden';
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;
  var fieldsetElements = document.querySelectorAll('.form__element');

  window.util = {
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
    removeClassName: function (element, className) {
      element.classList.remove(className);
    },
    addClassName: function (element, className) {
      element.classList.add(className);
    },
    formFieldsetHide: function () {
      fieldsetElements.forEach(function (item) {
        item.disabled = true;
      });
    },
    formFieldsetShow: function () {
      fieldsetElements.forEach(function (item) {
        item.disabled = false;
      });
    },
    popupHide: function (popup) {
      popup.classList.add(HIDDEN);
    },
    getHiddenAttribute: function () {
      return HIDDEN;
    },
    debounce: function (func) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(func, DEBOUNCE_INTERVAL);
    }
  };
})();
