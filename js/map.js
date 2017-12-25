'use strict';

(function () {
  var map = document.querySelector('.map:not(.popup__close)');
  var mapFaded = 'map--faded';
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormDisabled = 'notice__form--disabled';
  var mapPinMainMouseUp = document.querySelector('main');
  var mapPinMain = document.querySelector('.map__pin--main');
  var formAddress = document.querySelector('#address');

  mapPinMain.draggable = true;

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var mapArea = map.querySelector('.map__pins');
      var mapAreaCoords = mapArea.getBoundingClientRect();
      var mapPinMainCoords = mapPinMain.getBoundingClientRect();
      var pinShift = 40;

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
          mapPinMain.style.top = (mapAreaCoords.top + pinShift) + 'px';
        }
      }

      function setBottomCoords() {
        if (mapPinMainCoords.bottom >= mapAreaCoords.bottom) {
          mapPinMain.style.top = (mapAreaCoords.bottom - pinShift) + 'px';
        }
      }

      function setLeftCoords() {
        if (mapPinMainCoords.left > mapAreaCoords.left) {
          mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
        } else {
          mapPinMain.style.left = pinShift + 'px';
        }
      }

      function setRightCoords() {
        if (mapPinMainCoords.right >= mapAreaCoords.right) {
          mapPinMain.style.left = (mapAreaCoords.width - pinShift) + 'px';
        }
      }

      setTopCoords();
      setBottomCoords();
      setLeftCoords();
      setRightCoords();
      setAddress();
      window.similar();
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  mapPinMainMouseUp.addEventListener('mouseup', mouseUpInit);

  map.addEventListener('keydown', function (evt) {
    window.util.isEnterOrEscEvent(evt, window.card.showCard.bind(evt));
  });

  function setAddress() {
    var coords = mapPinMain.getBoundingClientRect();
    var verticalShift = 22;
    var horisontalShift = 31;
    var minCoords = 100;
    var maxCoords = 500;
    if (coords.top >= minCoords && coords.bottom <= maxCoords) {
      formAddress.value = 'x: ' + (coords.bottom + verticalShift) + ', y: ' + (coords.left + horisontalShift);
    }
  }

  function mouseUpInit() {
    window.util.removeClassName(map, mapFaded);
    window.util.removeClassName(noticeForm, noticeFormDisabled);
    window.util.formFieldsetShow();
    window.util.popupsHide();
    mapPinMainMouseUp.removeEventListener('mouseup', mouseUpInit);
  }

  window.util.formFieldsetHide();
  window.formValidation.formCheck();
}());
