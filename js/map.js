'use strict';

(function () {
  var PIN_SHIFT = 33;
  var PIN_SHIFT_TOP = 49;
  var MIN_COORD = 14;
  var MAX_COORD = 227;
  var PIN_LEFT_DEFAULT = 600;
  var PIN_TOP_DEFAULT = 376;
  var MAP_FADED = 'map--faded';
  var NOTICE_FORM_DISABLED = 'notice__form--disabled';
  var map = document.querySelector('.map:not(.popup__close)');
  var noticeForm = document.querySelector('.notice__form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapArea = map.querySelector('.map__pins');

  mapPinMain.style.top = PIN_TOP_DEFAULT + 'px';
  mapPinMain.style.left = PIN_LEFT_DEFAULT + 'px';
  mapPinMain.draggable = true;
  mapPinMain.tabIndex = 0;

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

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
        if (parseInt(mapPinMainCoords.top, 10) > parseInt(mapAreaCoords.top, 10) + MIN_COORD) {
          mapPinMain.style.top = (parseInt(mapPinMainCoords.top, 10) < 0)
            ? (0 - parseInt(mapAreaCoords.top, 10) + PIN_SHIFT) + 'px'
            : (parseInt(mapPinMain.offsetTop, 10) - shift.y) + 'px';
        } else {
          mapPinMain.style.top = (parseInt(mapAreaCoords.top, 10) + PIN_SHIFT_TOP) + 'px';
        }
      }

      function setBottomCoords() {
        if (parseInt(mapPinMainCoords.bottom, 10) >= parseInt(mapAreaCoords.bottom, 10) - MAX_COORD) {
          mapPinMain.style.top = (mapAreaCoords.top < 0)
            ? (0 - parseInt(mapAreaCoords.top, 10) + parseInt(mapAreaCoords.bottom, 10) - MAX_COORD - PIN_SHIFT) + 'px'
            : (parseInt(mapAreaCoords.bottom, 10) - MAX_COORD - PIN_SHIFT) + 'px';
        }
      }

      function setLeftCoords() {
        mapPinMain.style.left = (mapPinMainCoords.left > mapAreaCoords.left)
          ? (mapPinMain.offsetLeft - shift.x) + 'px'
          : PIN_SHIFT + 'px';
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
      window.setAddress();
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
  mapPinMain.addEventListener('keydown', onEnterInit);

  function onEnterInit(evt) {
    window.util.isEnterEvent(evt, mouseUpInit);
  }

  function mouseUpInit() {
    window.findSimilar();
    window.util.removeClassName(map, MAP_FADED);
    window.util.removeClassName(noticeForm, NOTICE_FORM_DISABLED);
    window.setAddress();
    window.util.formFieldsetShow();
    mapPinMain.removeEventListener('mouseup', mouseUpInit);
    mapPinMain.removeEventListener('keydown', onEnterInit);
  }

  window.util.formFieldsetHide();
  window.form.check();
}());
