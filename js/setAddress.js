'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var formAddress = document.querySelector('#address');
  var maxCoords = 446;
  var minCoords = 100;

  window.setAddress = function () {
    var coords = mapPinMain.getBoundingClientRect();
    var verticalShift = 87;
    var horisontalShift = 32;
    if (coords.top >= minCoords && coords.bottom <= maxCoords) {
      formAddress.value = 'x: ' + (parseInt(mapPinMain.style.left, 10) + horisontalShift) + ', y: ' + (parseInt(mapPinMain.style.top, 10) + verticalShift);
    }
  };
})();
