'use strict';

(function () {
  var map = document.querySelector('.map:not(.popup__close)');
  var mapFaded = 'map--faded';
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormDisabled = 'notice__form--disabled';
  var mapPinMain = document.querySelector('.map__pin--main');
  var formAddress = document.querySelector('#address');

  mapPinMain.draggable = true;

  document.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, window.card.popupClose);
  });

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var PIN_SHIFT = 40;
      var mapArea = map.querySelector('.map__pins');
      var mapAreaCoords = mapArea.getBoundingClientRect();
      var mapPinMainCoords = mapPinMain.getBoundingClientRect();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      function setTopCoords() {
        if (mapPinMainCoords.top > mapAreaCoords.top) {
          mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
        } else {
          mapPinMain.style.top = (mapAreaCoords.top + PIN_SHIFT) + 'px';
        }
      }

      function setBottomCoords() {
        if (mapPinMainCoords.bottom >= mapAreaCoords.bottom) {
          mapPinMain.style.top = (mapAreaCoords.bottom - PIN_SHIFT) + 'px';
        }
      }

      function setLeftCoords() {
        if (mapPinMainCoords.left > mapAreaCoords.left) {
          mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
        } else {
          mapPinMain.style.left = PIN_SHIFT + 'px';
        }
      }

      function setRightCoords() {
        if (mapPinMainCoords.right >= mapAreaCoords.right) {
          mapPinMain.style.left = (mapAreaCoords.width - PIN_SHIFT) + 'px';
        }
      }

      setTopCoords();
      setBottomCoords();
      setLeftCoords();
      setRightCoords();
      setAddress();
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  mapPinMain.addEventListener('mouseup', mouseUpInit);


  map.addEventListener('keydown', function (evt) {
    window.util.isEnterOrEscEvent(evt, window.card.showPopup.bind(evt));
  });

  function setAddress() {
    var coords = mapPinMain.getBoundingClientRect();
    var verticalShift = 22;
    var horisontalShift = 31;
    var minCoords = 100;
    var maxCoords = 500;
    if (coords.top >= minCoords && coords.bottom <= maxCoords) {
      formAddress.value = 'x: ' + Math.round(coords.left + horisontalShift) + ', y: ' + Math.round(coords.bottom + verticalShift);
    }
  }

  function mouseUpInit() {
    window.similar();
    window.util.removeClassName(map, mapFaded);
    window.util.removeClassName(noticeForm, noticeFormDisabled);
    setAddress();
    window.util.formFieldsetShow();
    mapPinMain.removeEventListener('mouseup', mouseUpInit);
  }

  window.util.formFieldsetHide();
  window.formValidation.formCheck();
}());
