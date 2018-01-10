'use strict';

(function () {
  // var HORIZONTAL_SHIFT = 32;
  var VERTICAL_SHIFT = 54;
  var HORIZONTAL_SHIFT = 0;
  var mapPinMain = document.querySelector('.map__pin--main');
  var formAddress = document.querySelector('#address');

  window.setAddress = function () {
    formAddress.value = 'x: ' + (parseInt(mapPinMain.style.left, 10) + HORIZONTAL_SHIFT) + ', y: ' + (parseInt(mapPinMain.style.top, 10) + VERTICAL_SHIFT);
  };
})();
