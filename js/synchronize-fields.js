'use strict';

(function () {
  window.synchronizeFields = function (field1, field2, values1, values2, action) {
    values1.find(function (item, i) {
      if (field1.value === values1[i]) {
        action(field2, values2[i]);
      }
    });
  };
})();
