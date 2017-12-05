'use strict';

window.util = (function () {
  return {
    removeClassName: function (element, className) {
      element.classList.remove(className);
    },
    addClassName: function (element, className) {
      element.classList.add(className);
    }
  };
})();
