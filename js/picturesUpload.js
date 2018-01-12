'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var IMG_WIDTH = 50;
  var IMG_HEIGHT = 70;
  var avatarUploader = document.querySelector('.notice__photo .upload');
  var avatarChooser = document.querySelector('#avatar');
  var photoContainer = document.querySelector('.form__photo-container');
  var list = document.createElement('ul');
  list.classList.add('advert-photos');
  photoContainer.appendChild(list);
  var advertPhotos = photoContainer.querySelector('.advert-photos');
  var uploadPhotos = document.querySelector('.form__photo-container .upload');
  var imageChooser = document.querySelector('#images');
  var preview = document.querySelector('.notice__preview img');

  avatarChooser.addEventListener('change', uploadAvatar);
  imageChooser.addEventListener('change', uploadPhoto);

  function setStylesElements() {
    avatarUploader.style.position = 'relative';
    avatarChooser.style.left = 0;
    avatarChooser.style.opacity = 0;
    avatarChooser.style.width = '220px';
    avatarChooser.style.height = '100%';
    list.style.display = 'flex';
    list.style.listStyle = 'none';
    uploadPhotos.style.position = 'relative';
    imageChooser.style.left = 0;
    imageChooser.style.opacity = 0;
    imageChooser.style.height = '100%';
    imageChooser.style.width = '100%';
  }

  function upload(file, callback, param1, param2) {
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        callback(reader, param1, param2);
      });

      reader.readAsDataURL(file);
    }
  }

  function uploadAvatar() {
    var file = avatarChooser.files[0];

    upload(file, avatarRender);
  }

  function avatarRender(reader) {
    preview.src = reader.result;
  }

  function advertPhotoRender(reader, height, width) {
    var li = document.createElement('li');
    var img = new Image();
    img.style.width = width + 'px';
    img.style.height = height + 'px';
    advertPhotos.appendChild(li).appendChild(img).src = reader.result;
  }

  function uploadPhoto() {
    var file = imageChooser.files[0];

    upload(file, advertPhotoRender, IMG_HEIGHT, IMG_WIDTH);
  }

  setStylesElements();
})();
