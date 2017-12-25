'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileChooser = document.querySelector('#avatar');
  var preview = document.querySelector('.notice__preview img');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
  // var noticeDialogElement = document.querySelector('.notice');
  // var dialogHandler = noticeDialogElement.querySelector('.drop-zone');
  //
  // dialogHandler.addEventListener('mousedown', function (evt) {
  //   evt.preventDefault();
  //
  //   var startCoords = {
  //     x: evt.clientX,
  //     y: evt.clientY
  //   };
  //
  //   var dragged = false;
  //
  //   var onMouseMove = function (moveEvt) {
  //     moveEvt.preventDefault();
  //     dragged = true;
  //
  //     var shift = {
  //       x: startCoords.x - moveEvt.clientX,
  //       y: startCoords.y - moveEvt.clientY
  //     };
  //
  //     startCoords = {
  //       x: moveEvt.clientX,
  //       y: moveEvt.clientY
  //     };
  //
  //     noticeDialogElement.style.top = (noticeDialogElement.offsetTop - shift.y) + 'px';
  //     noticeDialogElement.style.left = (noticeDialogElement.offsetLeft - shift.x) + 'px';
  //
  //   };
  //
  //   var onMouseUp = function (upEvt) {
  //     upEvt.preventDefault();
  //
  //     document.removeEventListener('mousemove', onMouseMove);
  //     document.removeEventListener('mouseup', onMouseUp);
  //
  //     if (dragged) {
  //       var onClickPreventDefault = function (e) {
  //         e.preventDefault();
  //         dialogHandler.removeEventListener('click', onClickPreventDefault);
  //       };
  //       dialogHandler.addEventListener('click', onClickPreventDefault);
  //     }
  //
  //   };
  //
  //   document.addEventListener('mousemove', onMouseMove);
  //   document.addEventListener('mouseup', onMouseUp);
  // });

})();
