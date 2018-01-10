'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var formAddress = document.querySelector('#address');
  var verticalShift = 87;
  var horisontalShift = 32;

  window.setAddress = function () {
    formAddress.value = 'x: ' + (parseInt(mapPinMain.style.left, 10) + horisontalShift) + ', y: ' + (parseInt(mapPinMain.style.top, 10) + verticalShift);
  };
})();
