'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var uploadAvatar = document.querySelector('.notice__photo .upload');
  uploadAvatar.style.position = 'relative';
  var avatarChooser = document.querySelector('#avatar');
  avatarChooser.style.left = 0;
  avatarChooser.style.opacity = 0;
  avatarChooser.style.height = '100%';
  var uploadPhotos = document.querySelector('.form__photo-container .upload');
  uploadPhotos.style.position = 'relative';
  var imagesChooser = document.querySelector('#images');
  imagesChooser.style.left = 0;
  imagesChooser.style.opacity = 0;
  imagesChooser.style.height = '100%';
  imagesChooser.style.width = '100%';
  var preview = document.querySelector('.notice__preview img');

  avatarChooser.addEventListener('change', upload);

  function upload() {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      renderAvatar(file);
    }
  }

  function renderAvatar(file) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
})();
