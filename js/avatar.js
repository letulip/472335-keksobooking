'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var uploadFiled = document.querySelector('.upload');
  uploadFiled.style.position = 'relative';
  var fileChooser = document.querySelector('#avatar');
  fileChooser.style.left = 0;
  fileChooser.style.opacity = 0;
  fileChooser.style.height = '100%';
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
})();
