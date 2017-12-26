'use strict';

(function () {
  window.synchronizeFields = function (field1, field2, values1, values2, action) {
    for (var i = 0; i < values1.length; i++) {
      if (field1.value === values1[i]) {
        action(field2, values2[i]);
      }
    }
  };
})();
